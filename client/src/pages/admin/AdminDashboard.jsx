import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { cardContainer, droppingCard } from '../../animations/globalVariants'
import { getAdminDashboard } from "../../services/adminService";

function AdminDashboard() {


  document.title = ('Admin Dashboard | Power House Ecommerce');

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalCategories: 0,
    totalBrands: 0,
    totalOrders: 0,
    revenue: 0,
  });


  const fetchAdminDashboard = async () => {
    try {
      const response = await getAdminDashboard();
      setStats(response.data);

    }
    catch (err) {
      console.error(err)
    }
  };


  useEffect(() => {

    fetchAdminDashboard();

  }, []);



  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Admin Dashboard</h5>

      <motion.div
        className="row g-4"
        variants={cardContainer} initial="hidden" animate="visible"
      >

        <div className="col-6 col-md-4 col-lg-2">

          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Total Users</h6>
            <h4>{stats.totalUsers}</h4>
            <Link to="/admin/users" className="btn btn-sm btn-purple mt-2" title="view Users">View</Link>
          </motion.div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Total Sellers</h6>
            <h4>{stats.totalSellers}</h4>
            <Link to="/admin/sellers" className="btn btn-sm btn-purple mt-2" title="view Sellers">View</Link>
          </motion.div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Categories</h6>
            <h4>{stats.totalCategories}</h4>
            <Link to="/admin/categories" className="btn btn-sm btn-purple mt-2" title="view Categories">View</Link>
          </motion.div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Brands</h6>
            <h4>{stats.totalBrands}</h4>
            <Link to="/admin/brands" className="btn btn-sm btn-purple mt-2" title="view Brands">View</Link>
          </motion.div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Total Orders</h6>
            <h4>{stats.totalOrders}</h4>
            <Link to="/admin/orders" className="btn btn-sm btn-purple mt-2" title="view Orders">View</Link>
          </motion.div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <motion.div
            className="card shadow-sm text-center p-3"
            variants={droppingCard} drag
          >
            <h6>Total Revenue</h6>
            <h4 className="fw-bold" style={{ fontFamily: "Intel" }}>&#8377; {stats.revenue}</h4>
            <Link to="/admin" className="btn btn-sm btn-purple mt-2" ><i className="fa-solid fa-money-bill-wave"></i></Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
