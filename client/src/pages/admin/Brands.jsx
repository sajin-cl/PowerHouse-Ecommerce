import { Link } from "react-router-dom";

function Brands() {

  const brands = [
    { id: 1, name: "Apple", description: "Electronics & mobiles" },
    { id: 2, name: "Samsung", description: "Electronics & mobiles" },
    { id: 3, name: "Nike", description: "Sports & fashion" },
    { id: 4, name: "Adidas", description: "Sports & fashion" },
  ];



  return (
    <div className="container mt-4">
      <h3 className="mb-4">Brand Management</h3>

      <div className="row">
        {brands.map((brand) => (
          <div key={brand.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{brand.name}</h6>
                <p className="card-text text-muted">{brand.description}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/admin/update-brand`}
                    className="btn btn-success px-3 py-1"
                  >
                    <small>Edit</small>
                  </Link>
                  <button
                    className="btn btn-danger px-3 py-1"
                  
                  >
                    <small>Delete</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/admin/add-brand"
        className="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          fontSize: "30px",
          zIndex: 1000,
        }}
      >
        +
      </Link>
    </div>
  );
}

export default Brands;
