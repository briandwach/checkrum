import { toZonedTime, format } from 'date-fns-tz';

// Uses the NPM package date-fns-tz to convert the database UTC timestamp to a readable format
// in the user's browser's local time
const dateToLocale = (time) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(time, userTimeZone);
  const formattedDate = format(zonedDate, 'Pp', { timeZone: userTimeZone });

  return formattedDate;
};

export default dateToLocale;