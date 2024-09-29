import { useInput } from '../../../hooks/useInput';
import { useState } from 'react';
import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
} from '../../../helpers/inputValidation';
import { Navigate, useOutletContext, Link } from 'react-router-dom';
import getFetchOptions from '../../../helpers/fetchOptions';
import Input from '../../input/Input';

function SignupForm() {
  const { API_URL } = useOutletContext();
  const [success, setSuccess] = useState(false);
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
    if (password !== confirmPwd) {
      setError("Passwords don't match.");
      return;
    }
    const values = [username, email, password];
    const validations = [
      usernameValidation,
      emailValidation,
      passwordValidation,
      confirmPwdValidation,
    ];
    const isValid =
      values.every((value) => value.length !== 0) &&
      validations.every((validation) => validation.isValid);
    if (!isValid) return;
    const response = await fetch(
      `${API_URL}/auth/signup`,
      getFetchOptions(
        'post',
        JSON.stringify({ username, email, password, role: null })
      )
    );
    if (response.status >= 400) {
      const result = await response.json();
      setError(result.error || 'Error when creating account.');
    } else {
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <>
      {success && <Navigate to="/auth/login" />}
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
      <div>
        <div>Already have an account ?</div>
        <Link to="/auth/login">
          <div>Log In</div>
        </Link>
      </div>
    </>
  );
}

export default SignupForm;
