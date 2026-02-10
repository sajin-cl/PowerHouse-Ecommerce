import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function UpdateProduct() {


  document.title = ('Seller | Update Products | Power House Ecommerce');

  const navigate = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    stock: '',
    price: '',
    productImage: null
  });


  useEffect(() => {

    axiosInstance.get('/categories').then(response => setCategories(response.data.categories))
      .catch(err => {
        console.error('Failed to fetching categories');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      });

    axiosInstance.get('/brands').then(response => setBrands(response.data.brands))
      .catch(err => {
        console.error('Failed to fetching brands');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      });

    axiosInstance.get(`/products/${id}`).then(response => {
      const prod = response.data;
      setCurrentImage(prod.image_url)
      setFormValues({
        name: prod.name || '',
        description: prod.description || '',
        brand: prod.brand?._id || '',
        category: prod.category?._id || '',
        stock: prod.stock || 0,
        price: prod.price || 0,
        productImage: null
      })
    })
      .catch(err => {
        console.error('Failed to fetching product');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      })

  }, []);


  const handleChange = (e) => {

    const { name, value, files, type } = e.target;

    setFormValues(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };


  const handleUpdate = (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('brand', formValues.brand);
    formData.append('category', formValues.category);
    formData.append('stock', Number(formValues.stock));
    formData.append('price', Number(formValues.price));

    if (formValues.productImage) {
      formData.append("productImage", formValues.productImage);
    }

    axiosInstance.patch(`/products/${id}`, formData)
      .then(() => {
        console.info('Product updated');
        navigate('/seller/products');
      })
      .catch(err => {
        console.error('Product update failed');
        setErrors({ backend: err.response?.data?.error });
        setTimeout(() => { setErrors({}) }, 3000);
      })


  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Edit Product</h3>

              <form onSubmit={handleUpdate} method="post" encType="multipart/form-data" >

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
                    value={formValues.brand || ''}
                  >
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

                <div className="mb-3 d-flex flex-column">
                  {currentImage &&
                    <>
                      <label htmlFor="current-prodImg" className="form-label text-purple">Current Image:</label>
                      <img
                        src={`http://localhost:4000${currentImage}`}
                        alt="current" style={{ width: "100%", height: "250px", objectFit: "cover" }}
                      />
                    </>
                  }
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

                {errors.backend && (<div className="text-center text-danger mb-2">{errors.backend}</div>)}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-purple btn-lg "
                    id="atr-submit-btn"
                  >Update
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

export default UpdateProduct;