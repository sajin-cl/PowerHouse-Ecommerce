import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Brands() {


  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/admin/brands')
      .then(response => setBrands(response.data))
      .catch(err => console.error('Brands fetching error', err));

  }, []);


  return (
    <div className="container mt-4">
      <h3 className="mb-4">Brand Management</h3>

      {brands.length > 0 ? (
        <div className="row">
          {brands.map((brand) => (
            <div key={brand._id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{brand.name}</h6>
                  <p className="card-text text-muted">{brand.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/admin/update-brand`}
                      className="btn btn-success px-3 py-1"
                    >
                      <small>Edit</small>
                    </Link>
                    <button
                      className="btn btn-danger px-3 py-1"

                    >
                      <small>Delete</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <div className="d-flex align-items-center h-50 justify-content-center tesxt-muted"  > No Brands found</div>
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
