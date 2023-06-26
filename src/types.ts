export module DateMath {
  export type DateString = `now${string}`;
  export type Unit = 'd' | 'w' | 'M' | 'y' | 'h' | 'm' | 's';
  export type Operation =
    | {
        operator: '+' | '-';
        amount: number;
        unit: Unit;
      }
    | {
        operator: '/';
        unit: Unit;
      };
}
