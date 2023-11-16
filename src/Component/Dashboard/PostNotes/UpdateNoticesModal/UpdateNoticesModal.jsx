import React from "react";
import img from "../../../../assets/Bus/bus16.png";
import axios from "axios";

const UpdateNoticesModal = ({ note, control, setControl }) => {
  const handleUpdateNotice = (e) => {
    e.preventDefault();
    const notice = e.target.note_box.value;
    const obj = {
      createNoteDate: note?.createNoteDate,
      notice,
      updateNoticeDate: new Date().toDateString(),
    };
    axios
      .patch(`https://dhaka-bus-ticket-server-two.vercel.app/update-notice/${note?._id}`, obj)
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          setControl(!control);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
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
            onSubmit={handleUpdateNotice}
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
              defaultValue={note?.notice}
            ></textarea>
            <input
              type="submit"
              value="Submit"
              className="mt-5 border px-4 py-2"
            />
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8">
          Close
        </label>
      </div>
    </div>
  );
};

export default UpdateNoticesModal;
