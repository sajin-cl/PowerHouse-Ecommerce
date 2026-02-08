import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { motion } from 'framer-motion';
import { cardContainer, droppingCard } from "../../animations/adminVarients";


function Categories() {


  const webTitle = document.title = 'Category | Power House Ecommerce';

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

      <h5 className="border-bottom mb-4 pb-2">Manage Categories</h5>

      {categories.length > 0 ? (
        <motion.div
          className="row"
          variants={cardContainer} initial="hidden" animate="visible"
        >
          {categories.map((category) => (
            <div key={category._id} className="col-6 col-md-4 col-lg-3 mb-4">
              <motion.div 
              className="card h-100 shadow"
              variants={droppingCard} drag
              >
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{category.name}</h6>
                  <p className="card-text text-muted">{category.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/admin/update-category/${category._id}`}
                      className="btn  btn-sm"
                    >
                      <i className="fas fa-edit fs-6 "></i>
                    </Link>
                    <button
                      className="btn  btn-sm "
                      onClick={() => deleteCategory(category._id)}
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
