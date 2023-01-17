import React from 'react';
import './styles.css';

interface Props {
  index: number;
}

const Input: React.FC<Props> = ({ index }) => {
  return (
    <input
      className='input'
      name={`pin-number-${index}`}
    />
  );
};

export default Input;
