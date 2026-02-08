import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {

  
  const webTitle = document.title = 'Update Category | Power House Ecommerce';

  const { id } = useParams();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
    description: ""
  });


  useEffect(() => {

    axios.get(`http://localhost:4000/api/admin/categories/${id}`,{withCredentials:true})
      .then(response => setData(response.data))
      .catch((err) => {
        console.error('category fetching error');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => setErrors({}), 3000);
      })

  }, []);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  };


  const updateCategory = (e) => {

    e.preventDefault();

    axios
      .patch(`http://localhost:4000/api/admin/categories/${id}`, data, { withCredentials: true })
      .then(() => {
        navigate('/admin/categories');
        console.log('category updated')
      })
      .catch(err => {
        console.error('category update failed');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => setErrors({}), 1000);
      });
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Edit Category</h3>

              <form method="post" encType="multipart/form-data" onSubmit={updateCategory}>

                <div className="mb-3">
                  <label htmlFor="catName" className="form-label text-success">Category </label>
                  <input
                    type="text"
                    id="catName"
                    className="form-control"
                    placeholder="Enter the category name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="catDesc" className="form-label text-success">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="catDesc"
                    placeholder="Enter the category description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  />
                </div>


                {errors.backend && <div className="text-center text-danger mb-3"> {errors.backend}</div>}

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

export default UpdateCategory;