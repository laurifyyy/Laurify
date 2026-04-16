"use client";
import { useState, useEffect, useRef } from "react";

type Item = { id: string; title: string; type: string; url: string; order: number };

export default function GalleryTab() {
  const [items, setItems] = useState<Item[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOverDrop, setDragOverDrop] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Item | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", file.name.replace(/\.[^.]+$/, ""));
      form.append("type", file.type.startsWith("video") ? "video" : "image");
      const res = await fetch("/api/admin/gallery", { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setUploadError(err.error || `Kļūda: ${res.status}`);
      }
    } catch (err) {
      setUploadError(`Savienojuma kļūda: ${err}`);
    }
    setUploading(false);
  }

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    for (const file of arr) await uploadFile(file);
    await fetchItems();
  }

  async function deleteItem(id: string) {
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setConfirmDelete(null);
    fetchItems();
  }

  // ── Drag & drop upload ──────────────────────────────────────────
  function onDropZoneDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOverDrop(true);
  }
  function onDropZoneDragLeave() { setDragOverDrop(false); }
  function onDropZoneDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOverDrop(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }

  // ── Drag to reorder ─────────────────────────────────────────────
  function onItemDragStart(e: React.DragEvent, idx: number) {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  }
  function onItemDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setDragOverIdx(idx);
  }
  function onItemDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const reordered = [...items];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    setItems(reordered);
    setDragIdx(null);
    setDragOverIdx(null);
    saveOrder(reordered);
  }
  function onItemDragEnd() {
    setDragIdx(null);
    setDragOverIdx(null);
  }

  async function saveOrder(ordered: Item[]) {
    setSaving(true);
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders: ordered.map((it, i) => ({ id: it.id, order: i })) }),
    });
    setSaving(false);
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#0A1F48", margin: 0 }}>
          Galerija {saving && <span style={{ fontSize: "0.7rem", color: "#888", fontWeight: 400 }}>Saglabā secību...</span>}
        </h2>
        <label style={{
          background: uploading ? "#555" : "#0A1F48", color: "#fff", padding: "0.6rem 1.2rem", borderRadius: "8px",
          cursor: uploading ? "not-allowed" : "pointer", fontSize: "0.8rem", letterSpacing: "0.1em",
          opacity: uploading ? 0.7 : 1,
        }}>
          {uploading ? "Augšupielādē..." : "+ Pievienot"}
          <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple
            onChange={e => e.target.files && handleFiles(e.target.files)}
            style={{ display: "none" }} disabled={uploading} />
        </label>
      </div>

      {uploadError && (
        <p style={{ color: "#c0392b", fontSize: "0.8rem", marginBottom: "1rem", background: "#fdf0ef", padding: "0.7rem 1rem", borderRadius: "6px" }}>
          ⚠ {uploadError}
        </p>
      )}

      {/* Drop zone */}
      <div
        onDragOver={onDropZoneDragOver}
        onDragLeave={onDropZoneDragLeave}
        onDrop={onDropZoneDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOverDrop ? "#0A1F48" : "#d0cfc8"}`,
          borderRadius: "10px",
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          cursor: "pointer",
          background: dragOverDrop ? "#f0ede4" : "#fafaf8",
          transition: "all 0.2s",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.8rem", color: dragOverDrop ? "#0A1F48" : "#aaa", letterSpacing: "0.05em" }}>
          {dragOverDrop ? "Atlaid lai augšupielādētu" : "Ievelc šeit bildes vai video, vai klikšķini lai izvēlētos"}
        </p>
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Ielādē...</p>
      ) : (
        <>
          {items.length > 0 && (
            <p style={{ fontSize: "0.7rem", color: "#aaa", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Velc vienumu lai mainītu secību
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {items.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={e => onItemDragStart(e, idx)}
                onDragOver={e => onItemDragOver(e, idx)}
                onDrop={e => onItemDrop(e, idx)}
                onDragEnd={onItemDragEnd}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: dragOverIdx === idx ? "2px solid #0A1F48" : "1px solid #eee",
                  opacity: dragIdx === idx ? 0.4 : 1,
                  cursor: "grab",
                  transition: "opacity 0.2s, border 0.15s",
                }}
              >
                <div style={{ height: "140px", background: "#f0ede4", position: "relative" }}>
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); setConfirmDelete(item); }}
                    title="Dzēst"
                    style={{ position: "absolute", top: "6px", right: "6px", background: "#e74c3c", border: "2px solid #fff", color: "#fff", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", fontSize: "1rem", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#c0392b")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#e74c3c")}
                  >✕</button>
                  {/* Drag handle indicator */}
                  <div style={{ position: "absolute", top: "6px", left: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", lineHeight: 1, userSelect: "none" }}>⠿</div>
                </div>
                <div style={{ padding: "0.6rem 0.8rem" }}>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: "0.65rem", color: "#999", textTransform: "uppercase" }}>{item.type}</p>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p style={{ color: "#888", gridColumn: "1/-1" }}>Nav neviena vienuma. Pievienojiet pirmo!</p>
            )}
          </div>
        </>
      )}
      {/* Delete confirm modal */}
      {confirmDelete && (
        <div
          onClick={() => setConfirmDelete(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,31,72,0.5)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "16px", padding: "2rem", maxWidth: "380px", width: "100%", boxShadow: "0 32px 80px rgba(10,31,72,0.25)", textAlign: "center" }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fdf0ef", border: "2px solid #e74c3c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", fontSize: "1.4rem" }}>✕</div>
            <h3 style={{ fontSize: "1rem", color: "#0A1F48", margin: "0 0 0.5rem", fontWeight: 600 }}>Dzēst vienumu?</h3>
            <p style={{ fontSize: "0.82rem", color: "#888", margin: "0 0 0.4rem" }}>
              <strong style={{ color: "#333" }}>{confirmDelete.title}</strong>
            </p>
            <p style={{ fontSize: "0.78rem", color: "#aaa", margin: "0 0 1.8rem" }}>Šo darbību nevar atsaukt.</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", border: "1px solid #e0e0e0", background: "#f7f7f5", color: "#555", fontSize: "0.8rem", cursor: "pointer", fontWeight: 500 }}
              >
                Atcelt
              </button>
              <button
                onClick={() => deleteItem(confirmDelete.id)}
                style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", border: "none", background: "#e74c3c", color: "#fff", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600, letterSpacing: "0.05em" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#c0392b")}
                onMouseLeave={e => (e.currentTarget.style.background = "#e74c3c")}
              >
                Dzēst
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
