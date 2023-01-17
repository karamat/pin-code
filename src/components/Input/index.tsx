import React, { useEffect, useRef, RefObject } from 'react';
import { InputType } from './../../types';
import './styles.css';

interface Props {
  index: number;
  value: InputType;
  isFocused: boolean;
  handleChangeInput: (value: string, index: number) => void;
}

const Input: React.FC<Props> = ({
  index,
  value,
  isFocused,
  handleChangeInput,
}) => {
  const ref: any = useRef();

  useEffect(() => {
    isFocused && ref.current.focus();
  }, [isFocused]);

  return (
    <input
      ref={ref}
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
