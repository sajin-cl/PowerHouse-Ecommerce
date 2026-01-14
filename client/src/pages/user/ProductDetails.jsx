import "../../style/ProductDetails.css";

function ProductDetails() {
  return (
    <div className="container">
      <div className="product-container row">
        <div className="product-image col-12 col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/src/assets/images/beauty-category3.webp"
            alt="image"
            className="img-fluid"
          />
        </div>

        <div className="product-info col-12 col-md-6">
          <h2>Facial  Cream</h2>
          <p className="text-muted fs-6">category</p>

          <ul>
            <li>Deeply cleanses pores and removes blackheads & impurities</li>
            <li>Activated charcoal helps absorb excess oil and dirt</li>
            <li>Peel-off formula removes dead skin cells for smoother skin</li>
           <li>Suitable for all skin types, especially oily & acne-prone skin</li>
           <li>Ayurvedic / natural ingredients focus</li>
          </ul>

          <p className="stock">
            Availability: <b>50 In Stock</b>
          </p>

          <div className="price-section">
            <span className="new-price">₹199.00</span>
            <span className="old-price ms-2">299.00</span>
          </div>

          <div className="actions d-flex flex-column flex-sm-row">
            <div className="qty mb-2 mb-sm-0">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="add-cart ms-sm-3">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
