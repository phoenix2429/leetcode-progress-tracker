import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/latest.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded data:", data);
        setUsers(data);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>LeetCode Dashboard</h1>

      {users.length === 0 && <p>Loading data...</p>}

      {users.map((user) => (
        <div key={user.username} style={{ marginBottom: "20px" }}>
          <h3>{user.username}</h3>
          <p>Total: {user.total}</p>
          <p>Easy: {user.easy}</p>
          <p>Medium: {user.medium}</p>
          <p>Hard: {user.hard}</p>
          <p>Ranking: {user.ranking}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}