import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";


const AdminLayout = () => {

  return (
    <>
      <AdminHeader />
      <main className="admin-content">
        <Outlet />
      </main>
    </>
  )
};

export default AdminLayout;