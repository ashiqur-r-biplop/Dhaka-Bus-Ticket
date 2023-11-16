import { useEffect } from "react";
import { useState } from "react";

const BTicket = () => {
  const [allDivisionAndDistrict, setAllDivisionAndDistrict] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [allBookedSeats, setAllBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [counter, setCounter] = useState(0); // To keep track of selected seats
  const [searchSeatFormData, setSearchSeatFormData] = useState({});

  useEffect(() => {
    fetch("divisions.json")
      .then((res) => res.json())
      .then((data) => setAllDivisionAndDistrict(data));
  }, []);

  useEffect(() => {
    fetch("allTickets.json")
      .then((res) => res.json())
      .then((data) => setAllTickets(data));
  }, []);

  console.log(allTickets);

  function setMinMaxDate() {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 2);

    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
      dateInput.setAttribute("min", currentDate.toISOString().split("T")[0]);
      dateInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
    }
  }
  setMinMaxDate();

  // Create a function to handle division selection
  const handleDivisionChange = (event) => {
    const selectedDivisionName = event.target.value;
    setSelectedDivision(selectedDivisionName);
    setSelectedDistrict("");
  };

  // Create a function to handle district selection
  const handleDistrictChange = (event) => {
    const selectedDistrictName = event.target.value;
    setSelectedDistrict(selectedDistrictName);
  };

  // 2D array representing all available seats on the bus
  const allSeats = [
    ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "I2", "J1", "J2"],
    ["A3", "A4", "B3", "B4", "C3", "C4", "D3", "D4", "E3", "E4", "F3", "F4", "G3", "G4", "H3", "H4", "I3", "I4", "J3", "J4"],
  ];

  const handleSearchSeat = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log("Selected Seats in handleSearchSeat:", selectedSeats);

    // Extract form values
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const date = form.date.value;
    const from = form.from.value;
    const to = form.to.value;
    const busType = form.busType.value;
    const pick = form.pick.value;
    const schedule = form.schedule.value;

    const formData = {
      name,
      email,
      phone,
      date,
      from,
      to,
      busType,
      pick,
      schedule,
      selectedSeats: selectedSeats, // Include selected seats in the form data
    };

    console.log("Form Data:", formData);

    // Filter available tickets based on form data
    const matchingTickets = allTickets.filter((ticket) => {
      return (
        ticket.date === date &&
        ticket.from === from &&
        ticket.to === to &&
        ticket.busType === busType &&
        ticket.schedule === schedule
      );
    });

    if (matchingTickets.length > 0) {
      console.log("Matching Tickets:", matchingTickets);

      // Collect all booked seats from matching tickets
      const allBookingSeats = matchingTickets.reduce((bookedSeats, ticket) => {
        return [...bookedSeats, ...ticket.bookedSeat];
      }, []);

      setAllBookedSeats(allBookingSeats);
      setSearchSeatFormData(formData); // Set formData in the state
      console.log("All Booked Seats:", allBookedSeats);
    } else {
      console.log("No matching tickets found.");
    }
  };

  // Function to handle seat selection
  const handleSeatSelect = (seat) => {
    if (!selectedSeats.includes(seat) && !allBookedSeats.includes(seat)) {
      const newSelectedSeats = [...selectedSeats, seat];
      setSelectedSeats(newSelectedSeats);
      setCounter(counter + 1);
      console.log("Updated selectedSeats (add):", newSelectedSeats);
    } else if (selectedSeats.includes(seat)) {
      const newSelectedSeats = selectedSeats.filter((seat) => seat !== seat);
      setSelectedSeats(newSelectedSeats);
      setCounter(counter - 1);
      console.log("Updated selectedSeats (remove):", newSelectedSeats);
    }
  }; 

  // Log the updated selectedSeats whenever it changes
  useEffect(() => {
    console.log("Updated selectedSeats:", selectedSeats);
  }, [selectedSeats]);

  // Function to handle booking a ticket
  const handleBookTicket = () => {
    console.log("Updated Form Data:", searchSeatFormData);
    // You can perform further actions, e.g., sending data to a server here
  };

  // Use useEffect to watch for changes in counter and searchSeatFormData
  useEffect(() => {
    if (counter > 0) {
      handleBookTicket();
    }
  }, [counter, searchSeatFormData]);

  const user = {
    name: "Aminul Islam",
    email: "aminul@gmail.com",
    phoneNumber: "01719006757",
  };

  return (
    <>
      <div className="mx-auto ">
        <div className="card bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fHww"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="max-w-[1200px] mx-auto mt-16">
              <div className="bg-orange-50 py-10">
                <h1 className="text-4xl lg:text-5xl font-bold m-6 md:m-16 brand-color text-center">Book Your Ticket</h1>
                <div className="grid md:grid-cols-2 gap-10  text-black rounded-lg">
                  <div>
                    <div className="p-6">
                      <form onSubmit={handleSearchSeat}>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold text-lg">Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            className="input input-bordered rounded-md border-orange-400"
                            defaultValue={user?.name}
                            disabled
                          />
                        </div>
                        <div className="form-control mb-2 mt-2">
                          <label className="label">
                            <span className="label-text font-semibold text-lg">Email</span>
                          </label>
                          <input
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            className="input input-bordered rounded-md border-orange-400"
                            defaultValue={user?.email}
                            disabled
                          />
                        </div>
                        <div className="form-control mb-2 mt-2">
                          <label className="label">
                            <span className="label-text font-semibold text-lg">Phone</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Phone Number"
                            name="phone"
                            className="input input-bordered rounded-md border-orange-400"
                            defaultValue={user?.phoneNumber}
                            disabled
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold text-lg">Journey Date</span>
                          </label>
                          <input
                            type="date"
                            placeholder="Date"
                            name="date"
                            className="input input-bordered rounded-md border-orange-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 ">
                          <div className="form-control ">
                            <label className="label">
                              <span className="label-text font-semibold text-lg mt-2">From</span>
                            </label>
                            <input
                              type="text"
                              placeholder="From"
                              defaultValue={"Dhaka"}
                              readOnly
                              name="from"
                              className="input input-bordered rounded-md border-orange-400"
                            />
                          </div>

                          <div className="form-control ">
                            <label className="label">
                              <span className="label-text font-semibold text-lg mt-2">Pick Point:</span>
                            </label>
                            <div className="input-group">
                              <select name="pick" className="select select-bordered border-orange-400 input-info rounded-md">
                                <option disabled selected>
                                  select Point
                                </option>
                                <option>Gabtoli Bus Terminal</option>
                                <option>Sayedabad Bus Terminal</option>
                                <option>Mohakhali Bus Terminal</option>
                                <option>Kalabagan Bus Stand</option>
                                <option>Jatrabari Bus Terminal</option>
                                <option>Gulistan Bus Terminal</option>
                                <option>Kallyanpur Bus Terminal</option>
                                <option>Arambagh Bus Terminal</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-semibold text-lg mt-2">To:</span>
                            </label>
                            <div className="input-group">
                              <select
                                name="division"
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                                className="select select-bordered border-orange-400 input-info rounded-md w-full mb-2"
                              >
                                <option value="" disabled>
                                  Select Division
                                </option>
                                {allDivisionAndDistrict.map((division, index) => (
                                  <option key={index} value={division.name}>
                                    {division.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {selectedDivision && (
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-semibold text-lg mt-2">Select District:</span>
                              </label>
                              <div className="input-group">
                                <select
                                  name="to"
                                  value={selectedDistrict}
                                  onChange={handleDistrictChange}
                                  className="select select-bordered border-orange-400 input-info rounded-md w-full mb-2"
                                >
                                  <option value="" disabled>
                                    Select District
                                  </option>
                                  {allDivisionAndDistrict
                                    .find((division) => division.name === selectedDivision)
                                    .districts.map((district, index) => (
                                      <option key={index} value={district}>
                                        {district}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          )}

                          {selectedDivision && selectedDistrict && (
                            <p>
                              Selected Division: {selectedDivision} <br />
                              Selected District: {selectedDistrict}
                            </p>
                          )}
                        </div>

                        <div className="form-control ">
                          <p className="label-text font-semibold text-lg mt-2 mb-2">Bus Type:</p>
                          <div className="input-group">
                            <select
                              name="busType"
                              className="select select-bordered border-orange-400 input-info w-full mb-2"
                            >
                              <option disabled selected>
                                select bus
                              </option>
                              <option>AC</option>
                              <option>Non-AC</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-control ">
                          <p className="label-text font-semibold text-lg mt-2">Schedule:</p>
                          <div className="input-group">
                            <select
                              name="schedule"
                              className="select select-bordered border-orange-400 input-info rounded-none w-full mb-2"
                            >
                              <option disabled selected>
                                select schedule
                              </option>
                              <option>07:00 AM</option>
                              <option>08:00 PM</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-control mt-6">
                          <button className="btn btn-block bg-orange-600 hover-bg-orange-700 text-white" type="submit">
                            Search Seat
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Seat Selection Part */}
                  <div className="bg-orange-50 py-10 flex justify-center items-start rounded-lg">
                    <div>
                      <h1 className="text-3xl font-extrabold brand-color text-center pb-8">Select Your Seat</h1>
                      <div className="flex justify-center items-center">
                        <div
                          style={{
                            height: "15px",
                            width: "15px",
                            backgroundColor: "red",
                          }}
                        ></div>
                        <h4 className="ms-4">Already Booked</h4>
                      </div>
                      <div className="flex justify-center items-center">
                        <div
                          style={{
                            height: "15px",
                            width: "15px",
                            backgroundColor: "rgb(252, 233, 85)",
                          }}
                        ></div>
                        <h4 className="ms-4">Available</h4>
                      </div>
                      {/* Render seat selection UI based on the availableSeats state */}
                      <div className="pt-10">
                        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:gap-20">
                          {allSeats.map((row, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6">
                              {row.map((seat, seatIndex) => (
                                <button
                                  key={seat}
                                  onClick={() => handleSeatSelect(seat)}
                                  className="w-10 h-10 mx-2 border border-orange-400 rounded-lg bg-yellow-400"
                                  style={{
                                    background:
                                      allBookedSeats.includes(seat) || allBookedSeats?.includes(seat)
                                        ? "orangered"
                                        : "rgb(252, 233, 85)",
                                  }}
                                  disabled={allBookedSeats?.includes(seat) ? true : false}
                                >
                                  {seat}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        {counter > 0 && (
                          <button onClick={handleBookTicket} className="btn btn-block brand-btn">
                            Book Ticket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BTicket;
