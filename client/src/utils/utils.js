export const generateYearArray = () => {
  let array = [];
  for (let i = 0; i < 365; i++) {
    let date = new Date();
    date.setFullYear(2021, 0, 1);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + i);
    const newDate = date.toISOString().split("T")[0];
    array.push(newDate);
  }
  return array;
};
