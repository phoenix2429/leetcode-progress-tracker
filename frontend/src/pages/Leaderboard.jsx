import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/latest.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.total - a.total);
        setUsers(sorted);
      });
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "40px",
        fontFamily: "Segoe UI",
        color: "white"
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "40px" }}>
        🏆 Leaderboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px"
        }}
      >
        {users.map((user, index) => (
          <div
            key={user.username}
            style={{
              background:
                index < 3
                  ? "linear-gradient(135deg, rgba(255,255,255,0.08))"
                  : "rgba(255,255,255,0.1)",
              backdropFilter: index >= 3 ? "blur(10px)" : "none",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              color: "white",
            
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.4)";
            }}
          >
            <h2 style={{ fontSize: "26px", marginBottom: "15px" }}>
              {getMedal(index)} {user.username}
            </h2>

            <div style={{ fontSize: "18px" }}>
              <p>📊 Total Solved: <strong>{user.total}</strong></p>
              <p>🟢 Easy: {user.easy}</p>
              <p>🟡 Medium: {user.medium}</p>
              <p>🔴 Hard: {user.hard}</p>
              <p>🏆 Ranking: {user.ranking}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}