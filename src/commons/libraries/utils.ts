export const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate() + 1;
  return `${yyyy}/${mm}/${dd}`;
};
