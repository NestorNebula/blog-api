import App from '../App';
import Auth from '../components/auth/Auth';
import LoginForm from '../components/login/LoginForm';

const routes = [
  {
    path: '/',
    element: <App />,
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
