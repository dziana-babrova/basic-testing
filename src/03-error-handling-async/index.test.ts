// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(4);
    expect(result).toBe(4);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Custom error message');
    } catch (e: unknown) {
      expect((e as Error).message).toBe('Custom error message');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (e: unknown) {
      expect((e as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
