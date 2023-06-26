import { DateMath } from '../types';
import { applyOperations } from './apply-operators';
import { chunkOperations } from './chunk-operators';

export function parse(dateString: DateMath.DateString): Date {
  const operations = chunkOperations(dateString.replace('now', ''));
  const now = new Date();
  return applyOperations(now, operations);
}
