// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import config from "../../config";

// export default function VendorSignup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     vendorShopName: "",
//     sellerId: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.vendorShopName || !formData.sellerId || !formData.email || !formData.password) {
//       return toast.error("All fields are required.");
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${config.baseURL}/api/vendors/signup`, formData, {
//         withCredentials: true,
//       });
//       toast.success("Vendor registered successfully!");
//       navigate("/vendor/login");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen justify-center items-center bg-orange-200">
//       <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
//         <h2 className="text-center text-2xl font-bold mb-6">Vendor Signup</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             name="name"
//             placeholder="Full Name"
//             className="w-full border p-2 rounded"
//             onChange={handleChange}
//             value={formData.name}
//             required
//           />
//           <input
//             name="vendorShopName"
//             placeholder="Vendor Shop Name"
//             className="w-full border p-2 rounded"
//             onChange={handleChange}
//             value={formData.vendorShopName}
//             required
//           />
//           <input
//             name="sellerId"
//             placeholder="Seller ID"
//             className="w-full border p-2 rounded"
//             onChange={handleChange}
//             value={formData.sellerId}
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="w-full border p-2 rounded"
//             onChange={handleChange}
//             value={formData.email}
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className="w-full border p-2 rounded"
//             onChange={handleChange}
//             value={formData.password}
//             required
//           />
//           <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded" disabled={loading}>
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <a href="/vendor/login" className="text-blue-600 font-semibold">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }


// VendorSignup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config";

export default function VendorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    vendorShopName: "",
    sellerId: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.vendorShopName || !formData.sellerId || !formData.email || !formData.password) {
      return toast.error("All fields are required.");
    }

    try {
      setLoading(true);
      await axios.post(`${config.baseURL}/api/vendors/signup`, formData, { withCredentials: true });
      toast.success("Vendor registered successfully!");
      navigate("/vendor/login"); // Redirect to login page after signup
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-orange-200">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6">Vendor Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            name="vendorShopName"
            placeholder="Vendor Shop Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={formData.vendorShopName}
            required
          />
          <input
            name="sellerId"
            placeholder="Seller ID"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={formData.sellerId}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/vendor/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}
