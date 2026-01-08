import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App';
import RegisterForm from '../pages/auth/Register';
import LoginForm from '../pages/auth/Login';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },
  {
    path: '/register',
    element: <RegisterForm />
  },
  {
    path: '/login',
    element: <LoginForm />
  }

]);

export default router;