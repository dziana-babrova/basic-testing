// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fsPromise from 'fs/promises';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toBeCalledWith(callback, 1000);
    jest.useRealTimers();
  });

  test('should call callback only after timeout', () => {
    jest.useFakeTimers();
    doStuffByTimeout(callback, 1000);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toBeCalledWith(callback, 1000);
    jest.useRealTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.useFakeTimers();
    doStuffByInterval(callback, 1000);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const testPath = 'some/test/path';
    const joinSpy = jest.spyOn(path, 'join');
    readFileAsynchronously(testPath);
    expect(joinSpy).toBeCalledWith(__dirname, testPath);
  });

  test('should return null if file does not exist', async () => {
    const testPath = 'some/test/path';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const result = await readFileAsynchronously(testPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const testPath = 'some/test/path';
    const content = 'test value';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    const readFileSpy = jest
      .spyOn(fsPromise, 'readFile')
      .mockImplementation(async () => content);
    const result = await readFileAsynchronously(testPath);
    expect(readFileSpy).toBeCalled();
    expect(result).toBe(content);
  });
});
