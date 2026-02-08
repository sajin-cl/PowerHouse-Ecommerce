import { useEffect, useState } from "react";
import axios from "axios";

function SellerOrders() {


  const webTitle = document.title = 'Seller Orders | Power House Ecommerce';

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/seller/orders", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders:", err.response?.data || err));
  }, []);


  const updateStatus = (orderId, itemId, newStatus) => {
    axios
      .patch(
        `http://localhost:4000/api/seller/orders/${orderId}/item/${itemId}/status`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then((res) => {

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, status: newStatus } : item
                ),
              }
              : order
          )
        );
      })
      .catch((err) => console.error("Failed to update status:", err.response?.data || err));
  };

  return (
    <div className="container py-4">
      
      <h5 className="border-bottom mb-4 pb-2">Manage Orders</h5>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-3 mb-3">
          <p><b>Order ID:</b> #{order._id}</p>

          <p>
            <b>Placed On:</b>{" "}
            {new Date(order.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short"
            })}
          </p>

          <p className="fw-bold mb-1">Products List:</p>
          {order.items.map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-center mb-1">
              <ul className="bullet-list mb-0">
                <li className="mb-0">
                  {item.product.name} x {item.quantity} – ₹{item.price * item.quantity}
                </li>
              </ul>
              <div>
                {item.status === "pending" && (
                  <button
                    className="btn btn-warning py-1 btn-sm px-3"
                    onClick={() => updateStatus(order._id, item._id, "shipped")}
                  >
                    Ship
                  </button>
                )}
                {item.status === "shipped" && (
                  <button
                    className="btn btn-success py-1 btn-sm px-3"
                    onClick={() => updateStatus(order._id, item._id, "delivered")}
                  >
                    Deliver
                  </button>
                )}
                {item.status === "delivered" && (
                  <span className="text-success">Delivered</span>
                )}
                {item.status === "cancelled" && (
                  <span className="text-danger ">Canceled</span>
                )}

              </div>
            </div>
          ))}

        </div>

      ))}
    </div>
  );
}

export default SellerOrders;
