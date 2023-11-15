import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SubscriberCount = () => {
  
  const [subscriberCount, setSubcriberCount] = useState(0);

  // useEffect(() => {
  //   // console.log("hello count");
  //   axios
  //     .get("")
  //     .then((res) => {
  //       console.log(res.data.count);
  //       setSubcriberCount(res.data.count);
  //     })
  //     .catch((err) => {
  //       console.log(err?.message);
  //     });
  // }, [subscribeControl]);

  // return { subscriberCount };
};
export default SubscriberCount;
