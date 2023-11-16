 
 
 
import { useForm } from "react-hook-form";

const UpdateUserProfileModal = ({currentUser,}) => {
    
  console.log(currentUser);
  const { register, handleSubmit,  } = useForm();
  const onSubmit = data =>{ 
     console.log(data)

      



};




  
  return (
     <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="text-lg">Name:</p>
            <input
              {...register("name")}
              type="text"
              
              name="name"
              className="input input-bordered  w-full mb-2"
            />
          </div>
          <div>
            <p className="text-lg">Email:</p>
            <input
              {...register("email")}
              type="text"
              name="email" // Corrected the name attribute
              className="input input-bordered  w-full mb-2"
            />
          </div>
          <div>
            <p className="text-lg">Phone:</p>
            <input
              {...register("number")}
              type="number"
              name="number" // Corrected the name attribute
              className="input input-bordered  w-full mb-2"
            />
          </div>
          <input
            type="submit"
            value="Save"
            className="brand-btn w-full p-3 rounded-xl mt-2"
          />
        </form>
          <div className="modal-action">
            <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2"
            onClick={() => document.getElementById("my_modal_1").close()}>✕</button>
          </div>
        </div>
     </dialog>
  );
};

export default UpdateUserProfileModal;
