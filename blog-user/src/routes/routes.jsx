import App from '../App';
import Auth from '../components/auth/Auth';
import LoginForm from '../components/auth/login/LoginForm';
import SignupForm from '../components/auth/signup/SignupForm';
import Homepage from '../components/homepage/Homepage';
import Postpage from '../components/post/Postpage';
import Account from '../components/account/Account';
import Error from '../components/error/Error';
import { rootLoader, authLoader } from '../helpers/loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'posts/:postId',
        element: <Postpage />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
    loader: async () => await rootLoader(),
  },
  {
    path: 'auth',
    element: <Auth />,
    errorElement: <Error />,
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
