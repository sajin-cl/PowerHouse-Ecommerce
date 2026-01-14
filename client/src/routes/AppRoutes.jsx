import { createBrowserRouter } from 'react-router-dom';
import RegisterForm from '../pages/auth/Register';
import LoginForm from '../pages/auth/Login';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/user/Home'
import ProductDetails from '../pages/user/ProductDetails';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import OrderSuccess from '../pages/user/OrderSuccess';
import MyOrders from '../pages/user/MyOrders';
import SellerLayout from '../layouts/SellerLayout';
import SellerDashboard from '../pages/seller/SellerDashboard';



const router = createBrowserRouter([

  {
    path: '/', element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/product-details', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/test', element: <OrderSuccess /> },  //-->order success page tick
      { path: '/myorders', element: <MyOrders /> }
    ]
  },

  
  {
    path: '/seller', element: <SellerLayout />,
    children: [
      { index: true, element: <SellerDashboard /> }
    ]
  },


  //Authentication
  { path: '/register', element: <RegisterForm /> },
  { path: '/login', element: <LoginForm /> },

]);

export default router;