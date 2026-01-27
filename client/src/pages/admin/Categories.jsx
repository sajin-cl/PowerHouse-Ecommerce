import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Categories() {

  const [categories, setCategories] = useState([]);
  
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/admin/categories', { withCredentials: true })
      .then(response => {
        setCategories(response.data);
      })
      .catch(() => console.log('categories fetch error'));

  }, [refresh]);


  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:4000/api/admin/categories/${id}`, { withCredentials: true })
      .then(() => {
        console.info('category deleted');
        setRefresh(prev => prev + 1);
      })
      .catch((err) => {
        console.error('category deletetion error', err);

      });
  }


  return (
    <div className="container mt-4">
      <h3 className="mb-4">Category Management</h3>
      {categories.length > 0 ? (
        <div className="row">
          {categories.map((category) => (
            <div key={category._id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{category.name}</h6>
                  <p className="card-text text-muted">{category.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/admin/update-category/${category._id}`}
                      className="btn btn-success px-3 py-1"
                    >
                      <small>Edit</small>
                    </Link>
                    <button
                      className="btn btn-danger px-3 py-1"
                      onClick={() => deleteCategory(category._id)}
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
        <div className="d-flex align-items-center h-50 justify-content-center tesxt-muted"  > NO categories found</div>
      )}


      <Link
        to="/admin/add-category"
        className="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center addCategoryBtn add-popup-btn"

      >
        +
      </Link>
    </div>
  );
}

export default Categories;
