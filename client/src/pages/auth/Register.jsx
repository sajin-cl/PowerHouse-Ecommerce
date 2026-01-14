import { useState } from "react";
import '../../style/register.css'
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({

    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    shopName: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const { user, email, password, confirmPassword, role, shopName } = formData;

    if (!user || !email || !password || !confirmPassword) {
      setError('All fields required');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    };

    if (role === 'seller' && !shopName) {
      setError('Shop name is required for seller');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    };

    if (password !== confirmPassword) {
      setError('Password mismatched');

      setTimeout(() => {
        setError('')
      }, 2000);

      return;
    };


    setFormData({

      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      shopName: ""
    });

    navigate('/login')

  };


  return (

    <div className="container my-5 pb-5">
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
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="user"
                placeholder="Enter your name"
                value={formData.user}
                onChange={handleChange}
              />
            </div>

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
                className="form-control"
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

            <div className="mb-3 position-relative">
              <label className="form-label">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.role === "seller" && (
              <div className="mb-3">
                <label className="form-label">Shop Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="shopName"
                  placeholder="Enter your shop name"
                  onChange={handleChange}
                />
              </div>
            )}

            {error && <p className="text-danger text-center">{error}</p>}

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