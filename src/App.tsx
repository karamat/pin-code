import React, { ClipboardEvent, useState } from 'react';
import Input from './components/Input';
import { InputType } from './types';
import { KEY_CODES } from './utils/constants';
import './App.css';

const App: React.FC = () => {
  const [pinLength, setPinLength] = useState<number>(5);
  const [values, setValues] = useState<{ [key: string]: InputType }>({});
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const [allowAlphabets, setAllowAlphabets] = useState<boolean>(false);

  const handleChangeInput = (value: string, index: number) => {
    let acceptedValue = value;
    if (!allowAlphabets) acceptedValue = value.replace(/\D/, '');
    setValues({ ...values, [index]: acceptedValue });
    if (acceptedValue.length !== 0 && (focusedIndex || 0) < pinLength - 1)
      setFocusedIndex(index + 1);
  };

  const handlePaste = (event: ClipboardEvent) => {
    let pastedData = event.clipboardData.getData('text');
    if (pastedData && pastedData.length > 0) {
      let pastedDataArray = pastedData.split('');
      let pastedValues: { [key: string]: InputType } = {};
      for (let index = 0; index < pastedDataArray.length; index++) {
        pastedValues[index] = pastedDataArray[index];
      }
      setValues(pastedValues);
    }
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
  const handleDefaultValueChange = (value: string) => setDefaultValue(value);
  const handleAllowAlphabetsChange = () => setAllowAlphabets(!allowAlphabets);

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
            value={values[index] || defaultValue}
            isFocused={index === focusedIndex}
            handleChangeInput={handleChangeInput}
            changeFocus={changeFocus}
            hidden={isHidden}
            handlePaste={handlePaste}
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
          <label htmlFor='pin-length'>
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

        <div className='input-field'>
          <label htmlFor='default-value'>
            Fill with default value
            <input
              type='text'
              maxLength={1}
              name='pin-length'
              value={defaultValue}
              autoComplete='none'
              onChange={(e) => handleDefaultValueChange(e.target.value)}
            />
          </label>
        </div>

        <div className='input-field'>
          <label htmlFor='allow-alphabets'>
            <input
              type='checkbox'
              name='allow-alphabets'
              checked={allowAlphabets}
              onChange={handleAllowAlphabetsChange}
            />
            Allow alphabetic characters and symbols
          </label>
        </div>

        <hr />

        <p className='helping-text'>
          * When a default value is specified, then you can't edit the inputs
        </p>
      </div>
    </div>
  );
};

export default App;
