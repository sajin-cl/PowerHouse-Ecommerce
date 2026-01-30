import '../../style/Checkout.css'

function Checkout() {
  return (
    <div className="container py-4">
      <h3 className="mb-4">Checkout</h3>

      <div className="row">
      
        <div className="col-12 col-lg-8">
          <div className="order-box p-3 mb-4">
            <h5>Delivery Address</h5>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Full Name" />
              </div>

              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Mobile Number" />
              </div>

              <div className="col-12">
                <input type="text" className="form-control" placeholder="Address" />
              </div>

              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="City" />
              </div>

              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="State" />
              </div>

              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Pincode" />
              </div>
            </div>
          </div>

        
          <div className="order-box p-3">
            <h5>Payment Method</h5>

            <div className="form-check mt-2">
              <input className="form-check-input" type="radio" name="payment" defaultChecked />
              <label className="form-check-label">
                Cash on Delivery
              </label>
            </div>

            <div className="form-check mt-2">
              <input className="form-check-input" type="radio" name="payment" />
              <label className="form-check-label">
                Online Payment (Demo)
              </label>
            </div>
          </div>
        </div>

       
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

            <button className="btn btn-success w-100 mt-3">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
