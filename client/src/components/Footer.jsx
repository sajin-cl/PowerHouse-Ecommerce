import '../style/footer.css'
import logo from '../assets/images/logos/logo.png'
import appStore from '../assets/images/logos/App-Store-icon.png'
import playStore from '../assets/images/logos/playstore-icon.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">
        <h6>For better experience, download the PowerHouse app now</h6>
        <img src={appStore} alt="App Store" />
        <img src={playStore} alt="Play Store" />
      </div>

      <div className="footer-body">

        <div className="footer-logo">
          <img src={logo} alt="PowerHouse Logo" />
        </div>

        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>

        <div className="footer-social">
          <i className="fa fa-facebook"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-linkedin"></i>
        </div>

      </div>

      <div className="footer-bottom">
        <small>© 2026 PowerHouse. All rights reserved | Developed by Sajin CL</small>
      </div>

    </footer>
  )
}

export default Footer
