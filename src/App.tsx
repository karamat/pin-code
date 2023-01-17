import React, { useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChangeInput = (value: string, index: number) => {
    let acceptedValue = value.replace(/\D/, '');
    setValues({ ...values, [index]: acceptedValue });
    if (acceptedValue.length !== 0) setFocusedIndex(index + 1);
  };

  console.log(JSON.stringify(values, null, 2));

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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
