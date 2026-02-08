import { useEffect, useState } from "react";
import axios from "axios";
import CustomerDetailsModal from "../../components/CustomerDetailsModal";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/orders", { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const updateOrderStatus = (orderId, newStatus) => {
    axios
      .patch(
        `http://localhost:4000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then(() => setRefresh(prev => prev + 1))
      .catch(err => {
        setErrors({ backend: err.response?.data?.error || err.message });
        setTimeout(() => setErrors({}), 3000);
      });
  };


  return (
    <div className="container py-4">
      <h5 className="border-bottom mb-4 pb-2">Manage Orders</h5>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map(order => {
        const allItemsDelivered = order.items.every(item => item.status === "delivered")

        return (
          <div key={order._id} className="border p-3 mb-3">

            <div className="fw-bold mb-2 text-purple">
              Customer: {order.user?.fullName}
            </div>
            <p><b>Order ID:</b> #{order._id}</p>
            <p>
              <b>Order Date & Time:</b>{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={order.status === "cancelled" ? "text-danger" : order.status === "delivered" ? "text-success" : "text-muted"}>
                {order.status}
              </span>
            </p>


            {order.items.map(item => (
              <div key={item._id} className="item-row d-flex align-items-center justify-content-between py-1 border-bottom">
                <div className="item-info">
                  <span className="fw-bold">{item.product.name}</span> x {item.quantity}
                </div>
                <div className="item-price-status d-flex align-items-center gap-3">
                  <span>₹{item.price * item.quantity}</span>
                  <span className={
                    item.status === "shipped"
                      ? "text-warning fw-semibold"
                      : item.status === "delivered"
                        ? "text-success fw-semibold"
                        : "text-muted fw-semibold"
                  }>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}


            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="mt-2">
                <button
                  className="btn btn-success me-2 px-3 py-1 btn-sm"
                  onClick={() => updateOrderStatus(order._id, "shipped")}
                  disabled={!allItemsDelivered || order.status === "shipped"}
                >
                  Mark Shipped
                </button>
                <button
                  className="btn btn-primary btn-sm px-3 py-1 me-2"
                  onClick={() => updateOrderStatus(order._id, "delivered")}
                  disabled={!allItemsDelivered}
                >
                  Mark Delivered
                </button>
                <button
                  className="btn btn-danger btn-sm px-3 py-1 "
                  onClick={() => updateOrderStatus(order._id, "cancelled")}
                  disabled={order.status === "delivered" || order.status === "shipped"}
                >
                  Cancel Order
                </button>
              </div>
            )}

            <button
              className="btn btn-outline-primary w-100 mt-3"
              onClick={() => setSelectedOrder(order)}
            >
              View Customer Details
            </button>

            {errors.backend && <div className="text-danger mt-2">{errors.backend}</div>}

          </div>
        );
      })}

     {/* CustomerDetails Modal for View Customer Details button */}

      {selectedOrder && (
        <CustomerDetailsModal order={selectedOrder} onCloseBtn={() => setSelectedOrder(null)}/>
      )}

    </div>
  );
}

export default AdminOrders;
