
import { useState } from 'react';
import './Banner';

const TicketBookingSteps = () => {

     const [bgColor, setBgColor] = useState("select your bus");



    const steps = [
      {
        serial: 1,
        title: "select your bus",
        description: "Conquer your desire set to return home",
      },
      {
        serial: 2,
        title: "Booking & Confirm",
        description: "Conquer your desire set to return home",
      },
      {
        serial: 3,
        title: "Booking Payment",
        description: "Conquer your desire set to return home",
      },
      {
        serial: 4,
        title: "Start Your Trip",
        description: "Conquer your desire set to return home",
      },
    ];
    // console.log(steps)
    const handleHover = (title) => {
     setBgColor(title);
   };
  return (
    <div className="max-w-[1200px] mx-5 md:mx-auto">
      <div className=" w-full md:w-6/12 mx-auto my-6 text-center">
        <h1 className="capitalize font-thin pb-2">How it works!</h1>
        <h1 className="capitalize md:text-3xl brand-color">
          {" "}
          4 Steps to booking our bus
        </h1>
        <p className="text-sm pt-2 ">
          It's an easy way to get the expected ticket on expexted date with
          expexted bus
        </p>
      </div>
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 gap-x-6 gap-y-6 mb-8" >
        {steps.map((step, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(step?.title)}
            onMouseLeave={()=>handleHover("Booking & Confirm")}
            className={`group shadow-xl rounded-md md:py-8 md:px-4 ${
              bgColor === step?.title ? "first-child cursor-pointer" : ""
            }`}

          >
            <div className="childDiv mx-auto rounded-sm text-white text-center flex items-center justify-center w-[50px] h-[35px] md:h-[40px] my-4 bg-orange-500">
              <p>{step.serial}</p>
            </div>
            <h1 className="brand-color capitalize text-center pb-2 heading">
              {step.title}
            </h1>
            <p className="text-xs text-center px-2 py-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketBookingSteps;
