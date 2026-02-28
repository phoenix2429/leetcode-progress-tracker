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

  return (
    <div style={{ padding: "40px" }}>
      <h1>Leaderboard</h1>
      {users.map((user, index) => (
        <div key={user.username}>
          #{index + 1} {user.username} — {user.total} problems
        </div>
      ))}
    </div>
  );
}