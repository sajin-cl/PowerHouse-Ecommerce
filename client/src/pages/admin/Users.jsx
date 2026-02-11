import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { cardContainer, droppingCard } from "../../animations/globalVariants";
import { getAllUsers, deleteUser as deleteUserApi, toggleBlockUser as toggleBlockUserApi } from "../../services/adminService";

function Users() {


  document.title = ('Admin | User List | Power House Ecommerce');

  const [refresh, setRefresh] = useState(0);
  const [users, setUsers] = useState([]);


  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data)

    }
    catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    fetchAllUsers();
  }, [refresh]);


  const deleteUser = async (id) => {
    try {
      await deleteUserApi(id);
      setRefresh(prev => prev + 1)
    }
    catch (err) {
      console.error('failed to delete user', err);
    }
  };


  const toggleBlockUser = async (id) => {
    try {
      await toggleBlockUserApi(id);
      setRefresh(prev => prev + 1);

    }
    catch (err) {
      console.error(err || 'failed to change status');
    };

  };

  return (
    <div className="container mt-4">
      <h5 className="border-bottom mb-4 pb-2">Manage Users</h5>

      <motion.div
        className="row"
        variants={cardContainer} initial="hidden" animate="visible"
      >
        {users.map((user) => (
          <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-4">

            <motion.div
              className="card h-100 shadow-sm border-0"
              variants={droppingCard}
            >
              <div className="card-body d-flex flex-column text-center">

                <span
                  className={`badge align-self-end mb-2 ${user.isBlocked ? "bg-danger" : "bg-success"
                    }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>

                <img
                  src="/src/assets/images/avatar.png"
                  alt="avatar"
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: "72px", height: "72px", objectFit: "cover" }}
                />

                <h6 className="fw-semibold mb-1">
                  {user.fullName}
                </h6>


                <p className="text-muted fs-7 mb-3">
                  {user.email}
                </p>


                <div className="mt-auto d-flex gap-2">
                  <button
                    className={`btn btn-sm w-100 ${user.isBlocked ? "btn-success" : "btn-warning"
                      }`}
                    onClick={() => toggleBlockUser(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        ))}

        {users.length === 0 && (
          <p className="text-center w-100">No users found.</p>
        )}
      </motion.div>
    </div>
  );
}

export default Users;
