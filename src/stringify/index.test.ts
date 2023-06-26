import { stringify } from '.';
import { parse } from '../parse';

const mockedDate = `2020-05-01T00:00:00.000Z`;

describe('stringify', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockedDate));
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it.each([
    [`2020-05-01T00:00:00.000Z`, `now`],
    [`2020-05-01T00:00:01.000Z`, `now+1s`],
    [`2020-05-01T00:01:00.000Z`, `now+1m`],
    [`2020-05-01T00:01:01.000Z`, `now+1s+1m`],
    [`2020-05-01T00:22:33.000Z`, `now+33s+22m`],
    [`2020-05-01T00:20:00.000Z`, `now+20m`],
    [`2020-05-01T01:00:00.000Z`, `now+1h`],
    [`2020-05-01T01:00:01.000Z`, `now+1s+1h`],
    [`2020-05-01T01:01:01.000Z`, `now+1s+1m+1h`],
    [`2020-05-02T00:00:00.000Z`, `now+1d`],
    [`2020-05-02T00:22:03.000Z`, `now+3s+22m+1d`],
    // [`2020-06-01T00:00:00.000Z`, `now+1M`],
    // [`2021-05-01T00:00:00.000Z`, `now+1y`],
    [`2020-04-30T23:59:59.000Z`, `now-1s`],
    [`2020-04-30T23:59:33.000Z`, `now-27s`],
    [`2020-04-30T23:58:33.000Z`, `now-27s-1m`],
    [`2020-04-30T23:59:00.000Z`, `now-1m`],
    [`2020-04-30T23:00:00.000Z`, `now-1h`],
    [`2020-04-30T00:00:00.000Z`, `now-1d`],
    [`2020-04-29T04:06:00.000Z`, `now-54m-19h-1d`],
    // [`2020-04-01T00:00:00.000Z`, `now-1M`],
    // [`2019-05-01T00:00:00.000Z`, `now-1y`],
  ])(
    `given current date ${mockedDate} and target date %p, should return %p`,
    (input, expected) => {
      const date = new Date(input);
      expect(stringify(date)).toBe(expected);
    },
  );

  const attacks = 10000;
  it(`should stand up to ${attacks} randomly generated spam attacks`, () => {
    for (let i = 0; i < attacks; i++) {
      const targetDate = new Date(
        Math.floor((Math.random() + 0.5) * new Date().getTime()),
      );
      targetDate.setUTCMilliseconds(0);
      const result = stringify(targetDate);
      const reformed = parse(result);
      try {
        expect(reformed.getTime()).toEqual(targetDate.getTime());
      } catch (error) {
        throw new Error(
          `Failed with target date ${targetDate.toISOString()}, generated "${result}" which reformed to ${reformed.toISOString()}`,
        );
      }
    }
  });
});
