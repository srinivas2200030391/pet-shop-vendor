import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config";

export default function VendorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.baseURL}/api/vendors/login`,
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("vendor", JSON.stringify(res.data));
      toast.success("Vendor logged in successfully! 💖");
      navigate("/dash");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed 💔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-gray-100 to-purple-100 px-4">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80 rounded-3xl">
        <CardHeader
          variant="gradient"
          color="indigo"
          className="grid h-28 place-items-center rounded-t-3xl">
          <Typography
            variant="h4"
            className="tracking-wide font-semibold text-black">
            Vendor Login
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-6 px-6 pt-6 pb-2">
            <Input
              label="Email"
              name="email"
              size="lg"
              crossOrigin={undefined}
              className="focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              size="lg"
              crossOrigin={undefined}
              className="focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <Checkbox
                label="Remember Me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="text-indigo-600"
              />
              <Link
                to="/vendor/forgot-password"
                className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors">
                Forgot Password?
              </Link>
            </div>
          </CardBody>

          <CardFooter className="px-6 pb-6 pt-2">
            <Button
              type="submit"
              fullWidth
              variant="gradient"
              className="rounded-full text-sm tracking-wide py-3 shadow-md hover:shadow-xl transition-shadow text-black"
              disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Typography
              variant="small"
              className="mt-6 text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-indigo-600 hover:underline hover:text-indigo-800 transition-colors">
                Sign up
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
