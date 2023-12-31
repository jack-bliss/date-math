import { round } from '.';

describe('round', () => {
  it.each([
    ['2020-05-01T05:00:00.000Z', 'd', '2020-05-01T00:00:00.000Z'],
    ['2020-05-01T18:00:00.000Z', 'd', '2020-05-02T00:00:00.000Z'],
    ['2020-05-01T05:00:00.000Z', 'w', '2020-05-03T00:00:00.000Z'],
    ['2020-05-05T18:00:00.000Z', 'w', '2020-05-03T00:00:00.000Z'],
    ['2020-05-09T18:00:00.000Z', 'w', '2020-05-10T00:00:00.000Z'],
    ['2020-05-09T18:00:00.000Z', 'M', '2020-05-01T00:00:00.000Z'],
    ['2020-05-20T18:00:00.000Z', 'M', '2020-06-01T00:00:00.000Z'],
    ['2020-05-20T19:31:00.000Z', 'h', '2020-05-20T20:00:00.000Z'],
    ['2020-05-20T19:29:00.000Z', 'h', '2020-05-20T19:00:00.000Z'],
    ['2020-05-20T18:20:20.000Z', 'm', '2020-05-20T18:20:00.000Z'],
    ['2020-05-20T18:20:40.000Z', 'm', '2020-05-20T18:21:00.000Z'],
    ['2020-05-20T18:20:40.200Z', 's', '2020-05-20T18:20:40.000Z'],
    ['2020-05-20T18:20:40.800Z', 's', '2020-05-20T18:20:41.000Z'],
  ] as const)(
    `Given date %p rounded to nearest %p, expect %p`,
    (date, unit, result) => {
      expect(round(new Date(date), unit)).toEqual(new Date(result));
    },
  );
});
