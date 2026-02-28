import axios from "axios";

export const fetchStats = async () => {
  const response = await axios.get("/latest.json");
  return response.data;
};