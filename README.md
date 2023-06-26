# date-math

## Parse

* Each valid date string uniquely defines a date relative to the current time.

## Stringify

* Many possible date-math strings represent a given date relative to the current time.
* Months and years aren't of a fixed size, which means their additions are non-commutative.
* This makes it difficult to generate a nice date string deterministically that uses months and years.
* It might be possible to "crawl" around the dates, updating a moving date point as you go, to incorporate these variable-size units.

## Specification

### Signatures
```typescript
type DateString = String;

fn parse(datestring: DateString): Date;
fn stringify(date: Date): DateString;
```

## Glossary
### Units
This is an exhaustive list of units of time:
```
d day
M month
y year
h hour
m minute
s second
w week
```

### Operators
This is an exhaustive list of operators:
```
- subtract
+ add
/{unit} round to closest unit
```

## Examples
Given the current date and time is `2020-05-01T00:00:00.000Z`:
```
now-1y/y  -> 2019-01-01T00:00:00.000Z - now minus one year rounded to the nearest year
now/y     -> 2020-01-01T00:00:00.000Z - now rounded to the nearest year
now-1d    -> 2020-04-30T00:00:00.000Z - now minus 1 day
now+1d    -> 2020-05-02T00:00:00.000Z - now add 1 day
now-4d-4h -> 2020-04-26T20:00:00.000Z - now minus four days and four hours
```
