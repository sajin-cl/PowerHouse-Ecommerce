import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSellerProfile as getSellerProfileApi, updateSellerProfile } from "../../services/sellerService";


function UpdateSellerProfile() {


  document.title = ('Seller Profile | Power House Ecommerce');

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shopName: "",
    shopAddress: ""
  });



  const getSellerProfileData = async () => {
    try {
      const response = await getSellerProfileApi();
      setFormData(response.data);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false)
    }
  };


  useEffect(() => { getSellerProfileData() }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSellerProfile(formData);
      navigate("/seller/profile");

    }
    catch (err) {
      console.error('Failed to update profile');
      setErrors({ backend: err });
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
