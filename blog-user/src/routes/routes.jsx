import App from '../App';
import LoginForm from '../components/login/LoginForm';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: 'login', element: <LoginForm /> }],
  },
];

export default routes;
