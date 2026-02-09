import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddProduct() {


  document.title = ('Seller | Add Products | Power House Ecommerce');

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    price: '',
    productImage: null
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/categories', {
      withCredentials: true
    })
      .then(response => setCategories(response.data.categories))
      .catch(err => {
        console.error('Category fetch failed');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      }

      );

    axios.get('http://localhost:4000/api/brands', {
      withCredentials: true
    })
      .then(response => setBrands(response.data.brands))
      .catch(err => {
        console.log('Brand fetch failed');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      });
  }, []);


  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormValues(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'number' ? Number(value) : value
    }))
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('category', formValues.category);
    formData.append('brand', formValues.brand);
    formData.append('stock', formValues.stock);
    formData.append('price', formValues.price);
    formData.append('productImage', formValues.productImage);


    axios.post('http://localhost:4000/api/products', formData, {
      withCredentials: true,
    })
      .then(response => {
        console.info(response.data);
        setFormValues({
          name: "",
          description: "",
          category: "",
          brand: "",
          stock: "",
          price: "",
          productImage: null
        });

        navigate('/seller/products')
      })
      .catch(err => {
        console.error('product submition failed', err)
        setErrors({ backend: err.response?.data?.error || 'something went wrong' });
        setTimeout(() => { setErrors({}) }, 3000);
      });

  };



  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Add Product</h3>

              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="productName" className="form-label text-purple">Product </label>
                  <input
                    type="text"
                    id="productName"
                    className="form-control"
                    placeholder="Product name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productDesc" className="form-label text-purple">Decscription </label>
                  <input
                    type="text"
                    id="productDesc"
                    className="form-control"
                    placeholder="Product description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodCategory" className="form-label text-purple">Category</label>
                  <select
                    name="category"
                    id="prodCategory"
                    className="form-select"
                    onChange={handleChange}
                    value={formValues.category}
                  >
                    <option value="" disabled>Select Category </option>
                    {categories.map((category, index) => (
                      <option
                        key={category._id + '-' + index}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="prodBrand" className="form-label text-purple">Brand</label>
                  <select
                    name="brand"
                    id="prodBrand"
                    className="form-select"
                    onChange={handleChange}
                    value={formValues.brand}
                  >
                    <option value="" disabled>Select Brand</option>
                    {brands.map((brand, index) => (
                      <option
                        key={brand._id + '-' + index}
                        value={brand._id}
                      >
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="prodStock" className="form-label text-purple">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="prodStock"
                    placeholder="Enter the product stock"
                    name="stock"
                    value={formValues.stock}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodPrice" className="form-label text-purple">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="prodPrice"
                    placeholder="Enter the product price"
                    name="price"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodImg" className="form-label text-purple">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="prodImg"
                    name="productImage"
                    onChange={handleChange}
                  />
                </div>

                {errors.backend && (<div className="text-center text-danger mb-3">{errors.backend}</div>)}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-purple btn-lg "
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

export default AddProduct;