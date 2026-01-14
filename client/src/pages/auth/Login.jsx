import { useState } from 'react';
import { Link } from 'react-router-dom'

function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      email: "",
      password: ""
    });

    console.log(formData)
  };



  return (
    <>

      <div className="container my-5">
        <div className="row shadow-lg rounded-4 overflow-hidden auth-wrapper">

          <div className="col-md-6 d-none d-md-flex auth-left text-white">
            <div className="auth-left-content">
              <h3>Welcome to Power House</h3>
              <p>
                Your trusted marketplace for quality products from verified sellers, designed
                for a smooth and secure shopping experience.
              </p>
            </div>
          </div>


          <div className="col-md-6 bg-white p-5">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <span
                  className="position-absolute top-50 end-0 translate-middle-y m-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>

              <button className="btn btn-primary w-100 mt-3" style={{ backgroundColor: "var(--violet-color)" }}>
                Login
              </button>

              <p className="text-center mt-3">
                Don’t have an account? <Link to="/register">Create one</Link>
              </p>
            </form>
          </div>

        </div>
      </div>

    </>
  );
};

export default LoginForm;