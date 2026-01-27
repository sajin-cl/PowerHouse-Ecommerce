import { useEffect, useState } from "react";
import "../../style/ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");

 
  const qtyInc = () => {
    if (product && count < product.stock) {
      setCount(prev => prev + 1);
    }
  };

  const qtyDec = () => {
    if (count > 1) setCount(prev => prev - 1);
  };


  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`, { withCredentials: true })
      .then(response => setProduct(response.data))
      .catch(err => console.error('Product fetch failed:', err.response?.data || err));
  }, [id]);



  const handleAddToCart = () => {

    if (!product) return;

    if (product.stock === 0) {
      setError("Cannot add to cart. Product is out of stock.");
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/cart",
        { productId: product._id, quantity: count },
        { withCredentials: true }
      )
      .then(response => {
        console.log("Cart response:", response.data);
        navigate("/cart");
      })
      .catch(err => {
        console.error("Add to cart failed:", err.response?.data || err);
        if (err.response?.status === 401) {
          alert("Session expired, please login.");
          navigate("/login");
        } else {
          setError("Failed to add to cart.");
        }
      });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container p-4 border my-3">
      <div className="row align-items-start gy-4">

      
        <div className="col-12 col-md-5 text-center">
          <img
            src={`http://localhost:4000${product.image_url}`}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>

      
        <div className="col-12 col-md-7 p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="fw-semibold mb-1">{product.name}</h2>
            <span className="badge bg-success">{product.brand?.name}</span>
          </div>

          <div className="text-muted small mb-2">{product.category?.name}</div>

          <div className="mb-2">
            Availability:{" "}
            <span className={product.stock > 0 ? "text-success" : "text-danger"}>
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          <div className="d-flex align-items-end mb-3">
            <span className="fw-bold fs-3">₹{product.price}</span>
            {product.price > 0 && (
              <span className="text-muted text-decoration-line-through ms-2 fs-6">
                ₹{product.price + 50} 
              </span>
            )}
          </div>

          
          <div className="d-flex flex-column flex-sm-row align-items-start">
            <div className="d-flex border rounded overflow-hidden me-sm-3 mb-2 mb-sm-0">
              <button
                className="btn btn-light px-3"
                onClick={qtyDec}
                disabled={count <= 1 || product.stock === 0}
              >
                -
              </button>
              <span className="px-3 d-flex align-items-center">{count}</span>
              <button
                className="btn btn-light px-3"
                onClick={qtyInc}
                disabled={count >= product.stock || product.stock === 0}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary px-4"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
