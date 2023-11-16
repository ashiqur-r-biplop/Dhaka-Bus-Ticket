import React from "react";
import SeatSelection from "./SeatSelection";
import BookTicket from "../../../Pages/Main/BookTicket/BookTicket";
import BTicket from "../../../Pages/Main/BookTicket/BTicket";

const BookTicketComponent = () => {
  return (
    <div className="grid mx-auto max-width-[1200px]">
      <BookTicket></BookTicket>
      {/* <BTicket></BTicket> */}
    </div>
  );
};

export default BookTicketComponent;
