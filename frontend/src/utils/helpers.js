export const sortByTotal = (data) => {
  return [...data].sort((a, b) => b.total - a.total);
};