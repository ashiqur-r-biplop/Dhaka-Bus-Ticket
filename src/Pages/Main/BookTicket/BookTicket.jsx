import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import payment from "../../../assets/payment.png";
import { useNavigate } from "react-router";

const BookTicket = () => {
  const navigate = useNavigate();
  const loadUser = useContext(AuthContext);
  const { user } = loadUser;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [displaySelectSeat, setDisplaySelectSeat] = useState(false);
  console.log(selectedSeats)

  // *****************All District Information and functionality:
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedDivisionTo, setSelectedDivisionTo] = useState('Dhaka');
  const [fromDistrict, setFromDistrict] = useState('Dhaka');
  const districtData = {
    Dhaka: ["Dhaka", "Gazipur", "Tangail", "Munshiganj", "Narayanganj"],
    Chattogram: ["Chattogram", "Cox's Bazar", "Comilla", "Feni", "Noakhali"],
    Rajshahi: ["Rajshahi", "Bogra", "Pabna", "Naogaon", "Sirajganj"],
    Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Magura"],
    Barisal: ["Barisal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokathi"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rangpur: ["Rangpur", "Dinajpur", "Kurigram", "Lalmonirhat", "Thakurgaon"],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"]
  };
  const handleDivisionChangeFrom = (event) => {
    setSelectedDivision(event?.target?.value);
  };
  const handleDivisionChangeTo = (event) => {
    setSelectedDivisionTo(event.target.value);
  };

  // ****************Date Handle****************************
  const currentDate = new Date();

  // Set the time zone to Bangladesh Standard Time (BST)
  const options = { timeZone: 'Asia/Dhaka' };
  const currentDateInBangladesh = new Date(currentDate.toLocaleString('en-US', options));

  // Set the max date to 6 days ahead
  const maxDate = new Date(currentDateInBangladesh);
  maxDate.setDate(currentDateInBangladesh.getDate() + 6);


  // Load All Bus:
  const [control, setControl] = useState(false);

  const halfSeats1 = ["H4", "H3", "G4", "G3", "F4", "F3", "E4", "E3", "D4", "D3", "C4", "C3", "B4", "B3", "A4", "A3"];
  const halfSeats2 = ["H2", "H1", "G2", "G1", "F2", "F1", "E2", "E1", "D2", "D1", "C2", "C1", "B2", "B1", "A2", "A1"];

  // Handle Seat Selection:
  const [counter, setCounter] = useState(0);

  const handleSeatSelect = (seatNumber) => {
    const decision = selectedSeats?.includes(seatNumber);
    if (!decision) {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setCounter(counter + 1);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setCounter(counter - 1);
    }
  };

  // For Loading Seat:
  const [loadSeat, setLoadSeat] = useState(false);
  // Booked Ticket Using User Information:
  const [bookedTicketUsingUserInformation, setBookedTicketUsingUserInformation] = useState({});
  const handleData = (e) => {
    setSelectedSeats([]);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const date = form.date.value;
    const from = form.from.value;
    const to = form.to.value;
    // const quantity = form.quantity.value;
    const busType = form.busType.value;
    // const pick = form.pick.value;
    const schedule = form.schedule.value;

    const data = {
      name,
      email,
      phone,
      date,
      from,
      to,
      busType,
      schedule,
      bookedSeat: [],
      payment_status: "done",
      feedback: "pending",
    };
    console.log(data);

    setBookedTicketUsingUserInformation(data);
    const url = `http://localhost:5000/getSeat/${data?.from}&&${data?.to}&&${data?.date}&&${data?.busType}&&${data?.schedule}`;
    setLoadSeat(true)
    // Make the GET request
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setBookedSeat(data);
        if (data) {
          setDisplaySelectSeat(true)
          setLoadSeat(false)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // *****************Card Information**********************
  const amount = selectedSeats.length * 650;
  const [cardNumber, setCardNumber] = useState("");
  const [cardPass, setCardPass] = useState("");

  const handleCard = (e) => {
    setCardNumber(e.target.form.cardNumber.value);
    setCardPass(e.target.form.cardPass.value);
  };


  const handleBookTicket = () => {
    console.log(bookedTicketUsingUserInformation);
    if (cardNumber === "424242424242" && cardPass === "123456") {
      const newBookedSeat = selectedSeats;
      bookedTicketUsingUserInformation.bookedSeat = newBookedSeat;
      bookedTicketUsingUserInformation.payment = "done";
      bookedTicketUsingUserInformation.amount = amount;
      bookedTicketUsingUserInformation.bookedDate = new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
      console.log(bookedTicketUsingUserInformation);

      fetch("http://localhost:5001/book-ticket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookedTicketUsingUserInformation),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            setDisplaySelectSeat(false);
            setControl(!control);
            setCounter(0);
            Swal.fire({
              title: "Ticket Booked Successfully!",
              text: "",
              icon: "success",
              confirmButtonText: "Cool",
            });
            navigate("/my-ticket");
          }
          else {
            Swal.fire({
              title: "Something Went Wrong!",
              text: "",
              icon: "danger",
              confirmButtonText: "Cool",
            });
            navigate("/");
          }
        })
        .catch((err) => console.log(err));

      // Booked Seat and Post it with User Information:
      fetch("https://dhaka-bus-ticket-server-two.vercel.app/book-my-ticket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookedTicketUsingUserInformation),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.matchedCount > 0) {
            setDisplaySelectSeat(false);
            setControl(!control);
            setCounter(0);
            Swal.fire({
              title: "Ticket Booked Successfully!",
              text: "",
              icon: "success",
              confirmButtonText: "Thank You",
            });
            setCardNumber("");
            setCardPass("");
          }
        })
        .catch((err) => console.log(err));
    } else {
      return Swal.fire({
        title: "Card and Password doesn't match! Try again!",
        text: "",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
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
            <div className="max-w-[1200px] mx-auto mt-16 w-full">
              <div className="bg-orange-50 py-10">
                <h1 className="text-4xl lg:text-5xl font-bold m-6 md:m-16 brand-color text-center">Book Your Ticket</h1>
                <div className="grid md:grid-cols-2 gap-10  text-black rounded-lg">
                  <div>
                    <div className="p-6">
                      <form onSubmit={handleData}>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold text-lg">Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            className="input input-bordered rounded-md border-orange-400"
                            defaultValue={user?.displayName}
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
                            min={currentDate.toISOString().split("T")[0]} // Set min date to today
                            max={maxDate.toISOString().split("T")[0]} // Set max date to 3 days from today
                          />
                        </div>
                        <div className="border-dotted border-orange-400 border-2 p-2 my-2 rounded">
                          <div><h3 className="text-xl brand-color">From:</h3></div>
                          <div className="grid grid-cols-2 gap-2 ">
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text font-semibold text-lg">
                                  Select Division
                                </span>
                              </label>
                              <select className="input input-bordered rounded-md border-orange-400" id="divisionSelect" value={selectedDivision} onChange={handleDivisionChangeFrom}>
                                {Object.keys(districtData).map((division) => (
                                  <option key={division} value={division}>
                                    {division}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-control ">
                              <p className="label-text font-semibold text-lg mt-3 mb-1">
                                Select District:
                              </p>
                              <div className="input-group">
                                <select onChange={(e) => setFromDistrict(e.target.value)} name="from" className="select select-bordered border-orange-400 input-info rounded-md w-full mb-2" id="districtSelect">
                                  {districtData[selectedDivision].map((district) => (
                                    <option key={district} value={district}>
                                      {district}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-dotted border-orange-400 border-2 p-2 my-2 rounded">
                          <div><h3 className="text-xl brand-color">To:</h3></div>
                          <div className="grid grid-cols-2 gap-2 ">
                            <div className="form-control ">
                              <label className="label">
                                <span className="label-text font-semibold text-lg">
                                  Select Division
                                </span>
                              </label>
                              <select className="input input-bordered rounded-md border-orange-400" id="divisionSelect" value={selectedDivisionTo} onChange={handleDivisionChangeTo}>
                                {Object.keys(districtData).map((division) => (
                                  <option key={division} value={division}>
                                    {division}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-control ">
                              <p className="label-text font-semibold text-lg mt-3 mb-1">
                                Select District:
                              </p>
                              <div className="input-group">
                                <select name="to" className="select select-bordered border-orange-400 input-info rounded-md w-full mb-2" id="districtSelect">
                                  {districtData[selectedDivisionTo]?.filter(d => d != fromDistrict).map((district) => (
                                    <option key={district} value={district}>
                                      {district}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
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
                          <p className="label-text font-semibold text-lg mt-2">
                            Schedule:
                          </p>
                          <div className="input-group">
                            <select
                              name="schedule"
                              className="select select-bordered border-orange-400 input-info rounded-none w-full mb-2"
                            >
                              <option disabled selected>
                                select schedule
                              </option>
                              <option value="7:00 AM">7:00 AM</option>
                              <option value="8:00 AM">8:00 AM</option>
                              <option value="7:00 PM">7:00 PM</option>
                              <option value="8:00 PM">8:00 PM</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-control mt-6">
                          <input
                            className="btn btn-block bg-orange-600 hover:bg-orange-700 text-white"
                            type="submit"
                            value="Search Seat"
                            name=""
                            id=""
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Seat Selection Part */}
                  {loadSeat == true ? <div className="h-screen w-full flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div> :
                    <div className="bg-orange-50 py-10 flex justify-center items-center rounded-lg">
                      <div>
                        <h1 className="text-3xl font-extrabold brand-color text-center pb-8">
                          Select Your Seat
                        </h1>
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
                        {
                          <div className="grid grid-cols-2 mx-auto gap-x-14 mt-12">
                            {displaySelectSeat && (
                              <>
                                <div className="grid grid-cols-2">
                                  {halfSeats1?.map((seat) => (
                                    <button
                                      onClick={() => handleSeatSelect(seat)}
                                      className="btn m-2"
                                      style={{
                                        background:
                                          selectedSeats.includes(seat) ||
                                            bookedSeat?.includes(seat)
                                            ? "orangered"
                                            : "rgb(252, 233, 85)",
                                      }}
                                      disabled={
                                        bookedSeat?.includes(seat) ? true : false
                                      }
                                      key={seat}
                                    >
                                      {seat}
                                    </button>
                                  ))}
                                </div>
                                <div className="grid grid-cols-2 ">
                                  {halfSeats2?.map((seat) => (
                                    <button
                                      onClick={() => handleSeatSelect(seat)}
                                      className="btn mt-2 ms-2"
                                      style={{
                                        background:
                                          selectedSeats.includes(seat) ||
                                            bookedSeat?.includes(seat)
                                            ? "orangered"
                                            : "rgb(252, 233, 85)",
                                      }}
                                      disabled={
                                        bookedSeat?.includes(seat) ? true : false
                                      }
                                      key={seat}
                                    >
                                      {seat}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                            <div></div>
                          </div>
                        }

                        <div className="flex justify-center mt-4">
                          {counter > 0 && (
                            <button
                              className="btn btn-block brand-btn"
                              onClick={() =>
                                document.getElementById("my_modal_4").showModal()
                              }
                            >
                              Book Ticket
                            </button>
                          )}
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-8/12 md:w-3/12">
            <h3 className="font-bold text-xl  text-center p-2 brand-color underline">Please Pay Here</h3>
            <h3 className="font-bold text-lg text-center mt-3">
              Amount for {selectedSeats.length} Seat: <span className="brand-color">{amount}</span> BDT
            </h3>
            <h3 className="font-bold text-lg text-center pb-3">
              Seat Number:{" "}
              {selectedSeats.map((seat, index) => (
                <span className="brand-color" key={index}>
                  {seat}
                  {index < selectedSeats.length - 1 && " "} {/* Add a space after all elements except the last one */}
                </span>
              ))}
            </h3>
            <img src={payment} alt="" />
            <form onChange={handleCard}>
              <div className="form-control w-full m-2">
                <label className="label">
                  <span className="label-text">Enter Card Number</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4242 4242 4242"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full m-2">
                <label className="label">
                  <span className="label-text">Enter Password</span>
                </label>
                <input
                  type="text"
                  name="cardPass"
                  placeholder="123456"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </form>
            <div className="">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button onClick={handleBookTicket} className="btn btn-block brand-btn mt-2">
                  Pay
                </button>
                <button className="btn btn-block bg-black text-white mt-2 hover:bg-black hover:text-orange-500">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};
// Happy Birthday
export default BookTicket;
