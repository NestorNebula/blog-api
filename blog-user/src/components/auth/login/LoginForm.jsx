import { useInput } from '../../../hooks/useInput';
import {
  verifyUsername,
  verifyPassword,
} from '../../../helpers/inputValidation';
import { useState } from 'react';
import getFetchOptions from '../../../helpers/fetchOptions';
import Input from '../../input/Input';

function LoginForm() {
  const [error, setError] = useState(null);
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

  const submitLogIn = async () => {
    const values = [username, password];
    const validations = [usernameValidation, passwordValidation];
    const isValid =
      values.every((value) => value.length !== 0) &&
      validations.every((validation) => validation.isValid);
    if (!isValid) return;
    const response = await fetch(
      'http://localhost:3000/auth/login',
      getFetchOptions('post', JSON.stringify({ username, password }))
    );
    const result = await response.json();
    if (response.status >= 400) {
      setError(result);
    } else {
      setError(null);
      localStorage.setItem('id', result.id);
    }
  };

  return (
    <>
      {error && <div>{error}</div>}
      <form action="" method="POST">
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
        <button type="button" onClick={submitLogIn}>
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginForm;
