import { redirect } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import getFetchOptions from './fetchOptions';

const rootLoader = () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/auth/login');
  const { data: user, error } = useUser(userId);
  if (error) {
    fetch('http://localhost:3000/auth/refresh', getFetchOptions('get', null))
      .then((response) => {
        if (response >= 400) {
          localStorage.removeItem('id');
          return redirect('/auth/login');
        }
        return response.json();
      })
      .then((response) => {
        localStorage.setItem('id', response.id);
      });
  }
  return user;
};

const authLoader = () => {
  const userId = localStorage.getItem('id');
  if (userId) return redirect('/');
  return null;
};

export { rootLoader, authLoader };
