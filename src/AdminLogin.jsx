import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import Admin from "./Admin.jsx";
import "./admin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [credentials, setCredentials] = useState({ username: "adminlogin", password: "madhu#321" });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Demo credentials only. Do not use hardcoded credentials in production.
    if (username === credentials.username && password === credentials.password) {
      setLoggedIn(true);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect username or password.");
    }
  }

  if (loggedIn) {
    return <Admin credentials={credentials} onChangeCredentials={setCredentials} onLogout={() => {
      setLoggedIn(false);
      setUsername("");
      setPassword("");
      setError("");
    }} />;
  }

  return (
    <main className="aar-login-page">
      <form className="aar-login-card" onSubmit={handleLogin}>
        <div className="aar-login-logo" aria-label="Madhu Sahasra monogram">MS</div>
        <p className="aar-login-eyebrow">MADHU SAHASRA FASHIONS</p>
        <h1>Welcome back</h1>
        <p className="aar-login-subtitle">Sign in to manage your store.</p>

        <label htmlFor="admin-username">Username</label>
        <input
          id="admin-username"
          className="aar-login-input"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <div className="aar-password-field">
          <input
            id="admin-password"
            className="aar-login-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            className="aar-password-toggle"
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="aar-login-error" role="alert">{error}</p>}

        <button className="aar-login-submit" type="submit">
          <LockKeyhole size={17} />
          <span>Sign in to dashboard</span>
        </button>

        <p className="aar-login-footer">Authorized store administrators only</p>
      </form>
    </main>
  );
}
