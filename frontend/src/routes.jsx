import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default RoutesConfig;