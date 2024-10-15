import { Transaction, Summary } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(amount);
};

export const groupTransactionsByDate = (transactions: Transaction[]): Record<string, Transaction[]> => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('zh-CN');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
};

export const calculateSummary = (transactions: Transaction[]): Summary => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpense += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );
};