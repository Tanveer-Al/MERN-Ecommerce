import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form className="pt-6 flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Enter Password"
                  name="password"
                  className="w-full h-full outline-none bg-transparent"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:text-red-600 hover:underline"
              >
                Forgot Password
              </Link>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
