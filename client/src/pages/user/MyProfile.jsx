import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../utils/axiosInstance";


function MyProfile() {

  document.title = ('My Profile | Power House Ecommerce');

  const MotionLink = motion(Link);

  const { cartCount } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axiosInstance.get('/user/profile').then(response => {
      setUser(response.data)
      
    })
      .catch(err => console.error(err?.response?.data));

  }, []);

  if (!user) return <p className="d-flex justify-content-center align-items-center m-auto">Loading your profile...</p>;

  return (
    <div className="container mt-5 mb-3">
      <motion.h4
        className="mb-4"
        initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        My Profile
      </motion.h4>

      <div className="row">

        <div className="border p-4 rounded shadow-sm">
          <i className="fa fa-user-circle fa-8x text-violet mb-3"></i>

          <motion.h5
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.6 } }}
          >
            {user.fullName}
          </motion.h5>

          <motion.p
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.8 } }}
          >
            {user.email}
          </motion.p>

        </div>

        <MotionLink
          to='/cart'
          className="border p-4 rounded shadow-sm d-flex justify-content-between position-relative"
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          <span className="text-dark">Cart</span>
          {cartCount > 0 && (
            <span
              className="badge rounded-pill bg-danger position-absolute"
              style={{ fontSize: '0.6rem', padding: '5px 8px', top: '30px', right: '20px' }}
            >
              {cartCount}
            </span>
          )}
        </MotionLink>

        <MotionLink
          to="/myorders" className="border p-4 rounded shadow-sm d-flex justify-content-between position-relative"
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          <span className="text-dark">My Orders</span>

        </MotionLink>

        <MotionLink
          className="mt-3 btn btn-violet "
          onClick={() => { navigate(`/seller/update-profile/${user._id}`) }}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }} drag
        >
          Edit Profile
        </MotionLink>
      </div>
    </div>
  );
}

export default MyProfile;
