import React, { useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import { KEY_CODES } from './utils/constants';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState<number>(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const handleChangeInput = (value: string, index: number) => {
    let acceptedValue = value.replace(/\D/, '');
    setValues({ ...values, [index]: acceptedValue });
    if (acceptedValue.length !== 0 && (focusedIndex || 0) < pinLength - 1)
      setFocusedIndex(index + 1);
  };

  const changeFocus = (key: string) => {
    if (focusedIndex == null || typeof focusedIndex == undefined) return;
    if (isNaN(focusedIndex)) return;

    if (key === KEY_CODES.ARROW_LEFT && focusedIndex >= 0)
      setFocusedIndex(focusedIndex - 1);

    if (key === KEY_CODES.ARROW_RIGHT && (focusedIndex || 0) < pinLength - 1)
      setFocusedIndex(focusedIndex + 1);

    if (key === KEY_CODES.BACKSPACE && focusedIndex >= 0) {
      setValues({ ...values, [focusedIndex]: '' });
      setFocusedIndex(focusedIndex - 1);
    }
  };

  const handleIsHidden = () => setIsHidden(!isHidden);
  const handlePinLengthChange = (value: string) => {
    if (isNaN(parseInt(value, 10))) return;
    setPinLength(parseInt(value, 10));
  };

  return (
    <div className='App'>
      <div className='label'>
        <label>Please enter pin code</label>
      </div>
      <div className='input-list'>
        {Array.from(Array(pinLength).keys()).map((_, index) => (
          <Input
            key={index}
            index={index}
            value={values[index]}
            isFocused={index === focusedIndex}
            handleChangeInput={handleChangeInput}
            changeFocus={changeFocus}
            hidden={isHidden}
          />
        ))}
      </div>
      <div className='settings'>
        <div className='input-field'>
          <label htmlFor='isHidden'>
            <input
              type='checkbox'
              name='isHidden'
              checked={isHidden}
              onChange={handleIsHidden}
            />
            Hide
          </label>
        </div>

        <div className='input-field'>
          <label htmlFor='isHidden'>
            Pin code length
            <input
              type='number'
              min={1}
              step={1}
              name='pin-length'
              value={pinLength}
              autoComplete='none'
              onChange={(e) => handlePinLengthChange(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
