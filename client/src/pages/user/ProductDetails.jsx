import { useEffect, useState } from "react";
import "../../style/ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

function ProductDetails() {


  document.title = ('Product Details | Power House Ecommerce');

  const { id } = useParams();

  const { cartItems, addToCart, removeCartItem } = useCart();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [inCart, setInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null); // ID of cart item for DELETE


  const qtyInc = () => { if (product && count < product.stock) setCount(prev => prev + 1); };
  const qtyDec = () => { if (count > 1) setCount(prev => prev - 1); };


  useEffect(() => {
    fetchProducts();
  }, [id]);


  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/products/${id}`, { withCredentials: true });
      setProduct(res.data);
    }
    catch (err) {
      console.error("Product fetch failed:", err);
    }
  };

  //for addToCart & removeCart button ui
  useEffect(() => {

    if (!product) return;

    const item = cartItems.find(i => i.product._id === product._id);

    if (item) {
      setInCart(true);
      setCartItemId(item._id);
    }
    else {
      setInCart(false);
      setCartItemId(null)
    }

  }, [cartItems, product]);



  const handleCartToggle = async () => {
    try {
      if (inCart) await removeCartItem(cartItemId)
      else {
        if (product.stock === 0) {
          setError("Cannot add to cart. Product is out of stock.");
          setTimeout(() => setError(""), 3000);
          return;
        }
        await addToCart(product._id, count)
      }
      setError("");
    }
    catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Cart operation failed.");
      setTimeout(() => setError(""), 3000);
    }
  };



  const descriptionItems = product?.description
    ? product.description.split('.').filter(item => item.length)
    : [];


  if (!product) return <div>Loading...</div>;

  return (
    <div className="container p-4 border my-3">
      <div className="row align-items-start gy-4">


        <div className="col-12 col-md-5 text-center">
          <img src={`http://localhost:4000${product.image_url}`} alt={product.name} className="img-fluid rounded shadow-sm" style={{ width: "100%", objectFit: "contain" }} />
        </div>


        <div className="col-12 col-md-7 p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="fw-semibold mb-1">{product.name}</h2>
            <span className="badge bg-purple">{product.brand?.name}</span>
          </div>
          <div className="text-muted small mb-2">{product.category?.name}</div>

          {descriptionItems.length > 0 && (
            <div className="mt-3">
              <h5>Description:</h5>
              <ul className="bullet-list ps-4">
                {descriptionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-2">
            Availability:{" "}
            <span className={product.stock > 0 ? "text-success" : "text-danger"}>
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>
          <div className="d-flex align-items-end mb-3">
            <span className="fw-bold fs-3">₹{product.price}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-muted text-decoration-line-through ms-2 fs-6">₹{product.oldPrice}</span>
            )}
          </div>


          <div className="d-flex flex-column flex-sm-row align-items-start">
            <div className="d-flex border rounded overflow-hidden me-sm-3 mb-2 mb-sm-0">
              <button className="btn btn-light px-3" onClick={qtyDec} disabled={count <= 1 || product.stock === 0}>-</button>
              <span className="px-3 d-flex align-items-center">{count}</span>
              <button className="btn btn-light px-3" onClick={qtyInc} disabled={count >= product.stock || product.stock === 0}>+</button>
            </div>

            <button className={`btn ${inCart ? "btn-danger" : "btn-primary"} px-4`} onClick={handleCartToggle} disabled={product.stock === 0 && !inCart}>
              {inCart ? "Remove from Cart" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
