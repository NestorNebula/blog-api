import { redirect } from 'react-router-dom';
import getFetchOptions from './fetchOptions';
const API_URL = import.meta.env.VITE_API_URL;

const rootLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/login');
  let user = null;
  let count = 0;
  while (count < 2) {
    try {
      const response = await fetch(
        `${API_URL}/users/${userId}`,
        getFetchOptions('get', null)
      );
      if (response.status >= 400) {
        throw new Error('Error when fetching data.');
      }
      const result = await response.json();
      user = result;
    } catch (error) {
      fetch(`${API_URL}/auth/refresh`, getFetchOptions('get', null))
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
          return redirect('/login');
        });
    }
    if (user) break;
    count++;
  }
  if (!user) return redirect('/login');
  return { user };
};

const authLoader = () => {
  const userId = localStorage.getItem('id');
  if (userId) return redirect('/');
  return null;
};

export { rootLoader, authLoader };
