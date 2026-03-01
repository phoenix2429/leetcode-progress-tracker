import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/latest.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

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
      <h1 style={{ fontSize: "38px", marginBottom: "40px" }}>
        💻 LeetCode Progress Dashboard
      </h1>

      {users.length === 0 && (
        <p style={{ fontSize: "20px" }}>Loading data...</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px"
        }}
      >
        {users.map((user) => (
          <div
            key={user.username}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.3)";
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>
              👤 {user.username}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "16px"
              }}
            >
              <div>📊 Total</div>
              <div style={{ fontWeight: "bold" }}>{user.total}</div>

              <div>🟢 Easy</div>
              <div>{user.easy}</div>

              <div>🟡 Medium</div>
              <div>{user.medium}</div>

              <div>🔴 Hard</div>
              <div>{user.hard}</div>

              <div>🏆 Ranking</div>
              <div>{user.ranking}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}