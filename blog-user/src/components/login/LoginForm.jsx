import { useState } from 'react';
import Input from '../input/Input';

const useInput = (verification) => {
  const [value, setValue] = useState('');
  const [validation, setValidation] = useState({ isValid: true });

  const updateValue = (e) => {
    setValue(e.target.value);
    checkValue(e.target.value);
  };
  const checkValue = (v) => {
    const message = verification(v);
    setValidation(message ? { isValid: false, message } : { isValid: true });
  };

  return { value, updateValue, validation };
};

const verifyUsername = (username) => {
  let message = '';
  if (username.length === 0) return message;
  if (username.length < 3)
    message += 'Username/Email must be at least 3 characters long. ';
  const regex = new RegExp('^[A-Z][A-Z0-9-_.@]*[A-Z]$', 'i');
  const match = regex.test(username);
  if (!match)
    message +=
      'Username must start/end with a letter and can only contain letters, numbers, dashes and points.';
  return message;
};

const verifyPassword = (password) => {
  let message = '';
  if (password.length === 0) return message;
  const regex = new RegExp('[\\S]{8,}');
  const match = regex.test(password);
  if (!match) message += 'Password must be at least 8 characters long.';
  return message;
};

function LoginForm() {
  const {
    value: username,
    updateValue: updateUsername,
    validation: usernameValidation,
  } = useInput(verifyUsername);

  const {
    value: password,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput(verifyPassword);

  return (
    <form action="http://localhost:3000/auth/login" method="POST">
      <Input
        name="username"
        value={username}
        update={updateUsername}
        validation={usernameValidation}
        type="text"
        label="Username or Email"
      />
      <Input
        name="password"
        value={password}
        update={updatePassword}
        validation={passwordValidation}
        type="password"
      />
      <button>Log In</button>
    </form>
  );
}

export default LoginForm;
