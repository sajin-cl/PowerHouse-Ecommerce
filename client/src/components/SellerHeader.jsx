import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';
import '../style/SellerHeader.css';

function SellerHeader() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const linkClass = ({ isActive }) =>
    `text-white sidebar-link ${isActive ? "active" : ""}`;

  return (
    <>
      <nav className="navbar navbar-light sticky-top seller-navbar">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
              style={{ height: "32px", width: "32px" }}
            />
            <span className="text-white fw-bold ms-2">
              POWER <span className="text-warning">HOUSE</span>
            </span>
          </div>

          <button className="btn d-lg-none" onClick={toggleSidebar}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </nav>

      <div
        className={`seller-sidebar sidebar bg-dark text-white ${sidebarOpen ? "open" : ""
          } d-flex flex-column`}
      >
        <ul className="p-1 flex-grow-1">
          <li>
            <NavLink to="/seller/dashboard" className={linkClass} >
              <i className="fa fa-tachometer me-2 "></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/seller/products" className={linkClass}>
              <i className="fa fa-cube me-2"></i> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/seller/orders" className={linkClass}>
              <i className="fa fa-shopping-cart me-2"></i> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/seller/earnings" className={linkClass}>
              <i className="fa fa-money me-2"></i> Earnings
            </NavLink>
          </li>
          <li>
            <NavLink to="/seller/profile" className={linkClass}>
              <i className="fa fa-user-circle me-2"></i> Profile
            </NavLink>
          </li>
        </ul>

        <div className="logout-container">
          <button className="btn btn-danger w-100" onClick={logout}>
            <i className="fa fa-sign-out me-1"></i> Logout
          </button>
        </div>

      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default SellerHeader;
