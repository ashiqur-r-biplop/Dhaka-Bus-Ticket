import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const UserContact = () => {
     const [contacts, setContact] = useState([]);
     const [selectedContact, setSelectedContact] = useState(null);

     useEffect(()=>{
          //To Do :  server api 
          fetch("../../../public/Data/userContact.json")
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
     <div className="overflow-x-scroll">

          <table className="table table-zebra">
          {/* head */}
          <thead>
               <tr>
               <th>#</th>
               <th>Name</th>
               <th>Email</th>
               <th>Meetup Date</th>
               <th>Message</th>
               </tr>
          </thead>
          <tbody >
          {
          contacts?.map((ct, index) => (
          <tr key={index}
          className={
               index % 2 === 0
               ? "  bg-slate-200"
               : ""
          }
          >
               <td className="">{index+1}</td>
               <td className="md:font-semibold">{ct.name}</td>
               <td className="md:font-semibold">{ct.email}</td>
               <td className="md:font-semibold">{ct.meetupDate}</td>
               <td>
               <button onClick={() => handleViewClick(ct)}>View</button>
                    
               </td>
          </tr> 
          ))
          }
               
               
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