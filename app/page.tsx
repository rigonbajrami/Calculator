'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (number: string) => {
    if (hasResult) {
      setDisplay(number);
      setEquation(number);
      setHasResult(false);
    } else {
      if (display === '0') {
        setDisplay(number);
        setEquation(number);
      } else {
        setDisplay(display + number);
        setEquation(equation + number);
      }
    }
  };

  const handleOperator = (operator: string) => {
    setHasResult(false);
    setDisplay('0');
    setEquation(equation + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasResult(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <div className="mb-4">
          <div className="text-sm text-gray-500 h-4 overflow-hidden">
            {equation}
          </div>
          <div className="text-4xl text-right font-semibold text-gray-800 h-12 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className="col-span-2 p-4 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            AC
          </button>
          <button
            onClick={() => handleOperator('/')}
            className="p-4 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ÷
          </button>
          <button
            onClick={() => handleOperator('*')}
            className="p-4 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ×
          </button>
          
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="p-4 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator('-')}
            className="p-4 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            -
          </button>
          
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="p-4 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator('+')}
            className="p-4 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            +
          </button>
          
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="p-4 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="row-span-2 p-4 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            =
          </button>
          
          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 p-4 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            0
          </button>
          <button
            onClick={() => handleNumber('.')}
            className="p-4 text-lg font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </main>
  );
}
