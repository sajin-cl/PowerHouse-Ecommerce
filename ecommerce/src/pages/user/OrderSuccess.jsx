import "../../style/OrderSuccess.css";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="success-box text-center p-4">
        
        <div className="success-icon mb-3">✔</div>

        <h3>Order Placed Successfully!</h3>
        <p className="text-muted">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <p className="order-id">
          Order ID: <b>#ORD12345</b>
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/myorders")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
