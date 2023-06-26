import { DateMath } from '../types';

export function chunkOperations(value: string): DateMath.Operation[] {
  // regular expression for math chunks
  const regex = /[-+\/]\d*[dwMyhms]/g;
  const matches = value.match(regex);
  if (!matches) {
    return [];
  }
  return matches.map((match) => {
    // first character is the operator
    const operator = match[0] as '+' | '-' | '/';
    // if rounding, there's no amount
    if (operator === '/') {
      return {
        operator,
        unit: match[1] as DateMath.Unit,
      };
    }
    // amounts are optional with + and - operations
    // if no amount, default to 1
    const amount = parseInt(match.slice(1, -1), 10);
    return {
      operator,
      amount,
      unit: match[match.length - 1] as DateMath.Unit,
    };
  });
}
