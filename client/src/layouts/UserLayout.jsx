import { Outlet } from 'react-router-dom'
import UserHeader from '../components/UserHeader';


function UserLayout() {
  return (
    <>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default UserLayout;