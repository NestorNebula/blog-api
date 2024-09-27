function LoginForm() {
  return (
    <form action="http://localhost:3000/auth/login" method="POST">
      <label htmlFor="username">Username or Email</label>
      <input
        id="username"
        name="username"
        type="text"
        maxLength={30}
        required
      />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button>Log In</button>
    </form>
  );
}

export default LoginForm;
