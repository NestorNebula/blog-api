import App from '../App';
import LoginForm from '../components/login/LoginForm';
import { rootLoader, authLoader } from '../helpers/loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: async () => await rootLoader(),
  },
  {
    path: '/login',
    element: <LoginForm />,
    loader: () => authLoader(),
  },
];

export default routes;
