const getFetchOptions = (method, body) => {
  return {
    body,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

export default getFetchOptions;
