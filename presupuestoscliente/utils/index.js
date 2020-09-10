export const getCurrentDate = () => {
  let date = new Date();
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const noop = () => {};
