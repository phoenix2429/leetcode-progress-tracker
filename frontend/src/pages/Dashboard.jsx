import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import { sortByTotal } from "../utils/helpers";
import Navbar from "../components/layout/Navbar";
import UserCard from "../components/leaderboard/UserCard";
import Loading from "../components/common/Loading";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStats().then((res) => {
      setData(sortByTotal(res));
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Navbar />
      <div className="card-grid">
        {data.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;