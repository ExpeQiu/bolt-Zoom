import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import SummaryComponent from './components/Summary';
import AddTransaction from './components/AddTransaction';
import { Transaction, Summary } from './types';
import { groupTransactionsByDate, calculateSummary } from './utils';
import { Calendar, BarChart2, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalIncome: 0, totalExpense: 0 });
  const [currentPeriod, setCurrentPeriod] = useState<string>('');

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    const newSummary = calculateSummary(transactions);
    setSummary(newSummary);
    setCurrentPeriod(`${new Date().getFullYear()}年${new Date().getMonth() + 1}月`);
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-2xl font-bold">记账本</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <SummaryComponent summary={summary} period={currentPeriod} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">添加新交易</h2>
          <AddTransaction onAddTransaction={handleAddTransaction} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">交易记录</h2>
          {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{date}</h3>
              <TransactionList transactions={dateTransactions} />
            </div>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <nav className="flex justify-around">
          <button className="p-4 text-green-500 flex flex-col items-center">
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">明细</span>
          </button>
          <button className="p-4 text-gray-500 flex flex-col items-center">
            <BarChart2 className="w-6 h-6" />
            <span className="text-xs mt-1">统计</span>
          </button>
          <button className="p-4 text-gray-500 flex flex-col items-center">
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">设置</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default App;