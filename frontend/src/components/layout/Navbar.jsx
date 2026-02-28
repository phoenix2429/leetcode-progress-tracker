import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <Link to="/">Dashboard</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/analytics">Analytics</Link>
    </div>
  );
}

export default Navbar;