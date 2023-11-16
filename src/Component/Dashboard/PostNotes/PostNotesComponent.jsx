import React, { useContext, useEffect, useState } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import PostNotesModal from "./PostNotesModal/PostNotesModal";
import axios from "axios";
import UpdateNoticesModal from "./UpdateNoticesModal/UpdateNoticesModal";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const PostNotesComponent = () => {
  const [notices, setNotices] = useState([]);
  const { NoticeControl, setNoticeControl } = useContext(AuthContext);
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://dhaka-bus-ticket-server-two.vercel.app/notices")
      .then((res) => {
        setNotices(res.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, [NoticeControl]);
  console.log(notices);
  const handleDelete = (id) => {
    axios
      .delete(
        `https://dhaka-bus-ticket-server-two.vercel.app/delete-notice/${id}`
      )
      .then((res) => {
        if (res.data?.deletedCount > 0) {
          setNoticeControl(!NoticeControl);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = (id) => {
    const notice = notices.find((n) => n?._id == id);
    setNote(notice);
  };
  if (!loading) {
    return <>Loading....</>;
  }
  return (
    <>
      <div className="md:p-10 p-3 border w-full">
        <label
          htmlFor="my_modal_7"
          className="border px-3 py-1 flex items-center justify-center cursor-pointer"
        >
          <BsPlus></BsPlus> Add Notice
        </label>
        <div className="w-full">
          <div className="flex flex-col gap-5 mt-10">
            {notices?.map((n, i) => {
              const { notice, createNoteDate, _id } = n;
              return (
                <div key={i} className="border p-10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                    <span>{createNoteDate} :</span>{" "}
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-justify">{notice}</span>
                      <span className="flex gap-5">
                        <label
                          htmlFor="my_modal_8"
                          onClick={() => handleUpdate(_id)}
                          className="cursor-pointer"
                        >
                          <MdOutlineEdit></MdOutlineEdit>{" "}
                        </label>
                        <span
                          onClick={() => handleDelete(_id)}
                          className="cursor-pointer"
                        >
                          <BsTrash></BsTrash>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PostNotesModal
        setControl={setNoticeControl}
        control={NoticeControl}
      ></PostNotesModal>
      <UpdateNoticesModal
        control={NoticeControl}
        setControl={setNoticeControl}
        note={note}
      ></UpdateNoticesModal>
    </>
  );
};

export default PostNotesComponent;
