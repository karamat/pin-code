import React, { useState } from 'react';
import Input from './components/Input';
import './App.css';

function App() {
  const [pinLength, setPinLength] = useState(5);
  return (
    <div className='App'>
      <div className='input-list'>
        {Array.from(Array(pinLength).keys()).map(() => (
          <Input />
        ))}
      </div>
    </div>
  );
}

export default App;
