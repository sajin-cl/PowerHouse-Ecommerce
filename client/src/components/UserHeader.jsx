import '../style/header.css'
import { Link } from 'react-router-dom'

function UserHeader() {
  return (

    <nav className="navbar navbar-expand-lg navbar-light  sticky-top">
      <div className="container-fluid">
        <img src="/logo.png" alt="logo" style={{ height: "32px", width: "32px" }} />
        <Link className="navbar-brand text-white fw-bold fs-6" ><small>Power <span className="text-warning">House</span></small></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-white">Home</Link>
            </li>


            <li className="nav-item">
              <Link to={'/cart'} className="nav-link text-white">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to={'/myorders'} className="nav-link text-white">Orders</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white"
                to="/register">Register</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white"
                to="/login">Login</Link>
            </li>

            <li className="nav-item d-flex align-items-sm-center">
              <Link className="btn btn-danger btn-sm ms-3 px-3 py-0 ">Logout</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  )
};

export default UserHeader;