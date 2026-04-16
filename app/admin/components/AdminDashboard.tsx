"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import UsersTab from "./UsersTab";
import GalleryTab from "./GalleryTab";
import ContentTab from "./ContentTab";

const NAV = [
  { id: "gallery", label: "🖼 Galerija" },
  { id: "content", label: "✏️ Saturs" },
  { id: "users", label: "👥 Lietotāji" },
];

export default function AdminDashboard({ session }: { session: Session }) {
  const [tab, setTab] = useState("gallery");
  const role = (session.user as { role: string })?.role;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f0", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#0A1F48", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ color: "#fff", fontSize: "1rem", letterSpacing: "0.2em", fontWeight: 300 }}>LAURIFY <span style={{ opacity: 0.4, fontSize: "0.7rem" }}>ADMIN</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
          >
            Iziet
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div style={{ width: "220px", background: "#fff", borderRight: "1px solid #e5e5e5", padding: "1.5rem 0" }}>
          {NAV.filter(n => n.id !== "users" || role === "ADMIN").map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.75rem 1.5rem",
                border: "none",
                background: tab === n.id ? "#f0ede4" : "transparent",
                borderLeft: tab === n.id ? "3px solid #0A1F48" : "3px solid transparent",
                cursor: "pointer",
                fontSize: "0.85rem",
                color: tab === n.id ? "#0A1F48" : "#555",
                fontWeight: tab === n.id ? 600 : 400,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "2rem" }}>
          {tab === "gallery" && <GalleryTab />}
          {tab === "content" && <ContentTab />}
          {tab === "users" && role === "ADMIN" && <UsersTab />}
        </div>
      </div>
    </div>
  );
}
