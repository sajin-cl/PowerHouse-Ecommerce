import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandById, updateBrand as updateBrandApi } from "../../services/adminService";

function UpdateBrand() {


  document.title = ('Update Brand | Power House Ecommerce');

  const { id } = useParams();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [brand, setBrand] = useState({
    name: '',
    description: ''
  });


  const fetchBrandById = async (id) => {
    try {
      const response = await getBrandById(id);
      setBrand(response.data)
    }
    catch (err) {
      console.error('Brand fetching error');
      setErrors({ backend: err });
      setTimeout(() => setErrors({}), 3000);
    }

  };


  useEffect(() => {
    fetchBrandById(id);
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target
    setBrand(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const updateBrand = async (e) => {
    e.preventDefault();
    try {
      await updateBrandApi(id, brand);
      navigate("/admin/brands");
    }
    catch (err) {
      console.error('update failed');
      setErrors({ backend: err });
      setTimeout(() => setErrors({}), 3000);

    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Edit Brand </h3>

              <form method="post" encType="multipart/form-data" onSubmit={updateBrand}>

                <div className="mb-3">
                  <label htmlFor="brandName" className="form-label text-success">Brand Name </label>
                  <input
                    type="text"
                    id="brandName"
                    className="form-control"
                    placeholder="Enter the brand name"
                    name="name"
                    value={brand.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="brandDesc" className="form-label text-success">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="brandDesc"
                    placeholder="Enter the  description"
                    name="description"
                    value={brand.description}
                    onChange={handleChange}
                  />
                </div>

                {errors.backend && <div className="text-center text-danger mb-3">{errors.backend}</div>}

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg " id="atr-submit-btn">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateBrand;