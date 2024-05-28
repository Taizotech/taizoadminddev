/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";

import { clevertap_id } from "./App";
// clever tap
import clevertap from "clevertap-web-sdk";

import moment from "moment-timezone";
import { RolesAndAccessActions } from "./redux-store/store";
import { useDispatch } from "react-redux";
import { GetRolesAndAccess } from "./apiServices";

const Dispatch = useDispatch;

// time ago function
export function TimeAgo(props) {
  let date = new Date(props.dateValue);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " year(s)";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " month(s)";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " day(s)";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hour(s)";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min(s)";
  }
  return Math.floor(seconds) + " sec(s)";
}

export function TimeAgoPlusFiveHours(props) {
  let date = new Date(props.dateValue);
  var seconds = Math.floor((new Date() - date) / 1000);

  // Add 5 hours and 30 minutes to the calculated time difference
  seconds -= 5 * 3600 + 30 * 60;

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " year(s)";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " month(s)";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " day(s)";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hour(s)";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min(s)";
  }
  return Math.floor(seconds) + " sec(s)";
}

export function DynamicTimeAgo(baseTime, hours, minutes) {
  const adjustedTime = moment(baseTime)
    .add(hours, "hours")
    .add(minutes, "minutes");

  const now = moment();
  const timeDifference = now.diff(adjustedTime, "milliseconds");

  const thresholds = [
    { threshold: 3600 * 1000, unit: "hours", singular: "hour" },
    { threshold: 60 * 1000, unit: "minutes", singular: "minute" },
    { threshold: 1000, unit: "seconds", singular: "second" },
  ];

  for (const { threshold, unit, singular } of thresholds) {
    const difference = Math.floor(timeDifference / threshold);
    if (difference >= 1) {
      return `${difference} ${difference === 1 ? singular : unit} ago`;
    }
  }

  // If less than a second ago, display "just now"
  return "just now";
}
export function MyModal(props) {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-root")
  );
}
export function Detailsshow(props) {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-root1")
  );
}
// change date format
export function Ddmmmyyyy_date({ dateValue }) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("DD-MMM-YYYY hh:mm A");
  return istTime;
}
export function Date_Date({ dateValue }) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY hh:mm A");
  return istTime;
}
export function dateAndTimeFormate({ dateValue }) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD hh:mm:ss");
  return istTime;
}
export function dateAndTimeHHMMSS(dateValue) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD hh:mm:ss");
  return istTime;
}
// const moment = require("moment-timezone");

export function startOfDayInIST(dateValue) {
  const startOfDay = moment(dateValue)
    .tz("Asia/Kolkata")
    .startOf("day")
    .format("YYYY-MM-DD HH:mm:ss");
  return startOfDay;
}

export function endOfDayInIST(dateValue) {
  const endOfDay = moment(dateValue)
    .tz("Asia/Kolkata")
    .endOf("day")
    .format("YYYY-MM-DD HH:mm:ss");
  return endOfDay;
}

const scheduledStart = startOfDayInIST(new Date());
const scheduledEnd = endOfDayInIST(new Date());

console.log("Scheduled Start:", scheduledStart);
console.log("Scheduled End:", scheduledEnd);
export function dateFormate(dateValue) {
  const istTime = moment(dateValue).tz("Asia/Kolkata").format("YYYY-MM-DD");
  return istTime;
}
export function dateFormateDD(dateValue) {
  const istTime = moment(dateValue).tz("Asia/Kolkata").format("DD-MM-YYYY ");
  return istTime;
}
export function DMMMYYYY_formate({ dateValue }) {
  // 18-Aug-2023 Component
  const istTime = moment(dateValue).tz("Asia/Kolkata").format("DD-MMM-YYYY ");
  return istTime;
}

export function dMMMYYYY_formate(dateValue) {
  // 18-Aug-2023 function
  const istTime = moment(dateValue).tz("Asia/Kolkata").format("DD-MMM-YYYY ");
  return istTime.trim();
}

export function DDMMYYYY_formate({ dateValue }) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY hh:mm A");

  return istTime;
}

export function addHoursAndMinutesToDate(hours, mins, input) {
  // Make a copy of the input date to avoid modifying the original date
  var newDate = new Date(input);

  // Add 5 hours and 30 minutes
  newDate.setHours(newDate.getHours() + hours);
  newDate.setMinutes(newDate.getMinutes() + mins);

  return newDate;
}

export function MMMMDDYYYY_formate({ dateValue }) {
  const options = {
    day: "numeric",
    year: "numeric",
    month: "short",
  };
  const timer = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateValue);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = date.toLocaleTimeString("en-US", timer);

  return `${formattedDate}, ${time}`;
}

export function Weekday_MMDDYYY({ dateValue }) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("ddd , DD-MMM-YYYY");

  return istTime;
}
// clever tap

export function CleverTapInit(name, email) {
  // console.log(clevertap_id);
  // console.log(name, email);
  clevertap.init(clevertap_id);
  // for profile creation
  clevertap.onUserLogin.push({
    Site: {
      Name: name, // String
      Identity: email, // String or number
      Email: email, // Email address of the user
      // Phone: "+16383465436", // Phone (with the country code)
      // Gender: "M", // Can be either M or F
      loginTime: new Date(), // Date of Birth. Date object
      // optional fields. controls whether the user will be sent email, push etc.
      "MSG-email": true, // Disable email notifications
      "MSG-push": true, // Enable push notifications
      "MSG-sms": true, // Enable sms notifications
      "MSG-whatsapp": true, // Enable WhatsApp notifications
    },
  });

  // for event
  // clevertap.event.push("My New Web Push Message Campaign", {
  //   "Product name": "Casio Chronograph Watch",
  //   Category: "Mens Accessories",
  //   Price: 59.99,
  //   Date: new Date(),
  // });

  // for web push permission
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./clevertap_sw.js");
  }

  clevertap.notifications.push({
    apnsWebPushId: "<apple web push id>", //only for safari browser
    apnsWebPushServiceUrl: "<safari package service url>", //only for safari browser
    titleText: "Would you like to receive Push Notifications?",
    bodyText:
      "We promise to only send you relevant content and give you updates on your transactions",
    okButtonText: "Sign me up!",
    rejectButtonText: "No thanks",
    okButtonColor: "#f28046",
  });

  console.log("cleverTap called");
}

export const strictNumberValidator = (value, maxLength) => {
  if (value.trim() === "") {
    return true; // Allow empty values
  }
  return /^\d+$/.test(value) && value.length <= maxLength;
};

export function convertDateYYYYMMDD(dateString) {
  console.log(dateString);
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);

  return formattedDate;
}

export function convertDateDDMMYYY(dateString) {
  console.log(dateString);
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  console.log(formattedDate);

  return formattedDate;
}
export function convertTime(dateString) {
  console.log(dateString);
  const dateObj = new Date(dateString);
  const hours = String(dateObj.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  const ampm = dateObj.getHours() >= 12 ? "PM" : "AM";
  const formattedDate = `${hours}:${minutes} ${ampm}`;

  console.log(formattedDate);

  return formattedDate;
}

const handlePhoneIconClick = (phoneNumber) => {
  window.location.href = `tel:${phoneNumber}`;
};
const handleWhatsAppIconClick = (phoneNumber) => {
  // console.log(event)
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
  window.open(whatsappURL, "_blank");
};

export function gstTest(val) {
  const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
  return gstRegex.test(val);
}

export function alphabetTest(val) {
  const Regex = /^[a-zA-Z\s]*$/;
  return Regex.test(val);
}

export function alphabetWithSpecialCharacterTest(val) {
  const regex = /^[a-zA-Z\s!@#$%^&*()\-_=+[{\]};:'",<.>/?]*$/;
  return regex.test(val);
}

export function numbersOnlyTest(val) {
  const regex = /^[0-9]*$/;
  return regex.test(val);
}

export function numbersOnlyWithDOtTest(val) {
  const regex = /^[0-9.]*$/;
  return regex.test(val);
}

export function alphanumericTest(val) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(val);
}
export function emailValidation(val) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(val);
}
export function uppercaseOnlyTest(val) {
  const regex = /^[A-Z]*$/;
  return regex.test(val);
}

export const addDaysToDate = (days) => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + days);

  return futureDate;
};
export const minusDaysToDate = (days) => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() - days);

  return futureDate;
};
// export const extendOneWeek = (days) => {
//   const currentDate = new Date();
//   const futureDate = new Date();
//   futureDate.setDate(currentDate.getDate() - days);

//   return futureDate;
// };
export const DaysToDate = (days) => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() - days);

  return futureDate;
};

export function subDaysToDate(days) {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - days);

  return pastDate.toISOString().split("T")[0];
}

export function textTruncate(text, length) {
  return text
    ? text.length > length
      ? text.substring(0, length) + " ...."
      : text
    : "";
}

export function capitalizeWords(str) {
  return str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";
}

export function capitalizeWord(str) {
  return typeof str === "string"
    ? str.replace(/\b\w/g, (char) => char.toUpperCase())
    : "";
}

export function dateFormateDDTT(dateValue) {
  const istTime = moment(dateValue)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss A");
  return istTime;
}

export function formatDate(dateString) {
  if (!dateString) {
    return "N/A";
  }

  const joinedOnDate = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return joinedOnDate.toLocaleDateString("en-US", options);
}

// age calculate
export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) {
    return null;
  }
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) {
    return null;
  }
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

export function hasAccessTo(accessList, access) {
  return accessList.includes(access);
}

export function getCurrentDateTime() {
  const dateObj = new Date();

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const getMaxDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const maxYear = currentYear - 18;
  const maxDate = `${maxYear}-${("0" + (currentDate.getMonth() + 1)).slice(
    -2
  )}-${("0" + currentDate.getDate()).slice(-2)}`;
  return maxDate;
};
export function getDateSevenDaysAgo(date) {
  const sevenDaysAgo = new Date(date);
  sevenDaysAgo.setDate(date.getDate() - 7);
  return sevenDaysAgo;
}

export function modifyDate(type, value) {
  const newDate = new Date();

  if (type === "add") {
    newDate.setDate(newDate.getDate() + value);
  } else if (type === "sub") {
    newDate.setDate(newDate.getDate() - value);
  }
  return newDate;
}

export const addOneyear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const maxYear = currentYear + 1;
  const getnextyear = new Date(maxYear, 0, 2);
  const nextyear = getnextyear.toISOString().slice(0, 10);

  return nextyear;
};

export const addYear = (Year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const maxYear = currentYear + Year;
  const getnextyear = new Date(maxYear, 0, 2);
  const nextyear = getnextyear.toISOString().slice(0, 10);
  return nextyear;
};
