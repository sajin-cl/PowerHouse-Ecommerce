import '../../style/cart.css'

function Cart() {
  return (
    <div className="container py-4">
      <h3 className="mb-4">Shopping Cart</h3>

      <div className="row">
        {/* Cart Items */}
        <div className="col-12 col-lg-8">
          <div className="cart-item d-flex align-items-center mb-3 p-3">
            <img
              src="/src/assets/images/beauty-category3.webp"
              alt="product"
              className="cart-img"
            />

            <div className="ms-3 flex-grow-1">
              <h6 className="mb-1">Charcoal Peel Off Mask</h6>
              <p className="text-muted mb-1">₹199</p>

              <div className="d-flex align-items-center gap-3">
                <div className="qty">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>

                <button className="btn btn-link text-danger p-0">
                  Remove
                </button>
              </div>
            </div>

            <div className="fw-bold">₹199</div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-4">
          <div className="summary p-3">
            <h5>Order Summary</h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹199</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>₹40</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹239</span>
            </div>

            <button className="btn btn-primary w-100 mt-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
