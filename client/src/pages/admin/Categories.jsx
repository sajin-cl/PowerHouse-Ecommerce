import { Link } from "react-router-dom";

function Categories() {

  const categories = [
    { id: 1, name: "Electronics", description: "Devices and gadgets" },
    { id: 2, name: "Mobiles", description: "Smartphones and accessories" },
    { id: 3, name: "Laptops", description: "All kinds of laptops" },
    { id: 4, name: "Fashion", description: "Clothes, shoes, accessories" },
    { id: 5, name: "Men", description: "Men's clothing and accessories" },
    { id: 6, name: "Women", description: "Women's clothing and accessories" },
  ];


  const addCategoryBtn = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "60px",
    height: "60px",
    fontSize: "30px",
    zIndex: 1000,
  };



  return (
    <div className="container mt-4">
      <h3 className="mb-4">Category Management</h3>
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{category.name}</h6>
                <p className="card-text text-muted">{category.description}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/admin/update-category`}
                    className="btn btn-success px-3 py-1"
                  >
                    <small>Edit</small>
                  </Link>
                  <button className="btn btn-danger px-3 py-1"><small>Delete</small></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/admin/add-category"
        className="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center addCategoryBtn"
        style={addCategoryBtn}
      >
        +
      </Link>
    </div>
  );
}

export default Categories;
