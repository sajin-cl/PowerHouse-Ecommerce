import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';
import { cardContainer, droppingCard } from '../../animations/sellerVarients.js'


function SellerDashboard() {


  const webTitle = document.title = 'Seller Dashboard | Power House Ecommerce';

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/seller/dashboard', { withCredentials: true })
      .then(response => setStats(response.data))
      .catch(err => console.error(err.response?.data?.error || err.message));

  }, []);


  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Seller Dashboard</h5>

      <motion.div
        className="row my-3"
        variants={cardContainer} initial="hidden" animate="visible"
      >

        <Link className="col-md-3 mb-3 text-light" to={'/seller/products'}>
          <motion.div
            className="card text-center shadow-sm bg-warning p-2"
            variants={droppingCard} drag
          >
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text display-6">{stats.totalProducts}</p>
            </div>
          </motion.div>
        </Link>

        <Link className="col-md-3 mb-3 text-light" to={'/seller/orders'}>
          <motion.div
            className="card text-center text-white shadow-sm bg-success p-2"
            variants={droppingCard} drag
          >
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text display-6">{stats.totalOrders}</p>
            </div>
          </motion.div>
        </Link>

        <div className="col-md-3 mb-3 text-light">
          <motion.div
            className="card text-center shadow-sm bg-danger text-white p-2"
            variants={droppingCard} drag
          >
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text display-6">{stats.pendingOrders}</p>
            </div>
          </motion.div>
        </div>

        <Link className="col-md-3 mb-3 text-light" to={'/seller/earnings'}>
          <motion.div
            className="card text-center shadow-sm bg-info text-white p-2"
            variants={droppingCard} drag
          >
            <div className="card-body">
              <h5 className="card-title ">Earnings</h5>
              <p className="card-text display-6" style={{ fontFamily: "Intel" }}>₹{stats.totalEarnings}</p>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

export default SellerDashboard;
