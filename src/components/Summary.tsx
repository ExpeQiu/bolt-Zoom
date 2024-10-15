import React from 'react';
import { Summary as SummaryType } from '../types';
import { formatCurrency } from '../utils';

interface SummaryProps {
  summary: SummaryType;
  period: string;
}

const SummaryComponent: React.FC<SummaryProps> = ({ summary, period }) => {
  return (
    <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{period}</h2>
      <div className="flex justify-between">
        <div>
          <p className="text-sm">总支出</p>
          <p className="text-xl font-semibold">{formatCurrency(summary.totalExpense)}</p>
        </div>
        <div>
          <p className="text-sm">总入账</p>
          <p className="text-xl font-semibold">{formatCurrency(summary.totalIncome)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;