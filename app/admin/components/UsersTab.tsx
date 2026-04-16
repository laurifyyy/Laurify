"use client";
import { useState, useEffect } from "react";

type User = { id: string; email: string; name: string | null; role: string; createdAt: string };

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "EDITOR" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ email: "", password: "", name: "", role: "EDITOR" });
      setShowCreate(false);
      fetchUsers();
    } else {
      const data = await res.json();
      setError(data.error || "Kļūda");
    }
    setCreating(false);
  }

  async function changeRole(id: string, role: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  }

  async function deleteUser(id: string, email: string) {
    if (!confirm(`Dzēst lietotāju ${email}?`)) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#0A1F48", margin: 0 }}>Lietotāji</h2>
        <button
          onClick={() => setShowCreate(v => !v)}
          style={{ background: "#0A1F48", color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.2rem", fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.1em" }}
        >
          {showCreate ? "Aizvērt" : "+ Jauns lietotājs"}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={createUser} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "10px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem", fontSize: "0.95rem", color: "#0A1F48" }}>Izveidot lietotāju</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Vārds</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Loma</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", boxSizing: "border-box" }}>
                <option value="EDITOR">Redaktors</option>
                <option value="ADMIN">Administrators</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>E-pasts *</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Parole *</label>
              <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", boxSizing: "border-box" }} />
            </div>
          </div>
          {error && <p style={{ color: "#c0392b", fontSize: "0.8rem", margin: "0.8rem 0 0" }}>{error}</p>}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
            <button type="submit" disabled={creating}
              style={{ background: "#0A1F48", color: "#fff", border: "none", borderRadius: "6px", padding: "0.6rem 1.5rem", fontSize: "0.8rem", cursor: creating ? "not-allowed" : "pointer", opacity: creating ? 0.7 : 1 }}>
              {creating ? "Izveido..." : "Izveidot"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: "#888" }}>Ielādē...</p>
      ) : (
        <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #eee", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7f7f5", borderBottom: "1px solid #eee" }}>
                {["Vārds", "E-pasts", "Loma", "Reģistrēts", ""].map(h => (
                  <th key={h} style={{ padding: "0.8rem 1rem", textAlign: "left", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.85rem", color: "#333" }}>{u.name || "—"}</td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.85rem", color: "#333" }}>{u.email}</td>
                  <td style={{ padding: "0.9rem 1rem" }}>
                    <select value={u.role} onChange={e => changeRole(u.id, e.target.value)}
                      style={{ padding: "0.3rem 0.6rem", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.75rem", background: "#fff", cursor: "pointer" }}>
                      <option value="EDITOR">Redaktors</option>
                      <option value="ADMIN">Administrators</option>
                    </select>
                  </td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.75rem", color: "#999" }}>
                    {new Date(u.createdAt).toLocaleDateString("lv-LV")}
                  </td>
                  <td style={{ padding: "0.9rem 1rem", textAlign: "right" }}>
                    <button onClick={() => deleteUser(u.id, u.email)}
                      style={{ background: "none", border: "1px solid #e0e0e0", borderRadius: "4px", padding: "0.3rem 0.7rem", fontSize: "0.75rem", color: "#c0392b", cursor: "pointer" }}>
                      Dzēst
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} style={{ padding: "2rem 1rem", textAlign: "center", color: "#888", fontSize: "0.85rem" }}>Nav lietotāju</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
