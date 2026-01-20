import { useState } from "react";
import "../../style/register.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    shopName: "",
  });


  const validate = (data) => {
    const newErrors = {};

    if (!data.user.trim()) newErrors.user = "Name is required *";
    if (!data.email.trim()) newErrors.email = "Email is required *";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password && data.password.length < 5) newErrors.password = "password must be contain 5 characters"
    else if (!data.confirmPassword) newErrors.confirmPassword = "password is required *";
    else if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (data.role === "seller" && !data.shopName.trim()) {
      newErrors.shopName = "Shop name required for sellers";
    }
    return newErrors;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:4000/api/auth/register', formData, {
      headers: {
        "Content-Type": 'application/json'
      }
    })
      .then((response => {
        console.log(response.data);
        setFormData({
          user: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
          shopName: "",
        });
        navigate("/login");
      }))
      .catch((err) => {
        console.error('data tranfor failed');
        if (err.response && err.response.data && err.response.data.error) {

          setErrors({ backend: err.response.data.error });
          setTimeout(() => {
            setErrors('')
          }, 3000)
        } else {
          setErrors({ backend: "Something went wrong" });
        }
      });
  };

  return (
    <div className="container my-5 pb-5">
      <div className="row shadow-lg rounded-4 overflow-hidden auth-wrapper">

        <div className="col-md-6 d-none d-md-flex auth-left text-white">
          <div className="auth-left-content">
            <h3>Welcome to Power House</h3>
            <p>
              Your trusted marketplace for quality products from verified sellers,
              designed for a smooth and secure shopping experience.
            </p>
          </div>
        </div>

        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleSubmit}>


            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.user ? "border border-danger" : ""}`}
                name="user"
                placeholder="Enter your name"
                value={formData.user}
                onChange={handleChange}
              />
              {errors.user && <div className="text-danger">{errors.user}</div>}
            </div>


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
                  className={`form-control ${errors.password ? "border border-danger" : ""}`}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>

              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>


            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="position-relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className={`form-control ${errors.confirmPassword ? "border border-danger" : ""}`}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>


            <div className="mb-3">
              <label className="form-label">Register as</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>


            {formData.role === "seller" && (
              <div className="mb-3">
                <label className="form-label">Shop Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.shopName ? "border border-danger" : ""}`}
                  name="shopName"
                  placeholder="Enter your shop name"
                  value={formData.shopName || ''}
                  onChange={handleChange}
                />
                {errors.shopName && <div className="text-danger">{errors.shopName}</div>}
              </div>
            )}

            {errors.backend && <div className="text-danger mb-2 text-center">{errors.backend}</div>}


            <button className="btn btn-primary w-100 mt-3" style={{ backgroundColor: "var(--violet-color)" }}>
              Register now
            </button>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
