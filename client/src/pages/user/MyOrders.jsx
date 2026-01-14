
function MyOrders() {
  return (
    <div className="container py-4">
      <h3 className="mb-4">My Orders</h3>

      {/* Dummy Order 1 */}
      <div className="order-card p-3 mb-4 border rounded">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Order ID: ORD12345</h5>
          <span className="badge bg-success">Delivered</span>
        </div>
        <p className="mb-1">Order Date: 14-Jan-2026</p>
        <div className="order-items mb-2">
          <div className="d-flex justify-content-between mb-3">
            <span>Charcoal Peel Off Mask x 1</span>
            <span>₹199</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>₹40</span>
          </div>
        </div>
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>₹239</span>
        </div>
      </div>

      {/* Dummy Order 2 */}
      <div className="order-card p-3 mb-4 border rounded">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Order ID: ORD12346</h5>
          <span className="badge bg-warning">Shipped</span>
        </div>
        <p className="mb-1">Order Date: 10-Jan-2026</p>
        <div className="order-items mb-2">
          <div className="d-flex justify-content-between">
            <span>Xbox Controller x 1</span>
            <span>₹499</span>
          </div>
        </div>
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>₹499</span>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
