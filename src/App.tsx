import React, { useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});

  const handleChangeInput = (value: string, index: number) => {
    let acceptedValue = value.replace(/\D/, '');
    setValues({ ...values, [index]: acceptedValue });
  };

  console.log(JSON.stringify(values, null, 2));

  return (
    <div className='App'>
      <p>Please enter pin code</p>
      <div className='input-list'>
        {Array.from(Array(pinLength).keys()).map((_, index) => (
          <Input
            index={index}
            value={values[index]}
            handleChangeInput={handleChangeInput}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
