import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [refresh, setRefresh] = useState(0);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/users", { withCredentials: true })
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error(
          "Failed to fetch users:",
          err.response?.data?.error || err?.message
        );
      });
  }, [refresh]);


  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/api/admin/users/${id}`, { withCredentials: true })
      .then(() => {
        console.info('user deleted successfully');
        setRefresh(prev => prev + 1);
      })
      .catch(err => console.error('failed to delete user', err))
  };


  const toggleBlockUser = (id) => {
    axios
      .patch(`http://localhost:4000/api/admin/users/${id}/toggle-block`, null, { withCredentials: true })
      .then(() => {
        console.info('User toggle status changed');
        setRefresh(prev => prev + 1);
      })
      .catch(err => console.error('failed to change status', err.response?.data?.error || err.message))
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">User Management</h3>

      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">

                {/* Show name + email */}
                <h6 className="card-title">{user.fullName}</h6>
                <p className="card-text">{user.email}</p>

                {/* Show status */}
                <p className={`card-text ${!user.isBlocked ? "text-success" : "text-danger"}`}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </p>

                {/* Buttons */}
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className={`btn btn-${!user.isBlocked ? "warning" : "success"} px-3 py-1`}
                    onClick={() => { toggleBlockUser(user._id) }}
                  >
                    <small>{user.isBlocked ? "Unblock" : "Block"}</small>
                  </button>

                  <button
                    className="btn btn-danger px-3 py-1"
                    onClick={() => { deleteUser(user._id) }}
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
