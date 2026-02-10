import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cardContainer, droppingCard } from '../../animations/globalVariants'
import axiosInstance from '../../utils/axiosInstance';

function SellerEarnings() {

  document.title = ('Seller Earnings | Power House Ecommerce');

  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayout: 0,
    completedPayout: 0
  });

  useEffect(() => {
    axiosInstance.get('/seller/earnings').then(response => setEarnings(response.data))
      .catch(err => console.error(err.response?.data?.error || err.message));
  }, []);



  return (
    <div className="container mt-4">

      <h5 className="border-bottom mb-4 pb-2">My Earnings</h5>

      <motion.div
        className="row my-3"
        variants={cardContainer} initial="hidden" animate="visible"
      >
        <motion.div
          className="col-md-4 mb-3"
          variants={droppingCard} drag
        >
          <div className="card text-center shadow-sm " >
            <div className="card-body">
              <h6 className="card-title">Total Earnings</h6>
              <p className="card-text display-6" style={{ fontFamily: "Intel" }}>₹{earnings.totalEarnings}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4 mb-3"
          variants={droppingCard} drag
        >
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Pending Payout</h6>
              <p className="card-text display-6" style={{ fontFamily: "Intel" }}>₹{earnings.pendingPayout}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4 mb-3"
          variants={droppingCard} drag
        >
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Completed Payout</h6>
              <p className="card-text display-6" style={{ fontFamily: "Intel" }}>₹{earnings.completedPayout}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

export default SellerEarnings;
