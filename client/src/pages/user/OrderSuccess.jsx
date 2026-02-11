import "../../style/OrderSuccess.css";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {

 document.title = ('Order Success | Power House Ecommerce');

  const navigate = useNavigate();

  const location = useLocation();

  const orderId = location.state?.orderId || "N/A"

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="success-box text-center p-4">

        <div className="success-icon mb-3 " >
          <img
            src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
            alt="Tick"
            style={{ borderRadius: "50%", width: "150px", height: "150px" }}
          />
        </div>

        <h3>Order Placed Successfully!</h3>
        <p className="text-muted">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <p className="order-id">
          Order ID: <b>#{orderId}</b>
        </p>

        <div className="d-flex flex-column flex-sm-row gap-4 mt-4 justify-content-center">
          <button
            className="btn btn-purple px-3 py-2"
            onClick={() => navigate("/myorders")}
          >
            View Orders
          </button>
          <button
            className="btn btn-primary px-3 py-2"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
