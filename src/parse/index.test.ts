import { parse } from '.';

describe('parse', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-05-01T00:00:00.000Z'));
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it.each([
    ['now', new Date('2020-05-01T00:00:00.000Z')],
    ['now-1y/y', new Date('2019-01-01T00:00:00.000Z')],
    ['now/y', new Date('2020-01-01T00:00:00.000Z')],
    ['now-1d', new Date('2020-04-30T00:00:00.000Z')],
    ['now+1d', new Date('2020-05-02T00:00:00.000Z')],
    ['now-4d-4h', new Date('2020-04-26T20:00:00.000Z')],
    ['now-35s-51m-1h-2d-784w', new Date('2005-04-19T22:08:25.000Z')],
  ] as const)(
    'should correctly parse date %p to %p',
    (dateString, date) => {
      expect(parse(dateString)).toEqual(date);
    },
  );
});
