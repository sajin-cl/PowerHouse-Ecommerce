import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Sellers() {

  const [sellers, setSellers] = useState([]);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/admin/sellers', { withCredentials: true })
      .then(response => setSellers(response.data))
      .catch(err => console.error('failed to fetch sellers'));
  }, [refresh]);


  const deleteSeller = (id) => {
    axios
      .delete(`http://localhost:4000/api/admin/sellers/${id}`, { withCredentials: true })
      .then(() => {
        console.info('seller deleted successfully');
        setRefresh(prev => prev + 1)
      })
  };

  
  const toggleBlockSeller = (id) => {
    axios
      .patch(`http://localhost:4000/api/admin/sellers/${id}/toggle-block`, null, { withCredentials: true })
      .then(() => {
        console.info('seller status changed');
        setRefresh(prev => prev + 1);
      })
      .catch(err => console.error('failed to change status', err.response?.data?.error || err.message));
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Seller Management</h3>

      <div className="row">
        {sellers.map((seller, index) => (
          <div key={seller._id + "-" + index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-purple">{seller.shopName}</h5>
                <p className="card-text mb-2 fs-7">Seller Name: {seller.fullName}</p>
                <p className="card-text fs-7">Email: {seller.email}</p>
                <p
                  className={`card-text ${!seller.isBlocked ? "text-success" : "text-danger"
                    }`}
                >
                  {!seller.isBlocked ? "Active" : "Blocked"}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className={`btn btn-${!seller.isBlocked ? "warning" : "success"
                      } px-3 py-1`}
                    onClick={() => toggleBlockSeller(seller._id)}
                  >
                    <small>{!seller.isBlocked ? "Block" : "Unblock"}</small>
                  </button>
                  <button
                    className="btn btn-danger px-3 py-1"
                    onClick={() => deleteSeller(seller._id)}
                  >
                    <small>Delete</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sellers.length === 0 && (
          <p className="text-center w-100">No sellers found.</p>
        )}
      </div>
    </div>
  );
}

export default Sellers;
