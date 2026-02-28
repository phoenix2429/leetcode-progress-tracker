import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import { sortByTotal } from "../utils/helpers";
import Navbar from "../components/layout/Navbar";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import Loading from "../components/common/Loading";

function Leaderboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStats().then((res) => {
      setData(sortByTotal(res));
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <Navbar />
      <LeaderboardTable data={data} />
    </div>
  );
}

export default Leaderboard;