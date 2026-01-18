import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Afsal", total: "$50", status: "pending" },
    { id: 2, customer: "Adharsh", total: "$200", status: "shipped" },
    { id: 3, customer: "Virat kolhi", total: "$200", status: "pending" },
  ]);

  // Single handler for all order actions
  const handleAction = (type, id) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;

        switch (type) {
          case "ship":
            return { ...order, status: "shipped" };
          case "cancel":
            return { ...order, status: "cancelled" };
          default:
            return order;
        }
      })
    );

    if (type === "delete") {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Order Panel</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Customer</th>
            <th className="border p-2 text-left">Total</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.customer}</td>
              <td className="border p-2">{order.total}</td>
              <td
                className={`border p-2 font-medium ${
                  order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "shipped"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </td>
              <td className="border p-2 space-x-2">
                {order.status === "pending" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAction("ship", order.id)}
                  >
                    Ship
                  </button>
                )}
                {order.status === "pending" && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAction("cancel", order.id)}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                  onClick={() => handleAction("delete", order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
