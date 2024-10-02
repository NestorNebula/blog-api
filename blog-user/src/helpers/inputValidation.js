const verifyUsername = (username) => {
  let message = '';
  if (username.length < 3)
    message += 'Username/Email must be at least 3 characters long. ';
  const regex = new RegExp('^[A-Z][A-Z0-9-_.@]*[A-Z]$', 'i');
  const match = regex.test(username);
  if (!match)
    message +=
      'Username must start/end with a letter and can only contain letters, numbers, dashes and points.';
  return message;
};

const verifyEmail = (email) => {
  let message = '';
  const regex = new RegExp('^[\\w-\\.]+@[\\w]+\\.[\\w]{2,4}$');
  const match = regex.test(email);
  if (!match) message += 'Email must be in an email format. (example@mail.com)';
  return message;
};

const verifyPassword = (password) => {
  let message = '';
  const regex = new RegExp('^[\\S]{8,}$');
  const match = regex.test(password);
  if (!match) message += 'Password must be at least 8 characters long.';
  return message;
};

const verifyRole = (role) => {
  let message = '';
  const regex = new RegExp('^[\\w]*$');
  const match = regex.test(role);
  if (!match) message += "Role isn't in the great format.";
  return message;
};

export { verifyUsername, verifyEmail, verifyPassword, verifyRole };
