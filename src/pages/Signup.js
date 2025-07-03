import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import imageTobase64 from "../helpers/ImageTobase64";
import summaryApi from "../common/summaryApi";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async(e)=>{
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file)

    console.log("imagePic", imagePic)
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summaryApi.signUp.url,{
        method : summaryApi.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
      })
    
      const newdata = await dataResponse.json()
      if(newdata.success){
        toast.success(newdata.message);
        navigate("/login")
      }
      if(newdata.error){
        toast.error(newdata.message);
      }
    } else {
      toast.error("plese check password and confirm password");
      console.log("plese check password and confirm password")
    }
  };

  
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="signup icon"/>
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                  className="w-full h-full outline-none bg-transparent"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
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
                  required
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
            </div>
            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={confirmPassword ? "password" : "text"}
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  required
                  className="w-full h-full outline-none bg-transparent"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setConfirmPassword((preve) => !preve)}
                >
                  <span>{confirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Signup
            </button>
          </form>
          <p className="my-5">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
