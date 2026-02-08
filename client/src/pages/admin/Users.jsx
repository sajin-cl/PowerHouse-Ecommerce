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
      <h5 className="border-bottom mb-4 pb-2">Manage Users</h5>

      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">

                <img src="/src/assets/images/avatar.png" alt="avatar" className="rounded-circle w-25 mx-auto d-block mb-4" />
                <h6 className="card-title fs-7">Name : {user.fullName}</h6>
                <h6 className="card-title fs-7 ">Email : {user.email}</h6>


                <p className={`card-text ${!user.isBlocked ? "text-success" : "text-danger"}`}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </p>


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
