import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}