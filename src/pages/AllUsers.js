import React, { useEffect, useState } from "react";
import summaryApi from "../common/summaryApi";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.AllUsers.url, {
      method: summaryApi.AllUsers.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-black text-white">
            <th className="border text-base font-medium">Sr.</th>
            <th className="border text-base font-medium">Name</th>
            <th className="border text-base font-medium">Email</th>
            <th className="border text-base font-medium">Role</th>
            <th className="border text-base font-medium">Created Date</th>
            <th className="border text-base font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="pb-4 bg-white">
          {allUser.map((el, index) => {
            return (
              <tr>
                <td className="border text-base text-center">{index + 1}</td>
                <td className="border text-base text-center">{el?.name}</td>
                <td className="border text-base text-center">{el?.email}</td>
                <td className="border text-base text-center">{el?.role}</td>
                <td className="border text-base text-center">
                  {moment(el?.createdAt).format("LL")}
                </td>
                <td className="border text-base text-center">
                  <button
                    className="bg-green-200 p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
