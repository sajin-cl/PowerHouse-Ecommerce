import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, scale } from 'framer-motion';
import { droppingCard, cardContainer } from '../../animations/sellerVarients'

function SellerProducts() {


  const webTitle = document.title = 'Seller | Product List | Power House Ecommerce';

  const [products, setProducts] = useState([]);

  const [refresh, setRefresh] = useState(0);


  useEffect(() => {
    axios
      .get('http://localhost:4000/api/products', { withCredentials: true })
      .then(response => setProducts(response.data))
      .catch(err => console.error('Failed to fetch products', err));
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/products/${id}`, { withCredentials: true })
      .then(() => {
        setRefresh(prev => prev + 1)
        console.info('Product deleted successfully');
      })
      .catch(err => console.error('Failed to delete product', err))
  }


  return (
    <div className="container mt-4">
      <motion.div
        className="row"
        variants={cardContainer} initial="hidden" animate="visible"
      >
        {products.map((product, index) => (
          <div key={product._id + '-' + index} className="col-6 col-md-4 col-lg-3 mb-4 product-card">
            <motion.div
              className="card h-100 shadow"
              variants={droppingCard}
            >
              <img
                src={`http://localhost:4000${product.image_url}`}
                className="card-img-top"
                alt={product.name}
              
              />
              <div className="card-body d-flex flex-column">
                <h6
                  className="card-title text-purple fw-semibold cursor-pointer"
                  title={product.name}
                >
                  {product.name.length > 20 ? product.name.slice(0, 19) + ".." : product.name}

                </h6>
                <p
                  className="card-text text-muted"

                >
                  {product.description.length > 20 ? product.description.slice(0, 19) + ".." : product.description}
                </p>
                <p
                  className={`card-text ${product.stock === 0 ? "text-danger" : "text-success"}`}
                >
                  {product.stock === 0 ? "Out of Stock" : `Stock: ${product.stock}`}
                </p>
                <p
                  className="card-text fw-bold fs-6"
                  style={{ fontFamily: "Inter" }}
                >
                  Price: ₹{product.price}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/seller/update-product/${product._id}`}
                    className="btn btn-sm"
                  >
                    <i className="fas fa-edit fs-5 "></i>
                  </Link>

                  <button
                    className="btn btn-sm"
                    onClick={() => { handleDelete(product._id) }}
                  >
                    <i className="fas fa-trash fs-5 text-danger"></i>

                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {products.length <= 0 && <div className="d-flex align-items-center h-50 justify-content-center text-muted"  > No Products found</div>}

      <Link
        to="/seller/add-product"
        className="btn btn-purple rounded-circle shadow d-flex align-items-center justify-content-center add-popup-btn"
      >
        +
      </Link>
    </div>
  )
};

export default SellerProducts;