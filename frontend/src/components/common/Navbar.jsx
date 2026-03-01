import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#4f1212", color: "#fbc9ba" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>
        Dashboard
      </Link>
      <Link to="/leaderboard" style={{ color: "white" }}>
        Leaderboard
      </Link>
      <Link to="/analytics" style={{ marginLeft: "20px", color: "white" }}>
        Analytics
      </Link>
    </nav>
  );
}