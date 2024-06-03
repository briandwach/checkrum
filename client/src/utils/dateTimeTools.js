import { toZonedTime, format } from 'date-fns-tz';
import { differenceInHours, eachMonthOfInterval } from 'date-fns';

// Uses the NPM package date-fns-tz to convert the database UTC timestamp to a readable format
// in the user's browser's local time
export const dateToLocale = (time) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(time, userTimeZone);
  const formattedDate = format(zonedDate, 'P', { timeZone: userTimeZone });

  return formattedDate;
};

export const dateTimeToLocale = (time) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(time, userTimeZone);
  const formattedDate = format(zonedDate, 'Pp', { timeZone: userTimeZone });

  return formattedDate;
};

export const calculateClosedReport = (inspectionDate) => {
    const hours = differenceInHours(Date.now(), inspectionDate);
    return (hours < 48);
};

export const calculateMonths = (firstDate) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const monthArray = eachMonthOfInterval({
    start: firstDate,
    end: Date.now()
  });

  let formattedArr = [];

  for (const month of monthArray) {
    const newFormat = format(month, 'MMM yyyy', { timeZone: userTimeZone });
    formattedArr.push(newFormat);
  }

  formattedArr.reverse();

  return formattedArr;
};