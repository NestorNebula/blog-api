import { useInput } from '../../../hooks/useInput';
import { useState } from 'react';
import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
} from '../../../helpers/inputValidation';
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
        <button type="button">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;
