import React, { useState } from 'react';

function PeriodSelector() {
  const [period, setPeriod] = useState<string>('all'); 

  const periods = [
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
    { label: 'All Time', value: 'all' },
  ];

  return (
    <div className='h-14 flex justify-around py-4 gap-4 w-full'>
      {periods.map(p => (
        <p
          key={p.value}
          onClick={() => setPeriod(p.value)}
          className={`cursor-pointer text-blue-400 text-xl font-bold ${
            period === p.value ? 'underline underline-offset-4 decoration-2 decoration-blue-500' : ''
          }`}
        >
          {p.label}
        </p>
      ))}
    </div>
  );
}

export default PeriodSelector;
