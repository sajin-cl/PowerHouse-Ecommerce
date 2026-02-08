import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function SellerProfile() {

  
  const webTitle = document.title = 'Seller Profile | Power House Ecommerce';

  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/seller/profile', { withCredentials: true })
      .then(response => {
        setSeller(response.data)
      })
      .catch(err => console.error(err?.response?.data));

  }, []);

  if (!seller) return <p>Loading your profile...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>

      <div className="row">

        <div className="border p-4 rounded shadow-sm">
          <i className="fa fa-user-circle fa-8x text-purple mb-3"></i>
          <h5>{seller.fullName}</h5>
          <p>{seller.email}</p>

          <h5 className="mb-3 border-top pt-3">Shop Details</h5>
          <p><strong>Shop Name:</strong> {seller.shopName}</p>
          <p><strong>Shop Address:</strong> {seller.shopAddress}</p>

        </div>
        <button className="mt-3 btn btn-purple " onClick={()=>{navigate(`/seller/update-profile/${seller._id}`)}}>Edit Profile</button>
      </div>
    </div>
  );
}

export default SellerProfile;
