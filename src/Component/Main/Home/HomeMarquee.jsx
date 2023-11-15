import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const HomeMarquee = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const { NoticeControl } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("https://dhaka-bus-ticket-server-two.vercel.app/notices")
      .then((res) => {
        setNotices(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <div className="md:px-20 px-6 flex gap-2 bg-gray-950 py-6">
      <span className="brand-color font-bold">নোটিশঃ</span>
      <Marquee speed={90} delay={3}>
        {notices.map((notice, i) => {
          return (
            <span className="text-white" key={i}>
              {notice?.notice}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
};

export default HomeMarquee;
