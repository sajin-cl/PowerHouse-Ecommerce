import { Link } from 'react-router-dom'

function ProductCard({ product }) {

  return (
    <>
      <div className="col">
        <div className="card product-card h-100 ">
          <img
            src={`http://localhost:4000${product.image_url}`}
            alt={product.name}
            className="card-img-top"
            style={{ maxWidth: "250px", height: "250px", margin: "auto" }}
          />
          <div className="card-body P-2">
            <div
              className="card-title product-name text-primary fw-bold mb-0"
              title={product.name}
            >
              {product.name}
            </div>
            <div className="card-text product-desc text-muted mb-3">{product.description}</div>
            <div className="mt-auto text-center">
              <Link to={`/product-details/${product._id}`} className="view-btn">View</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ProductCard;