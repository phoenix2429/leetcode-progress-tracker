import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Analytics() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/latest.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (users.length === 0) {
    return <div style={{ padding: "40px" }}>Loading Analytics...</div>;
  }

  // ---- Calculations ----
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

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analytics</h1>

      <div style={{ marginBottom: "30px" }}>
        <p><strong>Total Users:</strong> {totalUsers}</p>
        <p><strong>Average Solved:</strong> {averageSolved}</p>
        <p><strong>Top Performer:</strong> {topUser.username} ({topUser.total})</p>
      </div>

      <h2>Difficulty Distribution</h2>

      <BarChart width={500} height={300} data={difficultyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}