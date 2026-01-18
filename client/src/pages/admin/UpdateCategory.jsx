function UpdateCategory() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 rounded-4">
              <h3 className="text-center mb-4">Edit Category</h3>

              <form method="post" encType="multipart/form-data">

                <div className="mb-3">
                  <label htmlFor="catName" className="form-label text-success">Category </label>
                  <input type="text" id="catName" className="form-control" placeholder="Enter the category name" name="catName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="catDesc" className="form-label text-success">Description</label>
                  <input type="text" className="form-control" id="catDesc" placeholder="Enter the category description" name="catDesc" />
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

export default UpdateCategory;