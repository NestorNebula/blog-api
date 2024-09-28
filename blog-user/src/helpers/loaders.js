import { redirect } from 'react-router-dom';
import getFetchOptions from './fetchOptions';

const rootLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/auth/login');
  let user = null;
  let count = 0;
  while (count < 2) {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}`,
        getFetchOptions('get', null)
      );
      if (response.status >= 400) {
        throw new Error('Error when fetching data.');
      }
      const result = await response.json();
      user = result;
    } catch (error) {
      fetch('http://localhost:3000/auth/refresh', getFetchOptions('get', null))
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Error when refreshing access.');
          }
          return response.json();
        })
        .then((response) => {
          localStorage.setItem('id', response.id);
        })
        .catch(() => {
          localStorage.removeItem('id');
          return redirect('/auth/login');
        });
    }
    if (user) break;
    count++;
  }
  if (!user) return redirect('/auth/login');
  return { user };
};

const authLoader = () => {
  const userId = localStorage.getItem('id');
  if (userId) return redirect('/');
  return null;
};

export { rootLoader, authLoader };
