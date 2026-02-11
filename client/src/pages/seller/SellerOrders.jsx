import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { cardContainer, cardFromLeft, cardFromRight } from '../../animations/globalVariants'
import { getSellerOrders, updateOrderedItemStatus } from "../../services/sellerService";



function SellerOrders() {


  document.title = ('Seller Orders | Power House Ecommerce');

  const [orders, setOrders] = useState([]);


  const fetchSellerOrders = async () => {
    try {
      const response = await getSellerOrders();
      setOrders(response.data);

    }
    catch (err) {
      console.error(err || 'Failed to fetch orders');
    }
  };


  useEffect(() => { fetchSellerOrders() }, []);


  const updateStatus = async (orderId, itemId, newStatus) => {
    try {
      await updateOrderedItemStatus(orderId, itemId, newStatus);

      setOrders(prev =>
        prev.map((order) =>
          order._id === orderId
            ? {
              ...order,
              items: order.items.map((item) =>
                item._id === itemId ? { ...item, status: newStatus } : item
              )
            }
            : order
        )
      );
    }
    catch (err) {
      console.error(err || 'Update failed');
    };
  };


  return (
    <div className="container py-4">

      <h5 className="border-bottom mb-4 pb-2">Manage Orders</h5>

      {orders.length === 0 && <p>No orders yet.</p>}
      <motion.div
        variants={cardContainer} initial="hidden" animate="visible"
      >

        {orders.map((order, index) => {

          const isLeft = index % 2 == 0;

          return (
            <motion.div
              key={order._id}
              className="border py-5 px-4 mb-3 bg-light "
              style={{ borderRadius: "30px" }}
              variants={isLeft ? cardFromLeft : cardFromRight}
            >
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
                        <i className="fa-solid fa-truck text-dark me-1"></i> Ship
                      </button>
                    )}
                    {item.status === "shipped" && (
                      <button
                        className="btn btn-success py-1 btn-sm px-3"
                        onClick={() => updateStatus(order._id, item._id, "delivered")}
                      >
                        <i className="fa-solid fa-truck text-light me-1"></i> Deliver
                      </button>
                    )}
                    {item.status === "delivered" && (
                      <span className="text-success">
                        <i className="fa-solid fa-circle-check text-success me-1"></i>
                        Delivered
                      </span>
                    )}
                    {item.status === "cancelled" && (
                      <span className="text-danger ">Canceled</span>
                    )}

                  </div>
                </div>
              ))}

            </motion.div>

          )
        })
        }

      </motion.div >
    </div >
  );
}

export default SellerOrders;
