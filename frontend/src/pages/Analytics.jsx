import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import {
  calculateGrowth,
  generateAlerts,
  difficultyAnalysis,
  calculateStreak,
  predictFuture
} from "../utils/analyticsUtils";

export default function Analytics() {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/latest.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("/history/index.json")
      .then((res) => res.json())
      .then((files) => {
        Promise.all(
          files.map((file) =>
            fetch(`/history/${file}`).then((r) => r.json())
          )
        ).then((data) => setHistory(data));
      })
      .catch(() => console.log("No history found"));
  }, []);

  if (users.length === 0) {
    return <div style={{ padding: "60px", fontSize: "22px" }}>Loading Analytics...</div>;
  }

  // BASIC
  const totalUsers = users.length;
  const totalSolved = users.reduce((sum, u) => sum + u.total, 0);
  const averageSolved = Math.round(totalSolved / totalUsers);

  const topUser = users.reduce((prev, current) =>
    prev.total > current.total ? prev : current
  );

  const totalEasy = users.reduce((sum, u) => sum + u.easy, 0);
  const totalMedium = users.reduce((sum, u) => sum + u.medium, 0);
  const totalHard = users.reduce((sum, u) => sum + u.hard, 0);

  const difficultyData = [
    { name: "Easy", value: totalEasy },
    { name: "Medium", value: totalMedium },
    { name: "Hard", value: totalHard },
  ];

  // ADVANCED FEATURES
  const growth = calculateGrowth(history);
  const alerts = generateAlerts(growth);
  const strengthLevel = difficultyAnalysis(history[history.length - 1]);
  const streak = calculateStreak(history);
  const projection = predictFuture(history);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "40px",
        color: "white",
        fontFamily: "Segoe UI"
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "30px" }}>
        🚀 LeetCode Analytics Dashboard
      </h1>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        {[
          { label: "Total Users", value: totalUsers },
          { label: "Total Solved", value: totalSolved },
          { label: "Average Solved", value: averageSolved },
          { label: "Top Performer", value: topUser.username }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              transition: "0.3s"
            }}
          >
            <h3 style={{ opacity: 0.7 }}>{item.label}</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ADVANCED INSIGHTS */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "40px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📊 Performance Insights</h2>

        <p><strong>Daily Growth:</strong> +{growth.problemGrowth}</p>
        <p><strong>Skill Level:</strong> {strengthLevel}</p>
        <p><strong>Consistency Streak:</strong> {streak} Days 🔥</p>
        <p><strong>30-Day Projection:</strong> {projection}</p>

        <div style={{ marginTop: "20px" }}>
          {alerts.map((alert, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            >
              {alert}
            </div>
          ))}
        </div>
      </div>

      {/* CHART */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          color: "black"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Difficulty Distribution</h2>

        <BarChart width={700} height={350} data={difficultyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </div>
    </div>
  );
}