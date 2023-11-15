import React, { useEffect, useState } from 'react'

const AllTicket = () => {
  const [users, setUsers] = useState([]);
  const [allTicket, setAllTicket] = useState([]);

  useEffect(() => {
    fetch('https://dhaka-bus-ticket-server-two.vercel.app/all-ticket')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setAllTicket(data);
      })
  }, [])


  //search
  const handleChange = (e) => {
    const inputValue = e.target.value.toLowerCase();

    const filtered = users.filter((user) => {
      const nameIncludes = user.name.toLowerCase().includes(inputValue);
      const phoneIncludes = user.phone && user.phone.includes(inputValue);

      return nameIncludes || phoneIncludes;
    });

    setAllTicket(filtered);
  };
  // search 


  console.log(allTicket);
  if (!allTicket) {
    return <div className="flex justify-end items-center">
      <p className="text-center">Loading...</p>
    </div>
  }
  return (
    <div className="table w-full bg-orange-50">
      <div className="">
        <h1 className="text-center text-xl font-extrabold p-3">All Tickets Of</h1>
        <div className="flex items-center justify-center">
          <i className="brand-color text-3xl">Dhaka</i>
          <img className="h-6 ms-1 rounded-sm -me-1" src="https://i.ibb.co/qWzZ2NC/bus3.png" alt="" />
          <i className="brand-color  text-3xl">Ticket</i>
        </div>
      </div>
      <div>
        {/* ******************* serach ************** */}
      <div className="">
            <button className="brand-btn btn-block p-2  transition duration-75">
              Search Here:{" "}
              <input
                type="text"
                className="p-1 ps-2 rounded-full text-black "
                placeholder="Search"
                id="search"
                onChange={handleChange}
              />
            </button>
          </div>

          {/* *********************search ************** */}
      <div className="md:hidden">
        <table className="table w-full  flex table-sm">

          <tbody className="item-center">
            {allTicket.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "text-orange-800 bg-slate-300 flex flex-col" : "text-black bg-red-300 flex flex-col"
                }
              >
                <td className=" sm:text-xl flex"><span className='text-white sm:font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Name: </span>{user.name}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Email: </span>{user.email}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Phone: </span>{user.phone}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>BusType: </span>{user.busType}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Pick: </span>{user.pick}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Destination: </span>{user.to}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Schedule: </span>{user.schedule}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Date: </span>{user.bookedDate}</td>
                <hr className="font-bold border-2 border-white" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hidden md:block">
        <table className="table table-sm">
          {/* head */}
          <thead className=''>
            <tr className="md:text-sm lg:text-lg xl:text-2xl text-white bg-[#FF4500]">
              <th className="">Name</th>
              <th className="">Email&Number</th>
              <th className="">BusType</th>
              <th className="">Pick</th>
              <th className="">Destination</th>
              <th className="">Schedule</th>
              <th className="">Date</th>
              {/* <th className="text-xl md:text-2xl">Status</th> */}
            </tr>
          </thead>
          <tbody className="item-center">
            {allTicket.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "text-orange-800 bg-slate-300" : "text-black bg-red-300"
                }
              >

                <td className="">{user.name} </td>
                <td className="">{user.email}<br />{user.phone}</td>
                <td className="">{user.busType}</td>
                <td className="">{user.pick}</td>
                <td className="">{user.to}</td>
                <td className="">{user.schedule}</td>
                <td className="">{user.bookedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>

  )
}

export default AllTicket