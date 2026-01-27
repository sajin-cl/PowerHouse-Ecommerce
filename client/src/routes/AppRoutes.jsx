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
import SellerProducts from '../pages/seller/SellerProducts';
import SellerOrders from '../pages/seller/SellerOrders';
import SellerEarnings from '../pages/seller/SellerEanings';
import AddProduct from '../pages/seller/AddProduct';
import UpdateProduct from '../pages/seller/UpdateProduct';
import UpdateOrder from '../pages/seller/UpdateOrder';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard'
import Categories from '../pages/admin/Categories';
import AddCategory from '../pages/admin/AddCategory';
import UpdateCategory from '../pages/admin/UpdateCategory';
import Brands from '../pages/admin/Brands';
import AddBrand from '../pages/admin/AddBrand';
import UpdateBrand from '../pages/admin/UpdateBrand';
import Users from '../pages/admin/Users';
import Sellers from '../pages/admin/Sellers';

import NotFound from '../components/NotFound';


const router = createBrowserRouter([

  {
    path: '/', element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/product-details/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/test', element: <OrderSuccess /> },  //-->order success page tick
      { path: '/myorders', element: <MyOrders /> }
    ]
  },

  {
    path: '/seller', element: <SellerLayout />,
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'products', element: <SellerProducts /> },
      { path: 'orders', element: <SellerOrders /> },
      { path: 'update-order', element: <UpdateOrder /> },
      { path: 'earnings', element: <SellerEarnings /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'update-product/:id', element: <UpdateProduct /> }
    ]
  },

  {
    path: '/admin', element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'categories', element: <Categories /> },
      { path: 'add-category', element: <AddCategory /> },
      { path: 'update-category/:id', element: <UpdateCategory /> },
      { path: 'brands', element: <Brands /> },
      { path: 'add-brand', element: <AddBrand /> },
      { path: 'update-brand/:id', element: <UpdateBrand /> },
      { path: 'users', element: <Users /> },
      { path: 'sellers', element: <Sellers /> },

    ]
  },


  { path: '*', element: <NotFound /> },


  //Authentication Purpose::
  { path: '/register', element: <RegisterForm /> },
  { path: '/login', element: <LoginForm /> },

]);

export default router;