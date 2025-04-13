import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card, CardHeader, CardBody, CardFooter,
  Typography, Input, Checkbox, Button
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config";

export default function VendorLogin() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${config.baseURL}/api/vendors/login`, formData, {
        withCredentials: true,
      });
      toast.success("Vendor logged in successfully!");
      navigate("/vendor/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader variant="gradient" color="gray" className="grid h-28 place-items-center">
          <Typography variant="h4" color="white">Vendor Login</Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" name="email" size="lg" value={formData.email} onChange={handleInputChange} required />
            <Input label="Password" type="password" name="password" size="lg" value={formData.password} onChange={handleInputChange} required />
            <Checkbox label="Remember Me" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" fullWidth variant="gradient" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Typography variant="small" className="mt-6 text-center">
              Don&apos;t have an account? <Link to="/vendor/signup" className="font-bold text-blue-600">Sign up</Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
