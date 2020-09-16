import { getItem, USERLOGGED } from "./storage";

export const getCurrentDate = () => {
  let date = new Date();
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const noop = () => {};

function validateFormatCard(value) {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}
export const getRandomCardNumber = (digits) => {
  var chars = "0123456789";
  var randomstring = "";
  for (var i = 0; i < digits; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return validateFormatCard(randomstring);
};

export const getEmailUserLogged = async () => {
  const user = await getItem(USERLOGGED);
  return user.email;
};
