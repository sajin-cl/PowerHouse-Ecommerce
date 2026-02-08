import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';
import { motion } from 'framer-motion';
import { logoVariants } from '../animations/globalVarients.js';
import '../style/AdminHeader.css';

function AdminHeader() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-light sticky-top admin-navbar py-2">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <motion.img
              src={logo} alt="logo"
              className="me-2"
              variants={logoVariants}
              initial="hidden" animate="visible" drag dragConstraints={{ left: 0, top: 0, bottom: 0, right: 0 }}

            />
            <span className="text-white fw-bold ms-2">
              <span className="ms-1 me-2">POWER HOUSE</span> -
              <span className="text-warning ms-2">ADMIN PANEL</span>
            </span>
          </div>

          <button className="btn d-lg-none" onClick={toggleSidebar}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </nav>

      <div
        className={`admin-sidebar sidebar bg-dark text-white ${sidebarOpen ? 'open' : ''
          } d-flex flex-column`}
      >
        <ul className="py-1 px-0 flex-grow-1">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-tachometer me-2"></i> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-list-alt me-2"></i> Categories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/brands"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-tags me-2"></i> Brands
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-users me-2"></i> Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/sellers"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-user-circle me-2"></i> Sellers
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `text-white ${isActive ? "active" : ""}`
              }
            >
              <i className="fa fa-shopping-cart me-2"></i> Orders
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

export default AdminHeader;
