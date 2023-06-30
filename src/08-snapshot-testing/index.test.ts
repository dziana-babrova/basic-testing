// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const list = {
    value: 'one',
    next: {
      value: 'two',
      next: { value: 'three', next: { value: null, next: null } },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(['one', 'two', 'three']);
    console.log(result);
    expect(result).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(['one', 'two', 'three']);
    expect(result).toMatchSnapshot();
  });
});
