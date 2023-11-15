import React, { useState } from "react";
import {
  BsFillShieldFill,
  BsFillTagsFill,
  BsFillAwardFill,
  BsFillClockFill,
  BsFillPhoneFill,
  BsFillPersonVcardFill,
} from "react-icons/bs";
const Services = () => {
  const [bgColor, setBgColor] = useState("Discount & Promo");
  const steps = [
    {
      serial: <BsFillShieldFill />,
      title: "Safety Guarantee",
      description: "Go to home safely conquer your desire set to return home",
    },
    {
      serial: <BsFillTagsFill />,
      title: "Discount & Promo",
      description: " Get the best deal conquer your desire set to return home",
    },
    {
      serial: <BsFillAwardFill />,
      title: "Professional Staff",
      description:
        "We are here professional bodies conquer your desire set to return home",
    },
    {
      serial: <BsFillClockFill />,
      title: "Schedule on Time",
      description:
        "We don't miss our schedule reach in time to destination Conquer your desire set to return home",
    },
    {
      serial: <BsFillPhoneFill />,
      title: "Online Booking",
      description:
        "we provide you the opportunity to get the bus online conquer your desire set to return office",
    },
    {
      serial: <BsFillPersonVcardFill />,
      title: "24/7 Support",
      description:
        "we are here 24/7 to help you Conquer your desire set to return destination",
    },
  ];
  const handleHover = (title) => {
    setBgColor(title);
  };
  return (
    <div className="max-w-[1200px] mx-5 md:mx-auto">
      <div className="w-full md:w-6/12 mx-auto my-6 text-center">
        <h1 className="capitalize font-thin pb-2">Services</h1>
        <h1 className="capitalize md:text-3xl brand-color">
          {" "}
          We give Best services you!
        </h1>
        <p className="text-sm pt-2">
          We are commited to provide you the best smooth and fair services.We
          never compromise with our quality
        </p>
      </div>
      <div className="grid items-center grid-cols-1 md:grid-cols-3 py-6 gap-x-8 gap-y-8 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(step?.title)}
            onMouseLeave={()=>handleHover("Discount & Promo")}
            className={`group shadow-xl rounded-md md:py-8 md:px-4 ${
              bgColor === step?.title ? "first-child cursor-pointer" : ""
            }`}
          >
            <div className="childDiv mx-auto rounded-sm text-white text-center flex items-center justify-center w-[50px] h-[40px] my-4 py-2 bg-orange-500">
              <p>{step.serial}</p>
            </div>
            <h1 className="brand-color capitalize text-center pb-2 heading">
              {step.title}
            </h1>
            <p className="text-xs text-center pb-3 px-3">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
