import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/common/Navbar";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;