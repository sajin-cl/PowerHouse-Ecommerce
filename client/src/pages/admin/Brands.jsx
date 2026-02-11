import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { cardContainer, droppingCard } from "../../animations/globalVariants";
import { getAdminBrands, deleteBrand as deleteBrandApi } from "../../services/adminService";

function Brands() {

  document.title = ('Brand | Power House Ecommerce');

  const [brands, setBrands] = useState([]);

  const [refresh, setRefresh] = useState(0);


  const fetchBrands = async () => {
    try {
      const response = await getAdminBrands();
      setBrands(response.data);
    }
    catch (err) {
      console.error('Brands fetching error', err)
    }
  }


  useEffect(() => {
    fetchBrands();

  }, [refresh]);


  const deleteBrand = async (id) => {
    try {
      await deleteBrandApi(id);
      setRefresh(prev => prev + 1);
      console.info('Brand Deleted successfully!')
    }
    catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Manage Brands</h5>

      {brands.length > 0 ? (
        <motion.div
          className="row"
          variants={cardContainer} initial="hidden" animate="visible"
        >
          {brands.map((brand) => (
            <div key={brand._id} className="col-6 col-md-4 col-lg-3 mb-4">
              <motion.div
                className="card h-100 shadow"
                variants={droppingCard}
              >
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{brand.name}</h6>
                  <p className="card-text text-muted">{brand.description}</p>
                  <div className="mt-auto d-flex justify-content-between">

                    <Link
                      to={`/admin/update-brand/${brand._id}`}
                      className="btn  btn-sm"
                    >
                      <i className="fas fa-edit fs-6 "></i>
                    </Link>

                    <button
                      className="btn  btn-sm "
                      onClick={() => { deleteBrand(brand._id) }}
                    >
                      <i className="fas fa-trash fs-6 text-danger"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

      ) : (
        <div className="d-flex align-items-center h-50 justify-content-center text-muted p-5"  > No Brands found</div>
      )}

      <Link
        to="/admin/add-brand"
        className="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center add-popup-btn"
      >
        +
      </Link>
    </div>
  );
}

export default Brands;
