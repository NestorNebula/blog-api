import { redirect } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import App from '../App';
import Auth from '../components/auth/Auth';
import LoginForm from '../components/login/LoginForm';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: () => {
      const userId = localStorage.getItem('id');
      if (!userId) return redirect('/auth/login');
      const { data: user, error } = useUser(userId);
      if (error) {
        fetch(
          'http://localhost:3000/auth/refresh',
          getFetchOptions('get', null)
        )
          .then((response) => {
            if (response >= 400) {
              return redirect('/auth/login');
            }
            return response.json();
          })
          .then((response) => {
            if (userId === response.id) {
              setUpdate(!update);
            } else {
              return redirect('/auth/login');
            }
          });
      }
      return user;
    },
  },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
    ],
  },
];

export default routes;
