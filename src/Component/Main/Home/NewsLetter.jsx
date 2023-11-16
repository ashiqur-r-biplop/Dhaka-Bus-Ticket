import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const { subscribeControl, setSubscribeControl } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setEmail(e.target.value); // this value  is user email
  };
  const handelSubmit = () => {
    axios
      .post("https://dhaka-bus-ticket-server-two.vercel.app/subscriber", { email })
      .then((res) => {
        if (res.data.acknowledged === true) {
          Swal.fire(
            "Thank you for Subscription!",
            "You will Recieve our latest update",
            "success"
          );
          setSubscribeControl(!subscribeControl);
        }
      })
      .catch((error) => console.log(error?.message));
    //  this value save the data base when any user subscribe
  };

  return (
    <div className="max-w-[1200px] mb-8 brand-bg opacity-80 px-6 p-8 md:py-12 md:px-10  mx-auto">
      <div className="w-full md:w-6/12 md:mx-auto">
        <h1 className="text-lg md:text-3xl  text-white pb-2">
          Subscribe To Our Newsletter
        </h1>

        <div className="flex flex-col md:flex-row   ">
          <div className="w-full md:w-8/12">
            <input
              className="w-full  px-2 py-2 rounded  mb-2 md:mb-0"
              type="text"
              placeholder="Enter your Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="md:ml-2">
            {" "}
            <button
              onClick={handelSubmit}
              className="bg-black rounded text-white px-3 py-2"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
