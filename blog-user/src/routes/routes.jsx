import App from '../App';
import Auth from '../components/auth/Auth';
import LoginForm from '../components/auth/login/LoginForm';
import { rootLoader, authLoader } from '../helpers/loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: async () => await rootLoader(),
  },
  {
    path: 'auth',
    element: <Auth />,
    loader: () => authLoader(),
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
    ],
  },
];

export default routes;
