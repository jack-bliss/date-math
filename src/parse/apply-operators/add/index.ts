import { DateMath } from '../../../types';
import { setImmutable } from '../set-immutable';

export function add(
  date: Date,
  amount: number,
  unit: DateMath.Unit,
): Date {
  switch (unit) {
    case 'd':
      return setImmutable(date, (date) =>
        date.setUTCDate(date.getUTCDate() + amount),
      );
    case 'w':
      return setImmutable(date, (date) =>
        date.setUTCDate(date.getUTCDate() + amount * 7),
      );
    case 'M':
      return setImmutable(date, (date) =>
        date.setUTCMonth(date.getUTCMonth() + amount),
      );
    case 'y':
      return setImmutable(date, (date) =>
        date.setUTCFullYear(date.getUTCFullYear() + amount),
      );
    case 'h':
      return setImmutable(date, (date) =>
        date.setUTCHours(date.getUTCHours() + amount),
      );
    case 'm':
      return setImmutable(date, (date) =>
        date.setUTCMinutes(date.getUTCMinutes() + amount),
      );
    case 's':
      return setImmutable(date, (date) =>
        date.setUTCSeconds(date.getUTCSeconds() + amount),
      );
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }
}
