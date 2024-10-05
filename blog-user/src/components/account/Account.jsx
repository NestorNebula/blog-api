import { useState } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import {
  verifyUsername,
  verifyEmail,
  verifyPassword,
  verifyRole,
} from '../../helpers/inputValidation';
import getFetchOptions from '../../helpers/fetchOptions';
import Input from '../input/Input';
import styles from './Account.module.css';

function Account() {
  const { user, API_URL } = useOutletContext();
  const [form, setForm] = useState(false);
  const updateForm = () => {
    setForm(!form);
  };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    value: username,
    updateValue: updateUsername,
    validation: usernameValidation,
  } = useInput(verifyUsername, user.username);
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput(verifyEmail, user.email);
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
  const {
    value: role,
    updateValue: updateRole,
    validation: roleValidation,
  } = useInput(verifyRole);

  const submitUserUpdate = async () => {
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    const values = [username, email, password, confirm];
    const validations = [
      usernameValidation,
      emailValidation,
      passwordValidation,
      confirmValidation,
      roleValidation,
    ];
    const isValid =
      values.every((value) => value.length) &&
      validations.every((validation) => validation.isValid);
    if (!isValid) return;
    const response = await fetch(
      `${API_URL}/users/${user.id}`,
      getFetchOptions(
        'put',
        JSON.stringify({ username, email, password, role })
      )
    );
    if (response.status >= 400) {
      setError('Error when updating account.');
    } else {
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <main>
      {success && <Navigate to="/" />}
      <header className={styles.header}>
        <div>Your Account</div>
      </header>
      <section className={styles.account}>
        {form ? (
          <form className={styles.accountForm}>
            {error && <div>{error}</div>}
            <div className={styles.input}>
              <Input
                name="username"
                value={username}
                update={updateUsername}
                validation={usernameValidation}
              />
            </div>
            <div className={styles.input}>
              <Input
                name="email"
                value={email}
                update={updateEmail}
                validation={emailValidation}
                type="email"
              />
            </div>
            <div className={styles.input}>
              <Input
                name="password"
                value={password}
                update={updatePassword}
                validation={passwordValidation}
                type="password"
              />
            </div>
            <div className={styles.input}>
              <Input
                name="confirm"
                value={confirm}
                update={updateConfirm}
                validation={confirmValidation}
                type="password"
                label="Confirm Password"
              />
            </div>
            {user.role === 'User' && (
              <div className={styles.input}>
                <Input
                  name="role"
                  value={role}
                  update={updateRole}
                  validation={roleValidation}
                  label="Author secret code (Leave blank if you do not have the code)"
                />
              </div>
            )}
            <button
              className={styles.confirmBtn}
              type="button"
              onClick={submitUserUpdate}
            >
              Confirm Update
            </button>
          </form>
        ) : (
          <>
            <div className={styles.accountDetails}>
              <div className={styles.accountUsername}>{user.username}</div>
              <div className={styles.accountEmail}> {user.email} </div>
              <div className={styles.accountRole}>
                {user.role.toLowerCase()}
              </div>
            </div>
            <button className={styles.updateBtn} onClick={updateForm}>
              Update Account
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Account;
