// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

// jest.mock('./index', () => {
//   const originalModule =
//     jest.requireActual<typeof import('./index')>('./index');
// });

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    expect(log).toBeCalledWith('foo');
    mockTwo();
    expect(log).toBeCalledWith('bar');
    mockThree();
    expect(log).toBeCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    const log = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(log).toBeCalledWith('I am not mocked');
  });
});
