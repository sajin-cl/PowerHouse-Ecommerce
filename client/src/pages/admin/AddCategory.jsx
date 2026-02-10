import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory() {


  document.title = ('Add Category | Power House Ecommerce');

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev => ({
      ...prev,
      [name]: value,
    })));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('/admin/categories', formData).then(response => {
      console.log(response.data);
      setFormData({
        name: "",
        description: ""
      });
      navigate('/admin/categories')
    })
      .catch(err => {
        console.error('error for creating category');
        if (err) {
          setErrors({ backend: err.response?.data?.error });
          setTimeout(() => setErrors({}), 3000);
        }
      })
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Add Category</h3>

              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label text-success">Category </label>
                  <input
                    type="text"
                    id="categoryName"
                    className="form-control"
                    placeholder="Enter the category name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="catDescription" className="form-label text-success">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="catDescription"
                    placeholder="Enter the  description"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>

                {errors.backend && (<div className="text-center text-danger mb-3">{errors.backend}</div>)}

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg " id="atr-submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategory;