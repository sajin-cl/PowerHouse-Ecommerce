import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddBrand() {

  const webTitle = document.title = 'Add Brand | Power House Ecommerce';

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/admin/brands', formData, { withCredentials: true })
      .then(response => {
        console.info(response.data);
        setFormData({
          name: '',
          description: ''
        })
        navigate('/admin/brands');
      })
      .catch(err => {
        console.error('Error for creating brand');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => setErrors({}), 3000);
      });

  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Add Brand</h3>

              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="brandName" className="form-label text-success">Brand Name </label>
                  <input
                    type="text"
                    id="brandName"
                    className="form-control"
                    placeholder="Enter the brand name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
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
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>

                {errors.backend && (<div className="text-center text-danger mb-3">{errors.backend}</div>)}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg "
                    id="atr-submit-btn"
                  >Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBrand;