import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function AdminDashboard() {

  
  const webTitle = document.title = 'Admin Dashboard | Power House Ecommerce';

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalCategories: 0,
    totalBrands: 0,
    totalOrders: 0,
    revenue: 0,
  });


  useEffect(() => {
    axios
      .get('http://localhost:4000/api/admin/dashboard', { withCredentials: true })
      .then(response => setStats(response.data))
      .catch(err => console.error(err.response?.data?.error || err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Admin Dashboard</h5>

      <div className="row g-4">
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Users</h6>
            <h4>{stats.totalUsers}</h4>
            <Link to="/admin/users" className="btn btn-sm btn-purple mt-2" title="view Users">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Sellers</h6>
            <h4>{stats.totalSellers}</h4>
            <Link to="/admin/sellers" className="btn btn-sm btn-purple mt-2" title="view Sellers">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Categories</h6>
            <h4>{stats.totalCategories}</h4>
            <Link to="/admin/categories" className="btn btn-sm btn-purple mt-2" title="view Categories">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Brands</h6>
            <h4>{stats.totalBrands}</h4>
            <Link to="/admin/brands" className="btn btn-sm btn-purple mt-2" title="view Brands">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Orders</h6>
            <h4>{stats.totalOrders}</h4>
            <Link to="/admin/orders" className="btn btn-sm btn-purple mt-2" title="view Orders">View</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Revenue</h6>
            <h4 className="fw-bold" style={{fontFamily:"Intel"}}>&#8377; {stats.revenue}</h4>
            <Link to="/admin" className="btn btn-sm btn-purple mt-2" ><i className="fa-solid fa-money-bill-wave"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
