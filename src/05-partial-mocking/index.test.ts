// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.spyOn(console, 'log').mockImplementation(),
    mockTwo: jest.spyOn(console, 'log').mockImplementation(),
    mockThree: jest.spyOn(console, 'log').mockImplementation(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const log = jest.spyOn(console, 'log');
    mockOne();
    expect(log).not.toBeCalled();
    mockTwo();
    expect(log).not.toBeCalled();
    mockThree();
    expect(log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const log = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(log).toBeCalled();
  });
});
