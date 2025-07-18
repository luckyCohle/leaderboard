import React, { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

function PeriodSelector({period,setPeriod}:{period:string,setPeriod:Dispatch<SetStateAction<string>>}) { 

  const periods = [
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
    { label: 'All Time', value: 'all' },
  ];

  return (
    <div className='sm:h-14 h-10 flex justify-around py-2 gap-2 sm:py-4 sm:gap-4 w-full'>
      {periods.map(p => (
        <p
          key={p.value}
          onClick={() => setPeriod(p.value)}
          className={`cursor-pointer text-blue-400  sm:text-xl font-bold ${
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
