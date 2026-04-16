"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) router.push("/admin");
    else setError("Nepareizs e-pasts vai parole.");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A1F48",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "3rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "1.6rem", letterSpacing: "0.2em", fontWeight: 300, color: "#0A1F48", marginBottom: "0.4rem" }}>
            LAURIFY
          </div>
          <div style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "0.1em" }}>ADMIN PANELIS</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>
              E-pasts
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>
              Parole
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.8rem", color: "#c0392b", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.9rem",
              background: "#0A1F48",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Ieiet..." : "Ieiet"}
          </button>
        </form>
      </div>
    </div>
  );
}
