import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/AdminHeader.css';

function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-light sticky-top admin-navbar">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="logo"
              style={{ height: "32px", width: "32px" }}
            />
            <span className="text-white fw-bold ms-2">
              Admin <span className="text-warning">Panel</span>
            </span>
          </div>

          <button
            className="btn d-lg-none"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </nav>

      <div className={`admin-sidebar sidebar bg-dark text-white ${sidebarOpen ? 'open' : ''} d-flex flex-column`}>
        <ul className="p-0 flex-grow-1">
          <li>
            <Link to="/admin" className="text-white">
              <i className="fa fa-tachometer me-2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="text-white">
              <i className="fa fa-list-alt me-2"></i> Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/brands" className="text-white">
              <i className="fa fa-tags me-2"></i> Brands
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-white">
              <i className="fa fa-users me-2"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/sellers" className="text-white">
              <i className="fa fa-user-circle me-2"></i> Sellers
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="text-white">
              <i className="fa fa-shopping-cart me-2"></i> Orders
            </Link>
          </li>
        </ul>

        <div className="pb-5">
          <Link to="/logout" className="btn btn-danger w-100">
            <i className="fa fa-sign-out me-1"></i> Logout
          </Link>
        </div>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default AdminHeader;
