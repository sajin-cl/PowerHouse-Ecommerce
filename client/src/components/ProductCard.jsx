import { Link } from 'react-router-dom'

function ProductCard({ product }) {

  return (
    <>
      <div className="col">
        <div className="card product-card h-100 ">
          <img src={product.prodImage} alt="images" className="card-img-top"
            style={{ maxWidth: "250px", height: "250px", margin: "auto" }} />
          <div className="card-body P-2">
            <div className="card-title product-name text-primary fw-bold mb-0">{product.productName}</div>
            <div className="card-text product-desc text-muted mb-3">{product.productDesc}</div>
            <div className="mt-auto text-center">
              <Link to={'/product-details'} className="view-btn">View</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ProductCard;