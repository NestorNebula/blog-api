import App from '../App';
import LoginForm from '../components/login/LoginForm';
import Dashboard from '../components/dashboard/Dashboard';
import PostManager from '../components/post/PostManager';
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
      {
        path: '/posts/:postId',
        element: <PostManager />,
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
