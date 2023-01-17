import React, { useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});

  return (
    <div className='App'>
      <p>Please enter pin code</p>
      <div className='input-list'>
        {Array.from(Array(pinLength).keys()).map((_, index) => (
          <Input index={index} value={values[index]} />
        ))}
      </div>
    </div>
  );
}

export default App;
