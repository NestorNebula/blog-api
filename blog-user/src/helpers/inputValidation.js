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

export { verifyUsername, verifyPassword };
