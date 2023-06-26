import { chunkOperations } from './chunk-operators';

describe('chunkOperations', () => {
  it.each([
    [
      '-1y/y',
      [
        { operator: '-', amount: 1, unit: 'y' },
        { operator: '/', unit: 'y' },
      ],
    ],
    [
      '+4d-4h',
      [
        { operator: '+', amount: 4, unit: 'd' },
        { operator: '-', amount: 4, unit: 'h' },
      ],
    ],
    [
      '-1y+4d-2h/h',
      [
        { operator: '-', amount: 1, unit: 'y' },
        { operator: '+', amount: 4, unit: 'd' },
        { operator: '-', amount: 2, unit: 'h' },
        { operator: '/', unit: 'h' },
      ],
    ],
  ])('should get correct chunks', (value, chunks) => {
    expect(chunkOperations(value)).toEqual(chunks);
  });
});
