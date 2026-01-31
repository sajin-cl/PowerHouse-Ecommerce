import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios
      .get('http://localhost:4000/api/orders', { withCredentials: true })
      .then(response => setOrders(response.data))
      .catch(err => console.error(err.response?.data || err.message))

  }, []);

  if (!orders.length) return <div className="container py-4 d-flex justify-content-center h-100">Your Order is empty.</div>

  return (
    <div className="container py-4">
      <h3 className="mb-4">My Orders</h3>

      {orders.map((order) => (
        <div key={order._id} className="order-card p-3 mb-4 border rounded">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>Order ID: {order._id}</h5>
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
              <span className="fw-bold">Shipping</span>
              <span className="fw-bold">₹{order.shipping}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
