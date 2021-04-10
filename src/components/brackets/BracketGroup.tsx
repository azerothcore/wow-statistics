import React from 'react';
import './BracketGroup.css';

const options: { [key: string]: string } = {
  '0': 'All levels',
  '1': '1-19',
  '2': '20-29',
  '3': '30-39',
  '4': '40-49',
  '5': '50-59',
  '6': '60-69',
  '7': '70-80',
  '8': '80',
};

interface BracketProps {
  parentCallback: (bracketId: number) => void;
}

const BracketGroup: React.FC<BracketProps> = ({ parentCallback }: BracketProps) => {
  const handleClick = (id: number) => {
    parentCallback(id);
  };

  return (
    <div id='bracketGroup' className='bracketGroup'>
      {Object.keys(options)
        .map(Number)
        .map((key) => (
          <button
            key={key}
            name={options[key]}
            onClick={() => handleClick(key)}
            className='bracketButton'>
            {options[key]}
          </button>
        ))}
    </div>
  );
};

export default BracketGroup;
