import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState({});


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
        console.error(err.response?.data || err.message);
        setErrors(prev => ({ ...prev, [orderId]: err.response?.data?.error || err.message }));
        setTimeout(() => setErrors(prev => ({ ...prev, [orderId]: null })), 3000);
      });
  };

  return (
    <div className="container py-4">
      <h3>All Orders</h3>
      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map(order => {

        const allItemsShipped = order.items.every(item => item.status === "shipped");
        const allItemsDelivered = order.items.every(item => item.status === "delivered");

        return (

          <div key={order._id} className="border p-3 mb-3">
            <>

              <div className="fw-bold mb-2 text-danger">
                Customer: {order.user?.fullName}
              </div>
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Total:</b> ₹{order.total}</p>
              <p><b>Status:</b> {order.status}</p>


              {order.items.map(item => (

                <div
                  key={item._id}
                  className="item-row d-flex align-items-center justify-content-between py-1 border-bottom"
                >
                  <div className="item-info">
                    <span className="fw-bold">{item.product.name}</span> x {item.quantity}
                  </div>
                  <div className="item-price-status d-flex align-items-center gap-3">
                    <span>₹{item.price * item.quantity}</span>
                    <span className={item.status === "shipped" ? "text-success fw-semibold" : "text-muted fw-semibold"}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </>


            {order.status !== "delivered" && (
              <>
                <p className="mt-2">
                  <span className="text-danger">Shipped:</span> {order.items.filter(item => item.status === 'shipped').length} / {order.items.length}
                  <span className="text-success ms-4">Delivered:</span> {order.items.filter(item => item.status === 'delivered').length} / {order.items.length}
                </p>


                <div className="mt-2">
                  <button
                    className="btn btn-success me-2 px-2 py-0"
                    onClick={() => updateOrderStatus(order._id, "shipped")}
                    disabled={!allItemsShipped || order.status === "shipped" || order.status === "delivered"}
                  >
                    Mark Shipped
                  </button>
                  <button
                    className="btn btn-primary px-2 py-0"
                    onClick={() => updateOrderStatus(order._id, "delivered")}
                    disabled={!allItemsDelivered || order.status === "delivered"}
                  >
                    Mark Delivered
                  </button>
                </div>
              </>
            )}


            {errors[order._id] && <div className="text-danger mt-2">{errors[order._id]}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default AdminOrders;
