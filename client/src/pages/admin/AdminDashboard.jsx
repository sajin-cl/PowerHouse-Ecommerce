import { useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
 
  const [stats, setStats] = useState({
    totalUsers: 120,
    totalSellers: 35,
    totalCategories: 8,
    totalBrands: 10,
    totalOrders: 250,
    revenue: 56000,
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="row g-4">
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Users</h6>
            <h4>{stats.totalUsers}</h4>
            <Link to="/admin/users" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Sellers</h6>
            <h4>{stats.totalSellers}</h4>
            <Link to="/admin/sellers" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Categories</h6>
            <h4>{stats.totalCategories}</h4>
            <Link to="/admin/categories" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Brands</h6>
            <h4>{stats.totalBrands}</h4>
            <Link to="/admin/brands" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Orders</h6>
            <h4>{stats.totalOrders}</h4>
            <Link to="/admin/orders" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Revenue</h6>
            <h4>&#8377; {stats.revenue}</h4>
            <Link to="/admin/orders" className="btn btn-sm btn-purple mt-2">View</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
