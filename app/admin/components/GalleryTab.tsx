"use client";
import { useState, useEffect } from "react";

type Item = { id: string; title: string; type: string; url: string; order: number };

export default function GalleryTab() {
  const [items, setItems] = useState<Item[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("title", file.name.replace(/\.[^.]+$/, ""));
    form.append("type", file.type.startsWith("video") ? "video" : "image");
    await fetch("/api/admin/gallery", { method: "POST", body: form });
    await fetchItems();
    setUploading(false);
    e.target.value = "";
  }

  async function deleteItem(id: string) {
    if (!confirm("Dzēst šo vienumu?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#0A1F48", margin: 0 }}>Galerija</h2>
        <label style={{
          background: "#0A1F48", color: "#fff", padding: "0.6rem 1.2rem", borderRadius: "8px",
          cursor: "pointer", fontSize: "0.8rem", letterSpacing: "0.1em",
          opacity: uploading ? 0.6 : 1,
        }}>
          {uploading ? "Augšupielādē..." : "+ Pievienot"}
          <input type="file" accept="image/*,video/*" onChange={handleUpload} style={{ display: "none" }} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Ielādē...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
          {items.map(item => (
            <div key={item.id} style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
              <div style={{ height: "140px", background: "#f0ede4", position: "relative" }}>
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", borderRadius: "50%", width: "26px", height: "26px", cursor: "pointer", fontSize: "0.8rem" }}
                >
                  ×
                </button>
              </div>
              <div style={{ padding: "0.6rem 0.8rem" }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: "0.65rem", color: "#999", textTransform: "uppercase" }}>{item.type}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: "#888", gridColumn: "1/-1" }}>Nav neviena vienuma. Pievienojiet pirmo!</p>}
        </div>
      )}
    </div>
  );
}
