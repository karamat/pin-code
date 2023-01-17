import React, { useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import { KEY_CODES } from './utils/constants';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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

  // console.log(JSON.stringify(values, null, 2));
  console.log('focusedIndex', focusedIndex);

  return (
    <div className='App'>
      <p>Please enter pin code</p>
      <div className='input-list'>
        {Array.from(Array(pinLength).keys()).map((_, index) => (
          <Input
            key={index}
            index={index}
            value={values[index]}
            isFocused={index === focusedIndex}
            handleChangeInput={handleChangeInput}
            changeFocus={changeFocus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
