import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

function SellerEarnings() {

  
  const webTitle = document.title = 'Seller Earnings | Power House Ecommerce';

  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayout: 0,
    completedPayout: 0
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/seller/earnings', { withCredentials: true })
      .then(response => setEarnings(response.data))
      .catch(err => console.error(err.response?.data?.error || err.message));
  }, []);



  return (
    <div className="container mt-4">

      <h5 className="border-bottom mb-4 pb-2">My Earnings</h5>

      <div className="row my-3">
        <div className="col-md-4 mb-3" >
          <div className="card text-center shadow-sm " >
            <div className="card-body">
              <h6 className="card-title">Total Earnings</h6>
              <p className="card-text display-6" style={{fontFamily:"Intel"}}>₹{earnings.totalEarnings}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Pending Payout</h6>
              <p className="card-text display-6" style={{fontFamily:"Intel"}}>₹{earnings.pendingPayout}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Completed Payout</h6>
              <p className="card-text display-6" style={{fontFamily:"Intel"}}>₹{earnings.completedPayout}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SellerEarnings;
