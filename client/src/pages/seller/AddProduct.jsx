function AddProduct() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Add Product</h3>

              <form method="post" encType="multipart/form-data">

                <div className="mb-3">
                  <label htmlFor="productName" className="form-label text-violet">Product </label>
                  <input type="text"  id="productName" className="form-control" placeholder="Enter the product name" name="productName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodCategory" className="form-label text-violet">Category</label>
                  <select name="prodCategory" id="prodCategory" className="form-select">
                    <option >Select Category</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="prodBrand" className="form-label text-violet">Brand</label>
                  <select name="prodBrand" id="prodBrand" className="form-select">
                    <option >Select Brand</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="prodStock" className="form-label text-violet">Stock</label>
                  <input type="number" className="form-control" id="prodStock" placeholder="Enter the product stock" name="prodStock" />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodPrice" className="form-label text-violet">Price</label>
                  <input type="number" className="form-control" id="prodPrice" placeholder="Enter the product price" name="prodPrice" />
                </div>

                <div className="mb-3">
                  <label htmlFor="prodImg" className="form-label text-violet">Product Image</label>
                  <input type="file" className="form-control" id="prodImg" name="prodImg"  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-purple btn-lg " id="atr-submit-btn">Submit</button>
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