import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  // const [dupFeed, setDeupFeed] = useState();

  const getFeed = async()=>{
    try{
    const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
    // console.log(res.data)
    setFeed(res.data.feedData)
  }
  catch(err){
    console.log(err)
  }
  }
  useEffect(()=>{
    getFeed()
  }, [])

  console.log(feed)
  const handleSwipe = async (status, receiverId) => {
    console.log(`User ${receiverId} is ${status}`);
    try{
      const res = await axios.post(BASE_URL + `/reqs/send/${status}/${receiverId}`,{}, {withCredentials : true})
  } catch(err){
    console.log(err)
  }
    
    setFeed((prev) => prev.filter((user) => user._id !== receiverId));
  };

  return (
    <div className="relative flex justify-center items-center">
      <AnimatePresence>
        {feed.map((user, index) => (
          <div key={user._id} className="absolute flex justify-center ">
            {index === 0 && <UserCard user={user} onSwipe={handleSwipe} />}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
