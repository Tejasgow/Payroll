import { useState } from "react";
import api from "../api/client";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // BACKEND EXPECTS email + password
            const res = await api.post("/token/", {
                email: email,
                password: password,
            });

            localStorage.setItem("accessToken", res.data.access);
            localStorage.setItem("refreshToken", res.data.refresh);

            onLogin && onLogin();
        } catch (err) {
            setError(
                err?.response?.data?.detail ||
                err?.response?.data?.email?.[0] ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 20, maxWidth: 400 }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={loading} style={{ padding: 10 }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}