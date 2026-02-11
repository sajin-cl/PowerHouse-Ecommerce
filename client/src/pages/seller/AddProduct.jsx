import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories, getAllBrands, addProduct } from "../../services/productService";



function AddProduct() {

  document.title = ('Seller | Add Products | Power House Ecommerce');

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    price: '',
    productImage: null
  });


  const fetchDropdownOptions = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        getAllCategories(),
        getAllBrands()
      ])

      setCategories(catRes.data.categories || []);
      setBrands(brandRes.data.brands || []);
    }
    catch (err) {
      console.error(err);
    }

  };


  useEffect(() => { fetchDropdownOptions() }, []);


  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === 'file' && files[0]) {

      const selectedFile = files[0];

      if (preview) URL.revokeObjectURL(preview);

      setFormValues(prev => ({ ...prev, [name]: selectedFile }));

      setPreview(URL.createObjectURL(selectedFile));
    }
    else {
      setFormValues(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }))
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formValues)) {
        if (value === null || value === '') continue;
        formData.append(key, value);
      }

      await addProduct(formData);

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

    }
    catch (err) {
      console.error('product submition failed', err)
      setErrors({ backend: err });
      setTimeout(() => { setErrors({}) }, 3000);
    }
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

                {preview && (
                  <div className="mb-3 text-center">
                    <img src={preview} alt="Preview" style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                  </div>
                )}

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