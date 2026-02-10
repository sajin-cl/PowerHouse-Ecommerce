import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'

function ForgotPassword() {

  document.title = ('Forgot Password | Power House');

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false); // For Email -> OTP swap
  const [isVerified, setIsVerified] = useState(false); // For OTP -> New Password swap

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
      setIsOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        setIsVerified(true);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP!");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/reset-password', { email, password: newPassword });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Reset failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row shadow-lg rounded-4 overflow-hidden auth-wrapper" style={{ minHeight: "450px" }}>

        <div className="col-md-6 d-none d-md-flex auth-left text-white align-items-center justify-content-center">
          <div className="auth-left-content p-5">
            <h4>Welcome to Power House</h4>
          </div>
        </div>

        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">

          <h3 className="text-center mb-2">
            {!isOtpSent ? "Forgot Password" : !isVerified ? "Verify OTP" : "New Password"}
          </h3>
          <p className="text-muted text-center mb-4 small">
            {!isOtpSent ? "We will send a password reset OTP to your registered email." :
              !isVerified ? `Please enter the 6-digit code sent to ${email}` :
                "Enter your new password below."}
          </p>

          {!isOtpSent ? (

            <form onSubmit={handleSendOtp}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100 mt-2 shadow-sm" style={{ backgroundColor: "var(--violet-color)", border: "none" }} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : !isVerified ? (

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-3 text-center">
                <label className="form-label text-start d-block">Enter OTP</label>
                <input
                  type="text"
                  className={`form-control text-center fw-bold ${error ? 'is-invalid' : ''}`}
                  style={{ letterSpacing: "8px", fontSize: "20px" }}
                  placeholder="000000"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100 mt-2 shadow-sm" style={{ backgroundColor: "var(--violet-color)", border: "none" }} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-link btn-sm text-decoration-none" onClick={() => setIsOtpSent(false)}>Change Email</button>
              </div>
            </form>
          ) : (

            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label className="form-label">Create New Password</label>
                <input
                  type="password"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="At least 5 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="5"
                />
              </div>
              <button className="btn btn-primary w-100 mt-2 shadow-sm" style={{ backgroundColor: "var(--violet-color)", border: "none" }} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {message && <div className="alert alert-success mt-3 py-2 small text-center">{message}</div>}
          {error && <div className="alert alert-danger mt-3 py-2 small text-center">{error}</div>}

          <div className="text-center mt-4">
            <Link to="/login" className="text-decoration-none" style={{ color: "var(--violet-color)" }}>
              <i className="bi bi-arrow-left me-1"></i> Back to Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;