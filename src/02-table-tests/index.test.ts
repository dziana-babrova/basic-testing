// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 19, b: 10, action: Action.Subtract, expected: 9 },
  { a: 32, b: 7, action: Action.Subtract, expected: 25 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 19, b: 10, action: Action.Multiply, expected: 190 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 121, b: 11, action: Action.Divide, expected: 11 },
  { a: 700, b: 7, action: Action.Divide, expected: 100 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
  { a: 11, b: 2, action: Action.Exponentiate, expected: 121 },
  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: 10, b: 3, action: 'unknown action', expected: null },
  { a: '10', b: '3', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'validateEmail(%s) should be %s',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
