import React from "react";
import {
  BsFillBusFrontFill,
  BsFillAwardFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import {FaHandshake } from 'react-icons/fa';
import busF from "../../../assets/busF.jpg";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <div className=" w-full   mx-auto py-6 banner-content ">
      <div className="grid md:grid-cols-2 p-2 ">
        <div className="relative">
          <div className="">
            <img src={busF} className="w-full min-h-full opacity-[0.8] brightness-[0.8] " />
          </div>
          <div className="hidden md:block absolute rounded-md px-2 py-2 bottom-10  w-4/12 f-4/12 bg-orange-600 text-white ms-5">
            <h1>We Provide you Best Bus</h1>
            <p className="text-xs text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequatur, culpa?
            </p>
            <Link className="text-xs underline text-red-300" to="">
              View Bus
            </Link>
          </div>
        </div>
        <div className="bg-gray-800 p-4 md:p-6 w-full h-full">
          <p className="brand-color text-xl capitalize text-center">Why choose us</p>
          <h1 className="text-orange-600 mt-2 md:text-4xl  ">
            We are experts in bus charters company since 1989!
          </h1>
          <p className="text-gray-600 text-[24px] py-2 ">
            In this edition of our newsletter, we want to shine a spotlight on
            you, our valued customer. Your trust in our Company means the world
            to us, and we want to take a moment to celebrate your loyalty and
            support.
          </p>
          <div className="grid grid-cols-2 mt-4  ">
            <div className="">
              <div className="flex  gap-4 mb-3 md:mb-0 ms-5">
                <div className="flex items-center">
                  <BsFillBusFrontFill className="text-orange-700 text-3xl" />
                </div>
                <div>
                  <span className="text-xl md:text-3xl text-gray-600">40 +</span>
                  <p className="text-gray-600 text-xs">Buses Ready</p>
                </div>
              </div>
              <div className="flex md:mt-4 mb-3 md:mb-0 gap-4 ms-5">
                <div className="flex items-center">
                  <FaHandshake className="text-orange-700  text-3xl" />
                </div>
                <div>
                  <span className="text-xl md:text-3xl text-gray-600">340 +</span>
                  <p className="text-gray-600 text-xs">Booking Done</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex  gap-4 mb-3 md:mb-0 ms-5">
                <div className="flex items-center">
                  <BsFillAwardFill className="text-orange-700  text-3xl" />
                </div>
                <div>
                  <span className="text-xl md:text-3xl text-gray-600">2940 +</span>
                  <p className="text-gray-600 text-xs">Satisfied Customer</p>
                </div>
              </div>
              <div className="flex md:mt-4 gap-4 mb-3 md:mb-0 ms-5">
                <div className="flex items-center">
                  <BsFillPeopleFill className=" text-orange-700  text-3xl" />
                </div>
                <div>
                  <span className="text-xl md:text-3xl text-gray-600">20 +</span>
                  <p className="text-gray-600 text-xs">Professional Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
