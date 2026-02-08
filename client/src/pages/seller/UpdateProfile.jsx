import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSellerProfile() {

  
  const webTitle = document.title = 'Seller Profile | Power House Ecommerce';

  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shopName: "",
    shopAddress: ""
  });

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
  
    axios
      .get("http://localhost:4000/api/seller/profile", { withCredentials: true })
      .then((res) => {
        setFormData({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          shopName: res.data.shopName || "",
          shopAddress: res.data.shopAddress || ""
        });
      })
      .catch((err) => console.error(err?.response?.data))
      .finally(() => setLoading(false));
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("fullName", formData.fullName);
    fd.append("email", formData.email);
    fd.append("shopName", formData.shopName);
    fd.append("shopAddress", formData.shopAddress);

    try {
      await axios.patch(
        "http://localhost:4000/api/seller/profile",
        fd,
        { withCredentials: true }
      );
      navigate("/seller/profile");
    } catch (err) {
      console.error(err?.response?.data);
      setErrors({ backend: err?.response?.data?.error || "Failed to update profile" });
      setTimeout(() => setErrors({}), 3000);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (

    <div className="container mt-5">
      <h2 className="mb-4">Update Profile</h2>

      <div className="row justify-content-center">
        <div className="col-md-6 border p-4 rounded shadow-sm">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                className="form-control"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shop Address</label>
              <input
                type="text"
                className="form-control"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleChange}
              />
            </div>

            {errors.backend && <div className="text-danger mb-2">{errors.backend}</div>}

            <button className="btn btn-purple w-100" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSellerProfile;
