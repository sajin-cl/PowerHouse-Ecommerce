import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Afsal khan", email: "afsalkhan@gmail.com", status: "active" },
    { id: 2, name: "Adharsh", email: "adharshkannadi@gamil.com", status: "blocked" },
    { id: 3, name: "nithin", email: "vempuli@gmail.com", status: "active" },
    { id: 4, name: "Jeni", email: "jeni@gmail.com", status: "active" },
  ]);

 
  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };


  return (
    <div className="container mt-4">
      <h3 className="mb-4">User Management</h3>

      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{user.name}</h6>
                <p className="card-text">{user.email}</p>
                <p
                  className={`card-text ${
                    user.status === "active" ? "text-success" : "text-danger"
                  }`}
                >
                  {user.status === "active" ? "Active" : "Blocked"}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className={`btn btn-${
                      user.status === "active" ? "warning" : "success"
                    } px-3 py-1`}
                    onClick={() => toggleStatus(user.id)}
                  >
                    <small>{user.status === "active" ? "Block" : "Unblock"}</small>
                  </button>
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

        {users.length === 0 && (
          <p className="text-center w-100">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
