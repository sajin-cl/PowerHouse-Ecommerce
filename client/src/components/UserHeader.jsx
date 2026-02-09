import "../style/header.css";
import logo from '/logo.png'
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'
import { logoVariants } from '../animations/globalVariants';
import { useCart } from "../context/CartContext.jsx";


function UserHeader() {

  const { loggedIn, logout } = useAuth();

  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container-fluid">
        <motion.img
          src={logo} alt="logo"
          className="me-2"
          variants={logoVariants}
          initial="hidden" animate="visible" drag dragConstraints={{ left: 0, top: 0, bottom: 0, right: 0 }}

        />
        <NavLink className="navbar-brand text-white fw-bold fs-6">
          <small>
            POWER <span className="text-warning">HOUSE</span>
          </small>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">
                <i className="fa-solid fa-house fs-7 me-1"></i> Home
              </NavLink>
            </li>

            {loggedIn ? (
              <>
                <li className="nav-item position-relative">
                  <NavLink to="/cart" className="nav-link text-white">
                    <i className="fa-solid fa-cart-shopping fs-7 me-1"></i> Cart
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-20 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.6rem', padding: '2px 5px' }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/myorders" className="nav-link text-white">
                    <i className="fa-solid fa-bag-shopping fs-7 me-1"></i> Orders
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/myprofile" className="nav-link text-white">
                    <i className="fa fa-user fs-7 me-1"></i> My Profile
                  </NavLink>
                </li>

                <li className="nav-item d-flex align-items-sm-center">
                  <button
                    className="btn btn-danger btn-sm ms-3 px-3 py-0"
                    onClick={logout}
                  >
                    <i className="fa-solid fa-right-from-bracket fs-7 me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/register">
                    <i className="bi bi-person-plus-fill me-1"></i> Register
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <NavLink className="nav-link text-light" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
