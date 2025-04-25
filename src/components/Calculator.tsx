
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  // Handle number input
  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Handle operators
  const handleOperator = (operator: string) => {
    if (operator === 'x²') {
      const result = (parseFloat(display) ** 2).toString();
      setDisplay(result);
      setEquation(`${display}² = ${result}`);
      setShouldResetDisplay(true);
      return;
    }

    setEquation(display + ' ' + operator);
    setShouldResetDisplay(true);
  };

  // Calculate result
  const calculateResult = () => {
    try {
      const parts = equation.split(' ');
      if (parts.length !== 2) return;

      const num1 = parseFloat(parts[0]);
      const num2 = parseFloat(display);
      const operator = parts[1];

      let result: number;

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          if (num2 === 0) throw new Error('Cannot divide by zero');
          result = num1 / num2;
          break;
        case '%':
          result = num1 % num2;
          break;
        default:
          throw new Error('Invalid operator');
      }

      setDisplay(result.toString());
      setEquation('');
      setShouldResetDisplay(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setShouldResetDisplay(true);
    }
  };

  // Clear calculator
  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const Button = ({ 
    value, 
    onClick, 
    className 
  }: { 
    value: string; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "text-white text-2xl font-medium p-4 rounded-xl transition-all duration-200",
        "hover:brightness-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",
        className
      )}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Display */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <div className="text-gray-400 text-right text-sm h-6">
            {equation}
          </div>
          <div className="text-white text-right text-4xl font-light min-h-[48px]">
            {display}
          </div>
        </div>

        {/* Grid of buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            value="AC"
            onClick={handleClear}
            className="bg-red-500 col-span-2"
          />
          <Button
            value="x²"
            onClick={() => handleOperator('x²')}
            className="bg-purple-600"
          />
          <Button
            value="÷"
            onClick={() => handleOperator('/')}
            className="bg-purple-600"
          />
          
          {/* Numbers and operators */}
          <Button
            value="7"
            onClick={() => handleNumber('7')}
            className="bg-gray-700"
          />
          <Button
            value="8"
            onClick={() => handleNumber('8')}
            className="bg-gray-700"
          />
          <Button
            value="9"
            onClick={() => handleNumber('9')}
            className="bg-gray-700"
          />
          <Button
            value="×"
            onClick={() => handleOperator('*')}
            className="bg-purple-600"
          />
          
          <Button
            value="4"
            onClick={() => handleNumber('4')}
            className="bg-gray-700"
          />
          <Button
            value="5"
            onClick={() => handleNumber('5')}
            className="bg-gray-700"
          />
          <Button
            value="6"
            onClick={() => handleNumber('6')}
            className="bg-gray-700"
          />
          <Button
            value="−"
            onClick={() => handleOperator('-')}
            className="bg-purple-600"
          />
          
          <Button
            value="1"
            onClick={() => handleNumber('1')}
            className="bg-gray-700"
          />
          <Button
            value="2"
            onClick={() => handleNumber('2')}
            className="bg-gray-700"
          />
          <Button
            value="3"
            onClick={() => handleNumber('3')}
            className="bg-gray-700"
          />
          <Button
            value="+"
            onClick={() => handleOperator('+')}
            className="bg-purple-600"
          />
          
          <Button
            value="%"
            onClick={() => handleOperator('%')}
            className="bg-purple-600"
          />
          <Button
            value="0"
            onClick={() => handleNumber('0')}
            className="bg-gray-700"
          />
          <Button
            value="."
            onClick={handleDecimal}
            className="bg-gray-700"
          />
          <Button
            value="="
            onClick={calculateResult}
            className="bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
