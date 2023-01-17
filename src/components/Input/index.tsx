import React from 'react';
import { InputType } from './../../types';
import './styles.css';

interface Props {
  index: number;
  value: InputType;
}

const Input: React.FC<Props> = ({ index, value }) => {
  return (
    <input
      className='input'
      name={`pin-number-${index}`}
      maxLength={1}
      autoComplete={'nope'}
      value={value}
    />
  );
};

export default Input;
