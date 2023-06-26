import { DateMath } from '../../../types';
import { setImmutable } from '../set-immutable';

const daysPerMonth = [
  31, // Jan
  28, // Feb
  31, // Mar
  30, // Apr
  31, // May
  30, // Jun
  31, // Jul
  31, // Aug
  30, // Sep
  31, // Oct
  30, // Nov
  31, // Dec
];
var cummulativeDaysPerMonth = daysPerMonth.reduce(
  (acc, daysInMonth, index) => {
    return [...acc, acc[acc.length - 1] + daysInMonth];
  },
  [0],
);

const isLeapYear = (year: number) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

// Get Day of Year
function getDayOfYear(date: Date) {
  var mn = date.getUTCMonth();
  var dn = date.getUTCDate();
  var dayOfYear = cummulativeDaysPerMonth[mn] + dn;
  if (mn > 1 && isLeapYear(date.getUTCFullYear())) dayOfYear++;
  return dayOfYear;
}

export function round(date: Date, unit: DateMath.Unit): Date {
  switch (unit) {
    case 'd': {
      return setImmutable(date, (date) => {
        if (date.getUTCHours() >= 12) {
          date.setUTCHours(24, 0, 0, 0);
        } else {
          date.setUTCHours(0, 0, 0, 0);
        }
      });
    }
    case 'w': {
      const day = date.getUTCDay();
      return setImmutable(date, (date) => {
        if (day < 4) {
          date.setUTCDate(date.getUTCDate() - day);
        } else {
          date.setUTCDate(date.getUTCDate() + 7 - day);
        }
        date.setUTCHours(0, 0, 0, 0);
      });
    }
    case 'M': {
      const day = date.getUTCDate();
      const month = date.getUTCMonth();
      const daysInMonth =
        isLeapYear(date.getUTCFullYear()) && month === 1
          ? 29
          : daysPerMonth[month];

      return setImmutable(date, (date) => {
        if (day > daysInMonth / 2) {
          date.setUTCDate(daysInMonth + 1);
        } else {
          date.setUTCDate(1);
        }
        date.setUTCHours(0, 0, 0, 0);
      });
    }
    case 'y': {
      const dayOfYear = getDayOfYear(date);
      return setImmutable(date, (date) => {
        if (dayOfYear > 183) {
          date.setUTCFullYear(date.getUTCFullYear() + 1);
        } else {
          date.setUTCFullYear(date.getUTCFullYear());
        }
        date.setUTCMonth(0, 1);
      });
    }
    case 'h': {
      const minute = date.getUTCMinutes();
      return setImmutable(date, (date) => {
        if (minute >= 30) {
          date.setUTCHours(date.getUTCHours() + 1, 0, 0, 0);
        } else {
          date.setUTCMinutes(0, 0, 0);
        }
      });
    }
    case 'm': {
      const second = date.getUTCSeconds();
      return setImmutable(date, (date) => {
        if (second >= 30) {
          date.setUTCMinutes(date.getUTCMinutes() + 1, 0, 0);
        } else {
          date.setUTCSeconds(0, 0);
        }
      });
    }
    case 's': {
      const millisecond = date.getUTCMilliseconds();
      return setImmutable(date, (date) => {
        if (millisecond >= 500) {
          date.setUTCSeconds(date.getUTCSeconds() + 1, 0);
        } else {
          date.setUTCMilliseconds(0);
        }
      });
    }
    default: {
      throw new Error('Not implemented!');
    }
  }
}
