import React, { useState } from 'react';
import { Transaction } from '../types';

interface AddTransactionProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: parseFloat(amount),
      category,
      description,
      type,
    };
    onAddTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setDescription('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          金额
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          类别
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          描述
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">类型</label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
              className="form-radio text-green-500"
            />
            <span className="ml-2">支出</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
              className="form-radio text-green-500"
            />
            <span className="ml-2">收入</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        记一笔
      </button>
    </form>
  );
};

export default AddTransaction;