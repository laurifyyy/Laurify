"use client";
import { useState, useEffect } from "react";

type ContentItem = { id: string; key: string; value: string; updatedAt: string };

const CONTENT_LABELS: Record<string, string> = {
  "hero.title": "Virsraksts (Hero)",
  "hero.subtitle": "Apakšvirsraksts (Hero)",
  "about.text": "Par mums — teksts",
  "contact.address": "Adrese",
  "contact.phone": "Telefons",
  "contact.email": "E-pasts",
};

export default function ContentTab() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    setItems(data);
    const vals: Record<string, string> = {};
    data.forEach((d: ContentItem) => { vals[d.key] = d.value; });
    setEditing(vals);
    setLoading(false);
  }

  async function saveItem(key: string) {
    setSaving(s => ({ ...s, [key]: true }));
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: editing[key] ?? "" }),
    });
    setSaving(s => ({ ...s, [key]: false }));
    setSaved(s => ({ ...s, [key]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000);
    fetchItems();
  }

  const allKeys = Array.from(new Set([
    ...Object.keys(CONTENT_LABELS),
    ...items.map(i => i.key),
  ]));

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem", color: "#0A1F48", marginBottom: "1.5rem" }}>Saturs</h2>
      {loading ? (
        <p style={{ color: "#888" }}>Ielādē...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {allKeys.map(key => {
            const label = CONTENT_LABELS[key] || key;
            const isLong = key.includes("text") || key.includes("about");
            return (
              <div key={key} style={{ background: "#fff", borderRadius: "10px", padding: "1.2rem 1.5rem", border: "1px solid #eee" }}>
                <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.6rem" }}>
                  {label}
                </label>
                {isLong ? (
                  <textarea
                    value={editing[key] ?? ""}
                    onChange={e => setEditing(ed => ({ ...ed, [key]: e.target.value }))}
                    rows={4}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                ) : (
                  <input
                    type="text"
                    value={editing[key] ?? ""}
                    onChange={e => setEditing(ed => ({ ...ed, [key]: e.target.value }))}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.9rem", boxSizing: "border-box" }}
                  />
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.6rem" }}>
                  <button
                    onClick={() => saveItem(key)}
                    disabled={saving[key]}
                    style={{
                      background: saved[key] ? "#27ae60" : "#0A1F48",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem 1.2rem",
                      fontSize: "0.75rem",
                      cursor: saving[key] ? "not-allowed" : "pointer",
                      opacity: saving[key] ? 0.7 : 1,
                      transition: "background 0.3s",
                    }}
                  >
                    {saved[key] ? "Saglabāts ✓" : saving[key] ? "Saglabā..." : "Saglabāt"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
