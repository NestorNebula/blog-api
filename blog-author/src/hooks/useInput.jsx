import { useState } from 'react';

const useInput = (verification, initial = '') => {
  const [value, setValue] = useState(initial);
  const [validation, setValidation] = useState({ isValid: true });

  const updateValue = (e) => {
    setValue(e.target.value);
    checkValue(e.target.value);
  };
  const checkValue = (v) => {
    const message = verification(v);
    setValidation(message ? { isValid: false, message } : { isValid: true });
  };

  return { value, setValue, updateValue, validation };
};

export { useInput };
