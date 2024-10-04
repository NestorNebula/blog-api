import App from '../App';
import LoginForm from '../components/login/LoginForm';
import Dashboard from '../components/dashboard/Dashboard';
import { rootLoader, authLoader } from '../helpers/loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: async () => await rootLoader(),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
    loader: () => authLoader(),
  },
];

export default routes;
