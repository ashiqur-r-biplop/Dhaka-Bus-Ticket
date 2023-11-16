import React, { useContext, useRef, useState } from "react";
import BusRoute from "../../../Shared/BusRoute/BusRoute";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import payment from '../../../assets/payment.png'


const BookBusComponent = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7); // Calculate 7 days ahead of the current date
  const maxDateFormatted = maxDate.toISOString().split('T')[0];
  const loadUser = useContext(AuthContext);
  const user = loadUser.user;
  const { displayName, email } = user;
  const modalRef = useRef(null);

  // *****************Card Information**********************
  const [cardNumber, setCardNumber] = useState('');
  const [cardPass, setCardPass] = useState('');
  const [totalBus, setTotalBus] = useState(0);
  const amount = totalBus ? parseInt(totalBus) * 50000 : 1 * 50000;


  const handleCard = e => {
    setCardNumber(e.target.form.cardNumber.value);
    setCardPass(e.target.form.cardPass.value);
    // modalRef.current.showModal();
  }

  // *********Handle Modal****************************
  const [bookBusData, setBookBusData] = useState({});
  const [journeyDate, setJourneyDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const handleModal = (e) => {
    e.preventDefault()
    const form = e.target;
    // const returnDate = form.returnDate.value;
    const busType = form.busType.value;
    const originCity = form.originCity.value;
    const destinationCity = form.destinationCity.value;
    const seats = form.seats.value;
    const buses = form.buses.value;
    const email = form.email.value;
    const name = form.name.value;
    const phone = form.phone.value;
    const companyName = form.companyName.value;
    const address = form.address.value;
    const optionalPhone = form.optional_phone.value;
    const data = {
      journeyDate,
      email,
      returnDate,
      busType,
      originCity,
      destinationCity,
      seats,
      optionalPhone,
      buses,
      name,
      phone,
      companyName,
      address,
      payment: "success",
      amount: amount
    };
    setBookBusData(data)
    if (data) {
      document.getElementById('my_modal_4').showModal();
    }
  };


  // *****************Book Bus Post Data*********************
  const handleData = (information) => {
    console.log(cardNumber);
    console.log(information);
    if (cardNumber == "424242424242" && cardPass == "123456") {

      // ********Book Bus Post Method****************
      fetch('https://dhaka-bus-ticket-server-two.vercel.app/book-bus', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(information)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              title: "Booked Bus Successfully!",
              text: "",
              icon: "success",
              confirmButtonText: "Thank You",
            });
          }

        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      return Swal.fire({
        title: "Card and Password doesn't match! Try again!",
        text: "",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }

  };

  if (!user) {
    return <p>Loading</p>
  }

  return (
    <div className="mt-24 container mx-auto">
      <div className="md:mx-20 p-10 mb-6 bg-orange-50 shadow-xl text-black rounded-lg">
        {/* <p className="text-sm">NB:All(*)marks are required field.</p> */}
        <h1 className="text-4xl mt-3 text-center brand-color pb-8">Journey Details</h1>
        <hr />
        <br />
        <form onSubmit={handleModal}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Date of Journey
                </span>
              </label>
              <input
                onChange={e => setJourneyDate(e.target.value)}
                type="date"
                placeholder="Pick date"
                name="journeyDate"
                className="input input-bordered h-10 rounded-md border-gray-300"
                min={currentDate} // Set the minimum date to the current date
                max={maxDateFormatted} // Set the maximum date to 7 days ahead of the current date
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Date of Return
                </span>
              </label>
              <input
                onChange={e => setReturnDate(e.target.value)}
                type="date"
                placeholder="Pick date"
                name="journeyDate"
                className="input input-bordered h-10 rounded-md border-gray-300"
                min={currentDate} // Set the minimum date to the current date
                max={maxDateFormatted} // Set the maximum date to 7 days ahead of the current date
                required
              />
            </div>
            <div>
              <div className="form-control">
                <p className="label-text font-bold mt-3 mb-1 text-gray-500">
                  Bus Type:
                </p>
                <div className="input-group">
                  <select
                    name="busType"
                    className="h-10 border border-gray-300 input-info w-full mb-2"
                  >
                    <option disabled selected>
                      select bus
                    </option>
                    <option>AC</option>
                    <option>NON AC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Origin City ( with Boarding Point ){" "}
                </span>
              </label>
              <input
                type="text"
                placeholder="Dhaka"
                defaultValue="Dhaka"
                disabled
                name="originCity"
                className="input input-bordered rounded-md h-10 border-gray-300"
                required
              />
            </div>
            <div className="form-control ">
              <p className="label-text font-bold mt-3 mb-1 text-gray-500">
                Destination City ( with Dropping Point )
              </p>
              <div className="input-group">
                <select
                  name="destinationCity"
                  className="h-10 border border-gray-300 input-info rounded-md w-full mb-2"
                >
                  <option disabled selected>
                    Select Point
                  </option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Khulna</option>
                  <option>Rajshahi</option>
                  <option>Barishal</option>
                  <option>Sylhet</option>
                  <option>Rangpur</option>
                  <option>Mymensingh</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Phone Number(Optional)
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                name="optional_phone"
                className="input input-bordered h-10 rounded-md border-gray-300"
              />
            </div>

            <div className="form-control ">
              <p className="label-text font-bold mt-3 mb-1 text-gray-500">
                No. of seats in bus{" "}
              </p>
              <div className="input-group">
                <select
                  name="seats"
                  className="h-10 border border-gray-300 input-info rounded-none w-full mb-2"
                >
                  <option disabled selected>
                    Number of Seat
                  </option>
                  <option>34 seats</option>
                  <option>36 seats</option>
                  <option>42 seats</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  No. of buses required{" "}
                </span>
              </label>
              <input
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10); // Parse input value as an integer
                  const nonNegativeValue = Math.max(1, inputValue); // Ensure the value is at least 1
                  setTotalBus(nonNegativeValue); // Update state with the non-negative value
                }}
                type="number"
                placeholder=""
                name="buses"
                className="input input-bordered rounded-md h-10 border-gray-300"
                min="1" // Set the minimum allowed value to 1
                required
              />
            </div>
          </div>

          <h1 className="text-4xl mt-8 text-center brand-color py-7">Contact Details</h1>
          <hr />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-7">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Contact Person Name
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                defaultValue={displayName}
                disabled
                name="name"
                className="input input-bordered rounded-md border-gray-300 h-10"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Mobile No.
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                name="phone"
                className="input input-bordered rounded-md border-gray-300 h-10"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Email
                </span>
              </label>
              <input
                defaultValue={email}
                disabled
                type="email"
                placeholder=""
                name="email"
                className="input input-bordered rounded-md border-gray-300 h-10"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Company Name
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                name="companyName"
                className="input input-bordered rounded-md border-gray-300 h-10"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500">
                  Address
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                name="address"
                className="input input-bordered rounded-md border-gray-300 h-10"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6 items-end">
            <button type="submit" className="btn btn-block brand-btn">Book Bus Reserve</button>
          </div>
        </form>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-8/12 md:w-3/12">
          <h3 className="text-xl font-bold text-center p-2 brand-color underline">Please Pay Here</h3>
          <h3 className="text-lg font-bold text-center mt-3">Total Bus: <span className="brand-color">{totalBus}</span> </h3>
          <h3 className="text-lg font-bold text-center">Amount: <span className="brand-color">{amount}</span> </h3>

          <img src={payment} alt="" />
          <form onChange={handleCard}>
            <div className="form-control w-full m-2">
              <label className="label">
                <span className="label-text">Enter Card Number</span>
              </label>
              <input type="text" name="cardNumber" placeholder="4242 4242 4242" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full m-2">
              <label className="label">
                <span className="label-text">Enter Password</span>
              </label>
              <input type="text" name="cardPass" placeholder="123456" className="input input-bordered w-full max-w-xs" />
            </div>
          </form>
          <div className="">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                onClick={() => handleData(bookBusData)}
                className="btn btn-block brand-btn mt-2" ref={modalRef}
              >Pay</button>
              <button className="btn btn-block bg-black text-white mt-2 hover:bg-black hover:text-orange-500">Close</button>
            </form>
          </div>
        </div>
      </dialog >
      <BusRoute></BusRoute>
    </div >
  )
};

export default BookBusComponent;
