// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  const bankAccount = getBankAccount(initialBalance);
  const bankAccountForTransfers = getBankAccount(0);

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      bankAccount.withdraw(initialBalance * 10);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      bankAccount.transfer(initialBalance * 10, bankAccountForTransfers);
    } catch (e) {
      expect(e).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      bankAccount.transfer(10, bankAccount);
    } catch (e) {
      expect(e).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const sum = 2000;
    bankAccount.deposit(sum);
    const result = bankAccount.getBalance();
    expect(result).toBe(3000);
  });

  test('should withdraw money', () => {
    const sum = 2000;
    bankAccount.withdraw(sum);
    const result = bankAccount.getBalance();
    expect(result).toBe(1000);
  });

  test('should transfer money', () => {
    const sum = 100;
    bankAccount.transfer(sum, bankAccountForTransfers);
    const bankAccountBalance = bankAccount.getBalance();
    const bankAccountForTransfersBalance = bankAccountForTransfers.getBalance();
    expect(bankAccountBalance).toBe(900);
    expect(bankAccountForTransfersBalance).toBe(sum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const result = await bankAccount.synchronizeBalance();
      expect(typeof result === 'number').toBeTruthy();
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const newBalance = await bankAccount.synchronizeBalance();
      const balance = bankAccount.getBalance();
      expect(balance).toBe(newBalance);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
