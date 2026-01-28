import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/AdminHeader.css';

function AdminHeader() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <>
      <nav className="navbar navbar-light sticky-top admin-navbar py-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="/logo-icon.png"
              alt="logo"
              style={{ height: "25px", width: "25px"}}
            />
            <span className="text-white fw-bold ms-2">
              ADMIN <span className="text-warning">PANEL</span>
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
            <NavLink to="/admin" className="text-white">
              <i className="fa fa-tachometer me-2"></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className="text-white">
              <i className="fa fa-list-alt me-2"></i> Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/brands" className="text-white">
              <i className="fa fa-tags me-2"></i> Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="text-white">
              <i className="fa fa-users me-2"></i> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/sellers" className="text-white">
              <i className="fa fa-user-circle me-2"></i> Sellers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className="text-white">
              <i className="fa fa-shopping-cart me-2"></i> Orders
            </NavLink>
          </li>

        </ul>

        <div className="pb-5">
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
