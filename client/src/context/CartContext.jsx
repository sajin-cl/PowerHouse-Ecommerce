import axiosInstance from '../utils/axiosInstance'
import { useState, useEffect, createContext, useContext } from 'react'


const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    fetchCart();
  }, []);


  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data);
      setCartCount(res.data.length);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await axiosInstance.post('/cart', { productId, quantity });
      await fetchCart();
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };


  const updateCartItem = async (cartItemId, quantity) => {
    try {
      await axiosInstance.patch(`/cart/${cartItemId}`, { quantity });
      await fetchCart();

    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }


  const removeCartItem = async (cartItemId) => {
    try {

      await axiosInstance.delete(`/cart/${cartItemId}`);
      await fetchCart();
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (

    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeCartItem, updateCartItem }}>
      {children}
    </CartContext.Provider>

  )
};

export const useCart = () => useContext(CartContext);