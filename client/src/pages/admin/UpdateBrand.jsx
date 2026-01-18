function UpdateBrand() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Edit Brand </h3>

              <form method="post" encType="multipart/form-data">

                <div className="mb-3">
                  <label htmlFor="brandName" className="form-label text-success">Brand Name </label>
                  <input type="text" id="brandName" className="form-control" placeholder="Enter the brand name" name="brandName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="brandDesc" className="form-label text-success">Description</label>
                  <input type="text" className="form-control" id="brandDesc" placeholder="Enter the  description" name="brandDesc" />
                </div>

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

export default UpdateBrand;