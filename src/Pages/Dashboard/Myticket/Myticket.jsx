import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Myticket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  console.log(user.email);
  useEffect(() => {
    fetch(`https://dhaka-bus-ticket-server-two.vercel.app/my-ticket/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(true);
        setFilteredTickets(data);
      });
  }, [user]);
  //   some change
  if (!loading) {
    return <p className="flex justify-center">Loading...</p>;
  }
  console.log(tickets);

  const handleChange = (e) => {
    const inputValue = e.target.value.toLowerCase();

    const filtered = tickets.filter((user) => {
      const nameIncludes = user.name.toLowerCase().includes(inputValue);
      const phoneIncludes = user.phone && user.phone.includes(inputValue);

      return nameIncludes || phoneIncludes;
    });

    setFilteredTickets(filtered);
  };

  return (
    <div className="w-full  my-5 ">

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
      
      {/* search options ends here */}
      <div className="md:hidden">
        <table className="table w-full  flex table-sm">
          <tbody className="">
            {filteredTickets.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "text-orange-800 bg-slate-300 flex flex-col"
                    : "text-black bg-red-300 flex flex-col"
                }
              >
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Name: </span>{user.name} </td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Email: </span>{user.email}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Phone: </span>{user.phone}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>BusType: </span>{user.busType}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Destination: </span>{user.to}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Schedule: </span>{user.schedule}</td>
                <hr className="font-bold" />
                <td className="sm:text-xl flex"><span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Date: </span>{user.bookedDate}</td>
                <hr className="font-bold border-2 border-white" />
                {/* <Link to="/user-feedback"></Link> */}
                <td className="sm:text-xl flex">
                  <span className='text-white font-bold w-[40%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Feedback: </span>{user.feedbackSent ? (
                    <>
                      <button
                        disabled
                        className="bg-orange-300 md:px-3 px-2 md:py-2 py-1 rounded"
                      >
                        Feedback
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/user-feedback" state={`${user._id}`}>
                        <button className="brand-btn md:px-3 px-2 md:py-2 py-1 rounded">
                          Feedback
                        </button>
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden md:block">
        <table className="table w-full  table-sm">
          {/* head */}
          <thead>
            <tr className="md:text-lg lg:text-2xl text-white border border-white bg-[#FF4500]">
              <th className=" ">Name</th>
              <th className=" ">Email&Number</th>
              <th className=" ">BusType</th>
              <th className=" ">Destination</th>
              <th className=" ">Schedule</th>
              <th className=" ">Date</th>
              <th className="">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "text-orange-800 bg-slate-300"
                    : "text-black bg-red-300"
                }
              >
                <td className="">{user.name} </td>

                <td className="">
                  {user.email}
                  <br />
                  {user.phone}
                </td>
                <td className="">{user.busType}</td>
                <td className="">{user.to}</td>
                <td className="">{user.schedule}</td>
                <td className="">{user.bookedDate}</td>
                {/* <Link to="/user-feedback"></Link> */}
                <td>
                  {user.feedbackSent ? (
                    <>
                      <button
                        disabled
                        className="bg-orange-300 md:px-3 px-2 md:py-2 py-1 rounded"
                      >
                        Feedback
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/user-feedback" state={`${user._id}`}>
                        <button className="brand-btn md:px-3 px-2 md:py-2 py-1 rounded">
                          Feedback
                        </button>
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myticket;