import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
} from '../../helpers/inputValidation';
import getFetchOptions from '../../helpers/fetchOptions';
import Input from '../input/Input';

function Account() {
  const { user, API_URL } = useOutletContext();
  const [form, setForm] = useState(false);
  const updateForm = () => {
    setForm(!form);
  };
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
    value: confirm,
    updateValue: updateConfirm,
    validation: confirmValidation,
  } = useInput(verifyPassword);

  const submitUserUpdate = () => {};

  return (
    <main>
      <section>
        {form ? (
          <form>
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
              name="confirm"
              value={confirm}
              update={updateConfirm}
              validation={confirmValidation}
              type="password"
              label="Confirm Password"
            />
            <button onSubmit={submitUserUpdate}>Confirm Update</button>
          </form>
        ) : (
          <>
            <div>
              <div>{user.username}</div>
              <div> {user.email} </div>
              <div> {user.role.toLowerCase()}</div>
            </div>
            <button onClick={updateForm}>Update Account</button>
          </>
        )}
      </section>
    </main>
  );
}

export default Account;
