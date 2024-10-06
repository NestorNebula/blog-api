import { useInput } from '../../hooks/useInput';
import { verifyUsername, verifyPassword } from '../../helpers/inputValidation';
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import getFetchOptions from '../../helpers/fetchOptions';
import Input from '../input/Input';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
const API_URL = import.meta.env.VITE_API_URL;
const BLOG_URL = import.meta.env.VITE_BLOG_URL;
import styles from './Login.module.css';

function LoginForm() {
  const [success, setSuccess] = useState(false);
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
      `${API_URL}/auth/login`,
      getFetchOptions('post', JSON.stringify({ username, password }))
    );
    const result = await response.json();
    if (response.status >= 400) {
      setError(result);
    } else {
      setError(null);
      setSuccess(true);
      localStorage.setItem('id', result.id);
    }
  };

  return (
    <>
      <Navbar />
      {success && <Navigate to="/" />}
      {error && <div>{error}</div>}
      <section className={styles.loginSection}>
        <form action="" method="POST" className={styles.loginForm}>
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
        <div className={styles.loginInfos}>
          <div>
            <div>
              Please keep in mind that to access the website, you need to have
              an "Author" account.
            </div>
            <Link className={styles.loginLink} to={`${BLOG_URL}`}>
              User Website
            </Link>
          </div>
          <div>
            <div>Don't have an account yet ?</div>
            <Link className={styles.loginLink} to={`${BLOG_URL}/auth/signup`}>
              <div>Sign Up</div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginForm;
