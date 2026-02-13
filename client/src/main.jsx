import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import router from '../src/routes/AppRoutes'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './context/CartContext'


createRoot(document.getElementById('root')).render(

  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
