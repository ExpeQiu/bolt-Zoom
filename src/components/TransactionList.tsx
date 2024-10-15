import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils';
import { ShoppingBag, Coffee, Zap } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'shopping':
      return <ShoppingBag className="w-6 h-6 text-green-500" />;
    case 'food':
      return <Coffee className="w-6 h-6 text-green-500" />;
    case 'services':
      return <Zap className="w-6 h-6 text-green-500" />;
    default:
      return <ShoppingBag className="w-6 h-6 text-green-500" />;
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            {getCategoryIcon(transaction.category)}
            <div>
              <p className="font-semibold">{transaction.category}</p>
              <p className="text-sm text-gray-500">{transaction.description}</p>
              <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleString()}</p>
            </div>
          </div>
          <p className={`font-semibold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
            {transaction.type === 'expense' ? '-' : '+'}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;