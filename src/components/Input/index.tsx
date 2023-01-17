import React from 'react';
import { InputType } from './../../types';
import './styles.css';

interface Props {
  index: number;
  value: InputType;
  handleChangeInput: (value: string, index: number) => void;
}

const Input: React.FC<Props> = ({ index, value, handleChangeInput }) => {
  return (
    <input
      className='input'
      name={`pin-number-${index}`}
      maxLength={1}
      autoComplete={'nope'}
      value={value}
      onChange={(e) => handleChangeInput(e.target.value, index)}
    />
  );
};

export default Input;
