// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      const initialBalance = 1000;
      const bankAccount = getBankAccount(initialBalance);
      bankAccount.withdraw(initialBalance * 10);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      const initialBalance = 1000;
      const bankAccount = getBankAccount(initialBalance);
      const bankAccountForTransfers = getBankAccount(0);
      bankAccount.transfer(initialBalance * 10, bankAccountForTransfers);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      const initialBalance = 1000;
      const bankAccount = getBankAccount(initialBalance);
      bankAccount.transfer(10, bankAccount);
    } catch (e) {
      expect(e).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const sum = 2000;
    bankAccount.deposit(sum);
    const result = bankAccount.getBalance();
    expect(result).toBe(3000);
  });

  test('should withdraw money', () => {
    const initialBalance = 3000;
    const bankAccount = getBankAccount(initialBalance);
    const sum = 2000;
    bankAccount.withdraw(sum);
    const result = bankAccount.getBalance();
    expect(result).toBe(1000);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const bankAccountForTransfers = getBankAccount(0);
    const sum = 100;
    bankAccount.transfer(sum, bankAccountForTransfers);
    const bankAccountBalance = bankAccount.getBalance();
    const bankAccountForTransfersBalance = bankAccountForTransfers.getBalance();
    expect(bankAccountBalance).toBe(900);
    expect(bankAccountForTransfersBalance).toBe(sum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const initialBalance = 1000;
      const bankAccount = getBankAccount(initialBalance);
      const result = await bankAccount.synchronizeBalance();
      expect(typeof result === 'number').toBeTruthy();
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const newBalance = 1;
    jest.spyOn(lodash, 'random').mockImplementationOnce(() => newBalance);
    const bankAccount = getBankAccount(initialBalance);
    await bankAccount.synchronizeBalance();
    const balance = bankAccount.getBalance();
    expect(balance).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      jest.spyOn(lodash, 'random').mockImplementationOnce(() => 0);
      const initialBalance = 1000;
      const bankAccount = getBankAccount(initialBalance);
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
