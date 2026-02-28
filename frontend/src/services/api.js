import axios from "axios";

export const fetchStats = async () => {
  const response = await axios.get("/data/latest.json");
  return response.data;
};