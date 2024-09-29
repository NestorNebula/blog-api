import App from '../App';
import Auth from '../components/auth/Auth';
import LoginForm from '../components/auth/login/LoginForm';
import SignupForm from '../components/auth/signup/SignupForm';
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
      {
        path: 'signup',
        element: <SignupForm />,
      },
    ],
  },
];

export default routes;
