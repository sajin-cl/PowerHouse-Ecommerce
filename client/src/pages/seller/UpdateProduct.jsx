import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBrands, getAllCategories, getProductById, updateProduct } from "../../services/productService";


function UpdateProduct() {

  document.title = ('Seller | Update Products | Power House Ecommerce');

  const navigate = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [preview, setPreview] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    stock: '',
    price: '',
    productImage: null
  });


  const fetchProductEditData = async () => {
    try {
      const [catRes, brandRes, prodRes] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
        getProductById(id)
      ]);

      setCategories(catRes.data.categories);
      setBrands(brandRes.data.brands);

      const prod = prodRes.data

      setCurrentImage(prod.image_url);

      setFormValues({
        name: prod.name || '',
        description: prod.description || '',
        brand: prod.brand?._id || '',
        category: prod.category?._id || '',
        stock: prod.stock || 0,
        price: prod.price || 0,
        productImage: null
      });
    }
    catch (err) {
      console.error(err);
      setErrors({ backend: err });
      setTimeout(() => { setErrors({}) }, 3000);
    }
  };


  useEffect(() => { fetchProductEditData() }, [id]);


  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file' && files[0]) {

      const selectedFile = files[0];

      if (preview) URL.revokeObjectURL(preview);

      setFormValues(prev => ({ ...prev, [name]: selectedFile }));

      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formValues)) {
        if (key === 'productImage' && value === null) continue;

        if (value === '' && key !== 'description') continue;

        formData.append(key, value);
      }

      await updateProduct(id, formData);
      navigate('/seller/products');
    } catch (err) {
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

                <div className="mb-3">
                  <label className="form-label text-purple">Product Image</label>
                  <div className="mb-2 text-center">
                    {preview ? (
                      <div className="border rounded p-1">
                        
                        <img src={preview} alt="New Preview" style={{ width: "100%", height: "200px", objectFit: "contain" }} />
                      </div>
                    ) : currentImage ? (
                      <div className="border rounded p-1">
                      
                        <img src={`${import.meta.env.VITE_IMG_URL}${currentImage}`} alt="Current" style={{ width: "100%", height: "200px", objectFit: "contain" }} />
                      </div>
                    ) : null}
                  </div>
                  <input type="file" className="form-control" name="productImage" onChange={handleChange} />
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