import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import UpdateUserProfileModal from "./UpdateUserProfileModal";

const UserProfile = () => {
  const defaultPhotoURL =
    "https://i.pinimg.com/1200x/0f/66/bc/0f66bc842998ed2c6f82f85f702b0e44.jpg";

  const { user } = useContext(AuthContext);
  console.log(user);
  const userEmail = user?.email;
  const photoURL = user?.photoURL;
  const [control, setControl] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const fetchData = async () => {
    try {
      if (userEmail) {
        const response = await fetch(
          `https://dhaka-bus-ticket-server-two.vercel.app/single-user?email=${userEmail}`
        );
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const data = await response.json();
        // console.log(data);
        setCurrentUser(data);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  console.log(userEmail);
  useEffect(() => {
     fetchData();
   }, [userEmail, control]);

  console.log(currentUser, "35");

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const dateInfo = {
    date,
    month,
    year,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.phone.value;
    const userInfo = { name, number };
    console.log(userInfo);
    const url = ""
    try {
      axios
        .patch(`https://dhaka-bus-ticket-server-two.vercel.app/single-user/${currentUser._id}`, userInfo)
        .then((res) => {
          console.log(res.data);

          // Swal.fire({
          //   position: "top",
          //   icon: "success",
          //   title: "User Profile Updated",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        })
        .catch((error) => { });
    } catch (error) {
      console.error("Error posting data:", error);
    }
    // form.reset();
  };
  const handleUpdate = () => { };

  return (
    <>
      <div className="max-w-[1200px] mx-auto w-[80%] grid md:grid-cols-2 pt-[100px]">
        <div className="md:w-4/5 w-full gird grid-cols-1 items-center">
          <div className="max-w-xs h-100 px-4 py-3 rounded-md shadow-md bg-gray-50 text-gray-800">
            <img
              src={photoURL ? `${photoURL}` : `${defaultPhotoURL}`}
              alt=""
              className="object-cover mx-auto object-center w-24 md:w-32 rounded-full h-24 md:h-32 bg-gray-500 my-6"
            />
            <div className="my-3">
              <div className="grid grid-cols-2 items-center mb-4">
                <p className="text-gray-500">My Profile</p>

                <p className="text-xs text-gray-500">
                  {" "}
                  Date : {`${dateInfo.date}-${dateInfo.month}-${dateInfo.year}`}
                </p>
              </div>

              <div>
                <div className="grid  grid-cols-2 my-2 mb-4">
                  <p className="text-gray-500   text-xs">
                    Name : {currentUser?.name}
                  </p>
                  <p className=" text-gray-500  text-xs">
                    Phone : {currentUser?.number}
                  </p>
                </div>
                <div className=" grid w-full my-2 mb-4 grid-cols-1 text-xs text-gray-500 ">
                  <p>Email : {currentUser?.email}</p>
                </div>
              </div>
            </div>

            <button
              className="flex items-center justify-center w-full p-3 font-semibold  rounded-md bg-orange-600 text-gray-50"
              onClick={() => handleViewClick()}
            >
              {" "}
              Update Profile
            </button>
          </div>
           
        </div>
          <div className="shadow-lg rounded-md bg-slate-50">
          <div className=" p-2">
            <p className="text-center rounded-md py-2 bg-white text-orange-600">
              My Billings
            </p>
            <div>
              <table className="table w-full md:w-full my-2">
                {/* head */}
                <thead>
                  <tr className="text-xl md:text-2xl text-white bg-[#FF4500]">
                    <th>Email </th>
                    <th className="">TransId</th>
                   
                  </tr>
                </thead>
                <tbody className="item-center">
                  {bills?.map((user, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "text-green-700 bg-green-100 border-b-2 border-green-300"
                          : "text-orange-700 bg-yellow-100 border-b-2 border-yellow-500"
                      }
                    >
                      {/* <td className="md:flex md:items-center md:gap-2">
                        <span className="font-bold md:text-sm">
                          {}
                        </span>
                      </td> */}
                      <td className="font-semibold">{user.customerEmail}</td>
                      <td className="font-semibold">{user.transitionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

       {/* some change of note */}
       

        
      </div>
      <UpdateUserProfileModal
        currentUser={currentUser}
         
      ></UpdateUserProfileModal>
    </>
  );
};
export default UserProfile;
