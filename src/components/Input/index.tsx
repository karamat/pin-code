import React, { KeyboardEvent, useEffect, useRef, RefObject } from 'react';
import { InputType } from './../../types';
import { KEY_CODES } from '../../utils/constants';
import './styles.css';

interface Props {
  index: number;
  value: InputType;
  isFocused: boolean;
  hidden: boolean;
  handleChangeInput: (value: string, index: number) => void;
  changeFocus: (key: string) => void;
}

const Input: React.FC<Props> = ({
  index,
  value,
  isFocused,
  hidden,
  handleChangeInput,
  changeFocus,
}) => {
  const ref: any = useRef();

  useEffect(() => {
    isFocused && ref.current.focus();
  }, [isFocused]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { ARROW_LEFT, ARROW_RIGHT, BACKSPACE } = KEY_CODES;

    if ([ARROW_LEFT, ARROW_RIGHT, BACKSPACE].includes(event.key)) {
      changeFocus(event.key);
    }
  };

  return (
    <input
      ref={ref}
      className='input'
      name={`pin-number-${index}`}
      type={hidden ? 'password' : 'text'}
      maxLength={1}
      autoComplete={'nope'}
      value={value}
      onChange={(e) => handleChangeInput(e.target.value, index)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
