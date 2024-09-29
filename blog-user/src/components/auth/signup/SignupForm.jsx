import { useInput } from '../../../hooks/useInput';
import { useState } from 'react';
import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
} from '../../../helpers/inputValidation';
import getFetchOptions from '../../../helpers/fetchOptions';
import Input from '../../input/Input';

function SignupForm() {
  const [error, setError] = useState(null);
  const {
    value: username,
    updateValue: updateUsername,
    validation: usernameValidation,
  } = useInput(verifyUsername);
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput(verifyEmail);
  const {
    value: password,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput(verifyPassword);
  const {
    value: confirmPwd,
    updateValue: updateConfirmPwd,
    validation: confirmPwdValidation,
  } = useInput(verifyPassword);

  const submitSignup = async () => {
    const validations = [
      usernameValidation,
      emailValidation,
      password,
      confirmPwdValidation,
    ];
    const isValid = validations.every(
      (validation) => validation.isValid === true
    );
    if (!isValid) return;
    const response = await fetch(
      'http://localhost:3000/auth/signup',
      getFetchOptions(
        'post',
        JSON.stringify({ username, email, password, role: null })
      )
    );
    if (response.status >= 400) {
      setError('Error when creating account.');
    } else {
      setError(null);
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
        />
        <Input
          name="email"
          value={email}
          update={updateEmail}
          validation={emailValidation}
          type="email"
        />
        <Input
          name="password"
          value={password}
          update={updatePassword}
          validation={passwordValidation}
          type="password"
        />
        <Input
          name="confirmpwd"
          value={confirmPwd}
          update={updateConfirmPwd}
          validation={confirmPwdValidation}
          type="password"
          label="Confirm Password"
        />
        <button type="button" onClick={submitSignup}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
