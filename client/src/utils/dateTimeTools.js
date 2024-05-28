import { toZonedTime, format } from 'date-fns-tz';
import { differenceInMinutes } from 'date-fns';

// Uses the NPM package date-fns-tz to convert the database UTC timestamp to a readable format
// in the user's browser's local time
export const dateToLocale = (time) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(time, userTimeZone);
  const formattedDate = format(zonedDate, 'Pp', { timeZone: userTimeZone });

  return formattedDate;
};

export const calculateClosedReport = (inspectionDate) => {
    const minutes = differenceInMinutes(Date.now(), inspectionDate);
    return (minutes < 20);
};