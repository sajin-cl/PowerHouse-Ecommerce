import '../../style/cart.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function Cart() {

  
  const webTitle = document.title = 'My Cart | Power House Ecommerce';

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [refresh, setRefresh] = useState(0);

  const [errors, setErrors] = useState({});


  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/cart`, { withCredentials: true })
      .then(response => {
        console.log('cart item:', response?.data);
        setCartItems(response.data);
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      })

  }, [refresh]);


  const updateQuantity = (itemId, newQty) => {

    if (newQty < 1) return;

    axios
      .patch(`http://localhost:4000/api/cart/${itemId}`, { quantity: newQty }, { withCredentials: true })
      .then(response => {
        setCartItems(prev =>
          prev.map(item => (item._id === itemId ? { ...item, quantity: response.data.quantity } : item))
        );
      })
      .catch(err => {
        console.error(err.response?.data || err);
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      });
  };


  const removeItem = (itemId) => {
    axios
      .delete(`http://localhost:4000/api/cart/${itemId}`, { withCredentials: true })
      .then(() => {
        console.log('cart item removed');
        setRefresh(prev => prev + 1);
      })
      .catch(err => {
        console.error(err.response?.data || err);
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      });
  };


  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;


  const goToCheckout = () => {
    navigate("/checkout");
  };


  if (!cartItems.length) return <div className="container py-4 d-flex justify-content-center h-100">Your cart is empty.</div>;

  return (

    <div className="container py-4">
      <h3 className="mb-4">Shopping Cart</h3>

      <div className="row">

        <div className="col-12 col-lg-8">
          {cartItems.map((item, index) => (
            <div
              key={item._id + "-" + index}
              className="cart-item d-flex align-items-center mb-3 p-3"
            >
              <img
                src={`http://localhost:4000${item.product.image_url}`}
                alt={item.product.name}
                className="cart-img"
              />

              <div className="ms-3 flex-grow-1">
                <h6 className="mb-1">{item.product.name}</h6>
                <p
                  className="text-muted fs-7 mb-2"
                  style={{ fontFamily: "Intel" }}
                >
                  ₹{item.product.price}
                </p>

                <div className="d-flex align-items-center gap-3">
                  <div className="qty">
                    <button
                      onClick={() => { updateQuantity(item._id, item.quantity - 1) }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => { updateQuantity(item._id, item.quantity + 1) }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => { removeItem(item._id) }}
                  >
                    <i className="fas fa-trash fs-5"></i>
                  </button>
                </div>
              </div>

              <div className="fw-bold ">₹{item.product.price * item.quantity}</div>
            </div>
          ))}

        </div>


        <div className="col-12 col-lg-4">
          <div className="summary p-3">
            <h5>Order Summary</h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={goToCheckout}
            >
              Proceed to Checkout
            </button>


            {errors.backend && <div className="text-danger mt-2 text-center">{errors.backend}</div>}

          </div>
        </div>
      </div>
    </div>

  );
}

export default Cart;
