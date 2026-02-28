import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

function DifficultyChart({ data }) {
  return (
    <BarChart width={700} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="username" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="easy" />
      <Bar dataKey="medium" />
      <Bar dataKey="hard" />
    </BarChart>
  );
}

export default DifficultyChart;