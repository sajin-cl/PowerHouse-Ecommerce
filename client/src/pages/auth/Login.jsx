import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

function LoginForm() {


  document.title = ('Login | Power House Ecommerce');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const validate = (data) => {

    const newErrors = {};

    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required"

    return newErrors;
  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validateErrors = validate(formData);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      setTimeout(() => setErrors({}), 3000);
      return
    }

    axiosInstance.post('/auth/login', formData).then((response) => {

      const { role } = response.data

      setFormData({ email: "", password: "" });

      navigate(
        role === 'admin' ? '/admin' :
          role === 'seller' ? '/seller' :
            '/'
      );

    }).catch((err) => {
      console.error('Login failed');
      setErrors({ backend: err.response?.data?.error || "Something went wrong on the server" });
      setTimeout(() => { setErrors({}) }, 3000)
    })

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
                  className={`form-control ${errors.email ? "border border-danger" : ""}`}
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control pe-5${errors.password ? "border border-danger" : ""}`}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </span>
                </div>

                {errors.password && <div className='text-danger'>{errors.password}</div>}
              </div>
              {errors.backend && <div className="text-danger mb-2 text-center">{errors.backend}</div>}

              <p className="text-center my-2">
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>

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