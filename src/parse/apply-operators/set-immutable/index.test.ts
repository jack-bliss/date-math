import { setImmutable } from '.';

describe('setImmutable', () => {
  it('should modify a date without changing the original', () => {
    const date = new Date();
    const originalValue = new Date(date.getTime());

    const result = setImmutable(date, (date) => {
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCFullYear(date.getUTCFullYear() + 1);
    });

    expect(date).not.toEqual(result);
    expect(date).toEqual(originalValue);
  });
});
