import { useState, useEffect, createContext, useContext } from 'react'
import { getCart as getCartApi, addToCart as addToCartApi, updateCartItem as updateCartItemApi, removeFromCart as removeFromCartApi } from '../services/cartService';


const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => { fetchCart() }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCartApi();
      setCartItems(res.data);
      setCartCount(res.data.length);
    } catch (err) {
      console.error(err);
      throw err;
    }
    finally {
      setLoading(false);
    }
  };



  const addToCart = async (productId, quantity) => {
    try {
      await addToCartApi(productId, quantity);
      await fetchCart();
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };


  const updateCartItem = async (cartItemId, quantity) => {
    try {
      await updateCartItemApi(cartItemId, quantity);
      await fetchCart();

    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }


  const removeCartItem = async (cartItemId) => {
    try {
      await removeFromCartApi(cartItemId);
      await fetchCart();
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (

    <CartContext.Provider value={{ cartCount, cartItems, loading, addToCart, removeCartItem, updateCartItem,fetchCart}}>
      {children}
    </CartContext.Provider>

  )
};

export const useCart = () => useContext(CartContext);