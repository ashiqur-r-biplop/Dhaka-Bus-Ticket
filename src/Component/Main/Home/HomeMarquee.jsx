import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const HomeMarquee = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const { NoticeControl } = useContext(AuthContext);
  useEffect(() => {
    axios("http://localhost:5000/notices")
      .then((res) => {
        setNotices(res.data)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [NoticeControl]);
  return (
    <div className="md:px-20 px-6 flex gap-2 bg-gray-950 py-6">
      <span className="brand-color font-bold">নোটিশঃ</span>
      <Marquee speed={90} delay={3}>
        <div className="">
          {notices.map((notice, i) => {
            return (
              <span className="text-white" key={i}>
                {notice?.notice}
              </span>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default HomeMarquee;
