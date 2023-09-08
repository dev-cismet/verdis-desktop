export const getNonce = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayString = yyyy + mm + dd;
  const todayInt = parseInt(todayString);
  return todayInt + Math.random();
};

export const compare = (a, b) => {
  return (
    isFinite(b) - isFinite(a) ||
    a - b ||
    (a?.length === b?.length && a.toString().localeCompare(b)) ||
    a?.length - b?.length
  );
};
