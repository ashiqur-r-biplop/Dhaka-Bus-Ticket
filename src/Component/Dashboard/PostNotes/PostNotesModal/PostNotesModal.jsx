import React, { useContext, useEffect } from "react";
import img from "../../../../assets/Bus/bus5.png";
import axios from "axios";
const PostNotesModal = ({ control, setControl }) => {
  const handleNotes = (e) => {
    e.preventDefault();
    const notice = e.target.note_box.value;
    const createNoteDate = new Date().toDateString();
    const postedNote = {
      createNoteDate,
      notice,
    };
    axios
      .post("https://dhaka-bus-ticket-server-two.vercel.app/post-note", postedNote)
      .then((res) => {
        console.log(res.data?.insertedId);
        if (res.data?.insertedId) {
          setControl(!control);
          e.target.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div
          className="modal-box p-0 rounded-none relative"
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <form
            onSubmit={handleNotes}
            style={{
              backgroundColor: "rgba(0, 0, 0, .8)",
            }}
            className="p-10 text-white"
          >
            <h3 className="text-lg font-bold my-2">Add Notice</h3>
            <textarea
              name="note_box"
              id=""
              className="w-full px-2 py-2 bg-transparent text-white border focus:border-none focus:outline-[#FF4500]"
              placeholder="Write a Note"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="Submit"
              className="mt-5 border px-4 py-2"
            />
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default PostNotesModal;
