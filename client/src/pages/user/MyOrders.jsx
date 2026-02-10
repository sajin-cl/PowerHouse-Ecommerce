import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { cardContainer, cardFromLeft, cardFromRight } from '../../animations/globalVariants'
import axiosInstance from "../../utils/axiosInstance";

function MyOrders() {


  document.title = ('My Orders | Power House Ecommerce');

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axiosInstance.get('/orders').then(response => setOrders(response.data))
      .catch(err => console.error(err.response?.data || err.message))

  }, []);


  const cancelOrder = (orderId) => {
    axiosInstance.patch(`/orders/${orderId}/cancel`, {})
      .then(() => {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId
              ? { ...order, status: "cancelled" }
              : order
          )
        );
        
      })
      .catch(err => console.error(err.response?.data?.message || "Failed to cancel order"));
  };



  if (!orders.length) return <div className="container py-4 d-flex justify-content-center h-100">Your Order is empty.</div>

  return (
    <div className="container py-4">
      <motion.h5
        className="mb-4 border-bottom pb-2"
        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
      >
        My Orders
      </motion.h5>

      <motion.div
        variants={cardContainer} initial="hidden" animate="visible"
      >
        {orders.map((order, index) => {

          const isLeft = index % 2 == 0

          return (

            <motion.div
              key={order._id} className="order-card p-3 mb-4 border rounded"
              variants={isLeft ? cardFromLeft : cardFromRight}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-danger">Order ID: #{order._id}</h6>
                <span
                  className={`badge p-2 ${order.status === "delivered"
                    ? "bg-success"
                    : order.status === "shipped"
                      ? "bg-warning"
                      : order.status === 'cancelled'
                        ? "bg-danger" : "bg-secondary"
                    }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="mb-2 fw-bold">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="order-items mb-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span className="text-purple">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span >₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹{order.shipping}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </div>
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <button
                  className="btn btn-danger w-100 mt-4"
                  onClick={() => { cancelOrder(order._id) }}
                >
                  Cancel Order
                </button>)}
            </motion.div>
          )

        })}
      </motion.div>
    </div >
  );
}

export default MyOrders;
