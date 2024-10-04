const regexpTest = (string, regex, failureMessage) => {
  const match = regex.test(string);
  return !match ? failureMessage : '';
};

const verifyUsername = (username) => {
  let message = '';
  if (username.length < 3)
    message += 'Username/Email must be at least 3 characters long. ';
  const regex = new RegExp('^[A-Z][A-Z0-9-_.@]*[A-Z]$', 'i');
  message += regexpTest(
    username,
    regex,
    'Username must start/end with a letter and can only contain letters, numbers, dashes and points.'
  );
  return message;
};

const verifyPassword = (password) => {
  let message = '';
  const regex = new RegExp('^[\\S]{8,}$');
  message += regexpTest(
    password,
    regex,
    'Password must be at least 8 characters long.'
  );
  return message;
};

const verifyTitle = (title) => {
  let message = '';
  if (title.length > 50) message += 'Title cannot exceed 50 characters.';
  return message;
};

export { verifyUsername, verifyPassword, verifyTitle };
