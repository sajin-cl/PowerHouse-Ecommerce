import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cardContainer, droppingCard } from "../../animations/globalVariants";
import { getAllSellers, deleteSeller as deleteSellerApi, toggleBlockSeller as toggleBlockSellerApi } from "../../services/adminService";

function Sellers() {


  document.title = ('Admin | Seller List | Power House Ecommerce');

  const [sellers, setSellers] = useState([]);
  const [refresh, setRefresh] = useState(0);


  const fetchAllSellers = async () => {
    try {
      const response = await getAllSellers();
      setSellers(response.data)

    }
    catch (err) {
      onsole.error(err);
    }
  };


  useEffect(() => {

    fetchAllSellers();

  }, [refresh]);


  const deleteSeller = async (id) => {
    try {
      await deleteSellerApi(id);
      setRefresh(prev => prev + 1)

    }
    catch (err) {
      console.error(err || 'seller deleted successfully');
    }
  };


  const toggleBlockSeller = async (id) => {
    try {
      await toggleBlockSellerApi(id);
      setRefresh(prev => prev + 1);

    }
    catch (err) {
      console.error(err || 'failed to change status');
    }
  };

  

  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Manage Sellers</h5>

      <div className="row">
        {sellers.map((seller, index) => (
          <motion.div
            key={seller._id + "-" + index}
            className="col-12 col-md-6 col-lg-4 mb-4"
            variants={cardContainer} initial="hidden" animate="visible"
          >
            <motion.div
              className="card h-100 shadow-sm border-0"
              variants={droppingCard}
            >
              <div className="card-body d-flex flex-column">

                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-semibold text-purple mb-0">
                    {seller.shopName}
                  </h6>

                  <span
                    className={`badge ${seller.isBlocked ? "bg-danger" : "bg-success"}`}
                  >
                    {seller.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>


                <p className="my-2 text-muted fs-7">
                  <b>Seller: </b> {seller.fullName}
                </p>
                <p className="mb-2 text-muted fs-7">
                  <b>Email: </b> {seller.email}
                </p>
                <p className="mb-3 text-muted fs-7">
                  <b>Location: </b> {seller.shopAddress}
                </p>


                <div className="mt-auto d-flex gap-2">
                  <button
                    className={`btn btn-${seller.isBlocked ? "success" : "warning"} btn-sm w-100`}
                    onClick={() => toggleBlockSeller(seller._id)}
                  >
                    {seller.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => deleteSeller(seller._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        ))}

        {sellers.length === 0 && (
          <p className="text-center w-100">No sellers found.</p>
        )}
      </div>
    </div>
  );
}

export default Sellers;
