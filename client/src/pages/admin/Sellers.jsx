import { useState } from "react";

function Sellers() {
  const [sellers, setSellers] = useState([
    { id: 1, name: "Mark zukoberg", email: "markzuko@gmail.com", status: "active" },
    { id: 2, name: "Elon Musk", email: "elon@gmail.com", status: "inactive" },
    { id: 3, name: "Sundhar pichchai", email: "sundhar@gmail.com", status: "active" },
  ]);

 
  const toggleStatus = (id) => {
    setSellers((prev) =>
      prev.map((seller) =>
        seller.id === id
          ? { ...seller, status: seller.status === "active" ? "inactive" : "active" }
          : seller
      )
    );
  };


  const deleteSeller = (id) => {
    setSellers((prev) => prev.filter((seller) => seller.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Seller Management</h3>

      <div className="row">
        {sellers.map((seller) => (
          <div key={seller.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{seller.name}</h6>
                <p className="card-text">{seller.email}</p>
                <p
                  className={`card-text ${
                    seller.status === "active" ? "text-success" : "text-danger"
                  }`}
                >
                  {seller.status === "active" ? "Active" : "Blocked"}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className={`btn btn-${
                      seller.status === "active" ? "warning" : "success"
                    } px-3 py-1`}
                    onClick={() => toggleStatus(seller.id)}
                  >
                    <small>{seller.status === "active" ? "Block" : "Unblock"}</small>
                  </button>
                  <button
                    className="btn btn-danger px-3 py-1"
                    onClick={() => deleteSeller(seller.id)}
                  >
                    <small>Delete</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sellers.length === 0 && (
          <p className="text-center w-100">No sellers found.</p>
        )}
      </div>
    </div>
  );
}

export default Sellers;
