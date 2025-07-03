import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/Role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  useEffect(()=>{
if(user?.role !== ROLE.ADMIN){
  navigate("/");
}
  },[user])
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 flex flex-col customshadow">
        <div className="h-40 flex justify-center items-center object-contain flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center flex-col items-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
            <div>
              <div className="flex flex-col items-center">
                <p className="capitalize text-lg font-semibold">{user?.name}</p>
                <p className="text-sm">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="py-1 px-2 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="py-1 px-2 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
