import { useInput } from '../../hooks/useInput';
import { verifyUsername, verifyPassword } from '../../helpers/inputValidation';
import Input from '../input/Input';

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
      <button type="button">Log In</button>
    </form>
  );
}

export default LoginForm;
