import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import Navbar from "../components/layout/Navbar";
import DifficultyChart from "../components/charts/DifficultyChart";
import Loading from "../components/common/Loading";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStats().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="container">
      <h1>Analytics</h1>
      <Navbar />
      <DifficultyChart data={data} />
    </div>
  );
}

export default Analytics;