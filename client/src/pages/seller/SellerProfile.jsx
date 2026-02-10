import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import axiosInstance from "../../utils/axiosInstance";

function SellerProfile() {


  document.title = ('Seller Profile | Power House Ecommerce');

  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/seller/profile').then(response => {
      setSeller(response.data)
    })
      .catch(err => console.error(err?.response?.data));

  }, []);

  if (!seller) return <p>Loading your profile...</p>;

  return (
    <div className="container mt-5">
      <motion.h4
        className="mb-4"
        initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        My Profile
      </motion.h4>

      <div className="row">

        <div className="border p-4 rounded shadow-sm">
          <i className="fa fa-user-circle fa-8x text-purple mb-3"></i>

          <motion.h5
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.6 } }}
          >
            {seller.fullName}
          </motion.h5>

          <motion.p
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.8 } }}
          >
            {seller.email}
          </motion.p>

          <motion.h5
            className="mb-3 border-top pt-3"
            initial={{ y: -10, opacity: 0 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.15 } }}
          >Shop Details
          </motion.h5>


          <motion.p
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.8 } }}
          ><strong>Shop Name:</strong> {seller.shopName}</motion.p>
          <motion.p
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.8 } }}
          ><strong>Shop Address:</strong> {seller.shopAddress}</motion.p>

        </div>
        <motion.button
          className="mt-3 btn btn-purple "
          onClick={() => { navigate(`/seller/update-profile/${seller._id}`) }}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }} drag
        >
          Edit Profile
        </motion.button>
      </div>
    </div>
  );
}

export default SellerProfile;
