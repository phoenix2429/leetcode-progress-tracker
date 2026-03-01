import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#00f2fe" : "white",
    fontWeight: location.pathname === path ? "bold" : "normal",
    padding: "10px 18px",
    borderRadius: "8px",
    transition: "0.3s ease",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        fontFamily: "Segoe UI",
      }}
    >
      {/* Logo */}
      <div style={{ color: "white", fontSize: "22px", fontWeight: "bold" }}>
        🚀 CodeTracker
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={linkStyle("/")}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Dashboard
        </Link>

        <Link
          to="/leaderboard"
          style={linkStyle("/leaderboard")}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Leaderboard
        </Link>

        <Link
          to="/analytics"
          style={linkStyle("/analytics")}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Analytics
        </Link>
      </div>
    </nav>
  );
}