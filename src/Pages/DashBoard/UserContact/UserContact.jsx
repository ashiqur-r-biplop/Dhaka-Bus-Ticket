import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const UserContact = () => {
     const [contacts, setContact] = useState([]);
     const [selectedContact, setSelectedContact] = useState(null);
     // console.log(contacts, "123456789");

     useEffect(()=>{
          //To Do :  server api 
          fetch("http://localhost:5000/contact")
          .then(res=>res.json())
          .then(data=>setContact(data))
     },[])
     console.log(contacts);
     const handleViewClick = (contact) => {
          setSelectedContact(contact);
          const modal = document.getElementById("my_modal_1");
          modal.showModal();
        };
 
  return (
     <section className=" md:max-w-[1200px] md:mx-auto">
     
     <div className="md:hidden">
            <table className="table  table-sm">

              <tbody className="item-center">
                {contacts.map((user, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "text-orange-800 bg-slate-300 flex flex-col" : "text-black bg-red-300 flex flex-col"
                    }
                  >
                    <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Name: </span>{user.name}</td>
                    <hr className="font-bold" />
                    <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Email: </span>{user.email}</td>
                    <hr className="font-bold" />
                    <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Number: </span>{user.number}</td>
                    <hr className="font-bold" />
                    <td className="sm:text-xl flex"><span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>City: </span>{user.city}</td>
                    <hr className="font-bold" />
                    <td className="sm:text-xl flex">
                         <span className='text-white font-bold w-[30%] bg-orange-600 flex items-center justify-center -my-2 me-3'>Message: </span>
                         <button onClick={() => handleViewClick(user)}>View</button>
                         </td>
                    <hr className="font-bold border-2 border-white" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="hidden md:block">
            <table className="table md:w-full my-2">
              {/* head */}
              <thead>
                <tr className="text-xl md:text-2xl text-white bg-[#FF4500]">
                  <th>Name</th>
                  <th>Email </th>
                  <th className="">Number</th>
                  <th className="">City</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody className="item-center">
                {contacts.map((user, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "text-orange-800 bg-slate-300" : "text-black bg-red-300"
                    }
                  >
                    <td className="md:flex md:items-center md:gap-2">
                      <span className="font-bold md:text-sm">{user.name}</span>
                    </td>
                    <td className="font-semibold">{user.email} </td>
                    <td className="md:font-semibold">{user.number}</td>
                    <td className="md:font-semibold">{user.city}</td>
                    <td className="md:font-semibold font-medium">
                    <button onClick={() => handleViewClick(user)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


{/* modal */}

     <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          
          {selectedContact && (
            <div>
             <h2 className="md:text-xl font-bold">{selectedContact.name} Contact With You</h2>
             <p>{selectedContact.message}</p>
            </div>
          )}
          <div className="modal-action">
            <button onClick={() => document.getElementById("my_modal_1").close()}>Close</button>
          </div>
        </div>
     </dialog>


    </section>
  )
}

export default UserContact