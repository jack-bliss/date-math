import { add } from '.';

const mockedDate = `2020-05-01T00:00:00.000Z`;

describe('add', () => {
  it.each([
    [4, 'd', new Date('2020-05-05T00:00:00.000Z')],
    [-4, 'd', new Date('2020-04-27T00:00:00.000Z')],
    [40, 'd', new Date('2020-06-10T00:00:00.000Z')],
    [-40, 'd', new Date('2020-03-22T00:00:00.000Z')],
    [2, 'w', new Date('2020-05-15T00:00:00.000Z')],
    [100, 'w', new Date('2022-04-01T00:00:00.000Z')],
    [-2, 'w', new Date('2020-04-17T00:00:00.000Z')],
    [3, 'M', new Date('2020-08-01T00:00:00.000Z')],
    [-3, 'M', new Date('2020-02-01T00:00:00.000Z')],
    [1, 'y', new Date('2021-05-01T00:00:00.000Z')],
    [-1, 'y', new Date('2019-05-01T00:00:00.000Z')],
    [1, 'h', new Date('2020-05-01T01:00:00.000Z')],
    [-1, 'h', new Date('2020-04-30T23:00:00.000Z')],
    [30, 'h', new Date('2020-05-02T06:00:00.000Z')],
    [-30, 'h', new Date('2020-04-29T18:00:00.000Z')],
    [1, 'm', new Date('2020-05-01T00:01:00.000Z')],
    [-1, 'm', new Date('2020-04-30T23:59:00.000Z')],
    [1, 's', new Date('2020-05-01T00:00:01.000Z')],
    [-1, 's', new Date('2020-04-30T23:59:59.000Z')],
  ] as const)(
    `starting with ${mockedDate}, add %p %p to get %p`,
    (amount, unit, expected) => {
      const result = add(new Date(mockedDate), amount, unit);
      expect(result).toEqual(expected);
    },
  );
});
