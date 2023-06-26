import { DateMath } from '../../types';
import { add } from './add';
import { round } from './round';

export function applyOperations(
  date: Date,
  operations: DateMath.Operation[],
): Date {
  return operations.reduce((date, operation) => {
    switch (operation.operator) {
      case '+':
        return add(date, operation.amount, operation.unit);
      case '-':
        return add(date, -1 * operation.amount, operation.unit);
      case '/':
        return round(date, operation.unit);
      default: {
        throw new Error(
          `Unexpected operation: ${JSON.stringify(operation)}`,
        );
      }
    }
  }, date);
}
