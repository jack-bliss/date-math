import { DateMath } from '../types';

function collapseStack(stack: DateMath.Operation[]): DateMath.DateString {
  return stack.reduce((str, next) => {
    if (next.operator === '/') {
      return `${str}${next.operator}${next.unit}` as DateMath.DateString;
    }
    if (next.amount === 0) {
      return str;
    }
    return `${str}${next.operator}${next.amount}${next.unit}` as DateMath.DateString;
  }, `now` as DateMath.DateString);
}

export function stringify(date: Date): DateMath.DateString {
  const now = new Date();

  const differenceInMilliSeconds = now.getTime() - date.getTime();
  let differenceInSeconds = Math.abs(
    Math.round(differenceInMilliSeconds / 1000),
  );

  // if differenceInSeconds is greater than 0,
  // then the target date is in the past
  const operator = differenceInMilliSeconds > 0 ? `-` : `+`;
  const operationStack: DateMath.Operation[] = [];

  if (differenceInSeconds < 60) {
    return collapseStack([
      { operator, amount: differenceInSeconds, unit: 's' },
    ]);
  }

  operationStack.push({
    operator,
    amount: differenceInSeconds % 60,
    unit: 's',
  });
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);

  if (differenceInMinutes < 60) {
    return collapseStack([
      ...operationStack,
      { operator, amount: differenceInMinutes, unit: 'm' },
    ]);
  }

  operationStack.push({
    operator,
    amount: differenceInMinutes % 60,
    unit: 'm',
  });
  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return collapseStack([
      ...operationStack,
      { operator, amount: differenceInHours, unit: 'h' },
    ]);
  }

  operationStack.push({
    operator,
    amount: differenceInHours % 24,
    unit: 'h',
  });
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays < 7) {
    return collapseStack([
      ...operationStack,
      { operator, amount: differenceInDays, unit: 'd' },
    ]);
  }

  operationStack.push({
    operator,
    amount: differenceInDays % 7,
    unit: 'd',
  });

  // stop with weeks
  const differenceInWeeks = Math.floor(differenceInDays / 7);
  return collapseStack([
    ...operationStack,
    { operator, amount: differenceInWeeks, unit: 'w' },
  ]);
}
