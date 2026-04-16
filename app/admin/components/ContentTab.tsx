"use client";
import { useState, useEffect, useCallback } from "react";
import { dictionaries } from "@/app/i18n";

type Lang = "lv" | "en" | "ru";

const LANG_LABELS: Record<Lang, string> = { lv: "Latviski", en: "English", ru: "Русский" };

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "hero.subtext", label: "Hero — apraksts zem virsraksta", multiline: true },
  { key: "about.p1", label: "Par mums — 1. rindkopa", multiline: true },
  { key: "about.p2", label: "Par mums — 2. rindkopa", multiline: true },
  { key: "contact.hoursValue", label: "Darba laiks", multiline: true },
];

function getDefault(lang: Lang, fieldKey: string): string {
  const parts = fieldKey.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let val: any = dictionaries[lang];
  for (const p of parts) val = val?.[p];
  return typeof val === "string" ? val : "";
}

export default function ContentTab() {
  const [lang, setLang] = useState<Lang>("lv");
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async (l: Lang) => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data: { key: string; value: string }[] = await res.json();
    const vals: Record<string, string> = {};
    for (const item of data) {
      if (item.key.startsWith(`${l}.`)) {
        vals[item.key.slice(l.length + 1)] = item.value;
      }
    }
    setValues(vals);
    setLoading(false);
  }, []);

  useEffect(() => { fetchContent(lang); }, [lang, fetchContent]);

  function getValue(fieldKey: string): string {
    return values[fieldKey] ?? getDefault(lang, fieldKey);
  }

  async function saveField(fieldKey: string) {
    const dbKey = `${lang}.${fieldKey}`;
    setSaving(s => ({ ...s, [fieldKey]: true }));
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: dbKey, value: getValue(fieldKey) }),
    });
    setSaving(s => ({ ...s, [fieldKey]: false }));
    setSaved(s => ({ ...s, [fieldKey]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [fieldKey]: false })), 2000);
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem", color: "#0A1F48", marginBottom: "1.5rem" }}>Saturs</h2>

      {/* Language tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "0" }}>
        {(["lv", "en", "ru"] as Lang[]).map(l => (
          <button
            key={l}
            onClick={() => { setLang(l); setSaved({}); }}
            style={{
              padding: "0.6rem 1.4rem",
              border: "none",
              borderBottom: lang === l ? "2px solid #0A1F48" : "2px solid transparent",
              background: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: lang === l ? "#0A1F48" : "#999",
              fontWeight: lang === l ? 600 : 400,
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Ielādē...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {FIELDS.map(({ key, label, multiline }) => (
            <div key={key} style={{ background: "#fff", borderRadius: "10px", padding: "1.2rem 1.5rem", border: "1px solid #eee" }}>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.6rem" }}>
                {label}
              </label>
              {multiline ? (
                <textarea
                  rows={4}
                  value={getValue(key)}
                  onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.875rem", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.7 }}
                />
              ) : (
                <input
                  type="text"
                  value={getValue(key)}
                  onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "0.7rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.875rem", boxSizing: "border-box" }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.6rem" }}>
                <button
                  onClick={() => saveField(key)}
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
          ))}
        </div>
      )}
    </div>
  );
}
