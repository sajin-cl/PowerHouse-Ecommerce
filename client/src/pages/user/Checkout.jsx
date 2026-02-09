import '../../style/Checkout.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Checkout() {

  document.title = ('Checkout Page | Power House Ecommerce');

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 40,
    total: 0
  })


  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cart', { withCredentials: true })
      .then(res => {
        const subtotal = res.data.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        const shipping = subtotal > 5000 ? 0 : 40;

        setSummary({
          subtotal,
          shipping,
          total: subtotal + shipping
        });
      })
      .catch(() => {
        setError('Failed to load cart')
      })
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }


  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/orders/checkout', { shippingAddress: address, paymentMethod },
        { withCredentials: true }
      )
      navigate('/order-success')

    } catch (err) {
      setError(err.response?.data?.error || 'Order failed')
    }
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">Checkout</h3>

      <div className="row">
        <div className="col-12 col-lg-8">

          <div className="order-box p-3 mb-4">
            <h5>Delivery Address</h5>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <input name="name" className="form-control" placeholder="Full Name" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input name="phone" className="form-control" placeholder="Mobile Number" onChange={handleChange} />
              </div>

              <div className="col-12">
                <input name="address" className="form-control" placeholder="Address" onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <input name="city" className="form-control" placeholder="City" onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <input name="state" className="form-control" placeholder="State" onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <input name="pincode" className="form-control" placeholder="Pincode" onChange={handleChange} />
              </div>
            </div>
          </div>


          <div className="order-box p-3">
            <h5>Payment Method</h5>

            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">
                Cash on Delivery
              </label>
            </div>

            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                value="ONLINE"
                checked={paymentMethod === 'ONLINE'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
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
              <span>₹{summary.subtotal}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>₹{summary.shipping}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{summary.total}</span>
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

            {error && (
              <div className="text-danger text-center mt-2">
                {error}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
