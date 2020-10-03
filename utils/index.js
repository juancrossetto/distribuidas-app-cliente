import { getItem, USERLOGGED } from "./storage";
import NetInfo from "@react-native-community/netinfo";
var moment = require("moment"); // require

export const getCurrentDate = () => {
  let date = new Date();
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const addMonthCurrentDate = (months) => {
  return moment().add(months, "M").format("DD-MM-YYYY");
};

export const addMonthCurrentDateWithoutFormat = (months) => {
  return moment().add(months, "months").format();
};

export const formatMillisecondsToDateString = (date) => {
  return moment(date, "x").format("DD-MM-YYYY");
};

export const getFirstDayOfWeek = () => {
  return moment().startOf("week").format("YYYY-MM-DD");
};

export const getLastDayOfWeek = () => {
  return moment().endOf("week").format("YYYY-MM-DD");
};

export const getFirstDayOfMonth = () => {
  return moment().startOf("month").format("YYYY-MM-DD");
};

export const getLastDayOfMonth = () => {
  return moment().endOf("month").format("YYYY-MM-DD");
};

export const formatDateStringToMilliseconds = (
  dateString,
  format = "MM/DD/YY"
) => {
  return moment(dateString, format).toDate().getTime();
};

export const formatDate = (dateString) => {
  var date = new Date(dateString);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getFutureDate = function (days) {
  return moment().add(days, "days");
};

export const getCurrentDateISO8601 = () => {
  return moment.utc(new Date(), "YYYY-MM-DD HH:mm:ss.SSS");
};
export const noop = () => {};

export const getEmailUserLogged = async () => {
  const user = await getItem(USERLOGGED);
  if (!user) {
    return "";
  } else {
    return user.email;
  }
};

export const getNameUserLogged = async () => {
  const user = await getItem(USERLOGGED);
  return user.name;
};

export const getResult = async (data, isSuccess) => {
  const result = { data: data, isSuccess: isSuccess };
  return result;
};

export const getRandomColor = () => {
  return (
    "#" +
    ((Math.random() * 0xffffff) << 0).toString(16) +
    "000000"
  ).slice(0, 7);
};

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

export const isNetworkAvailable = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected;
};
