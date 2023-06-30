// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
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
