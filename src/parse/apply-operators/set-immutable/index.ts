export function setImmutable(date: Date, set: (date: Date) => void): Date {
  const copy = new Date(date.getTime());
  set(copy);
  return copy;
}
