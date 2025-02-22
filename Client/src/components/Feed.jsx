import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import IconImag from '../assets/Business_SVG.svg'
import { toast } from "react-toastify";
export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [swipeText, setSwipeText] = useState(""); // "Interested" or "Ignore"
const [showSwipeText, setShowSwipeText] = useState(false);

  // const [dupFeed, setDeupFeed] = useState();

  const getFeed = async()=>{
    try{
    const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
    
    setFeed(res.data.feedData)
  }
  catch(err){
    toast.error(err)
    
  }
  }
  useEffect(()=>{
    getFeed()
  }, [])

  
 
  const handleSwipe = async (status, receiverId) => {
    
    try{
     
      const res = await axios.post(BASE_URL + `/reqs/send/${status}/${receiverId}`,{}, {withCredentials : true})
      
  } catch(err){
    toast.error(err)
  }
    setFeed((prev) => prev.filter((user) => user._id !== receiverId));
  };

  return (
    <div className=" w-96 mx-auto relative flex flex-col justify-center items-center z-0 mt-3">
      <AnimatePresence className="mx-auto">
        {feed.map((user, index) => (
          <div key={user._id} className="z-0 absolute flex justify-center mx-auto mt-5">
            {index === 0 && <UserCard user={user} onSwipe={handleSwipe} />}
            
          </div>
        ))}
      </AnimatePresence>
      {feed.length == 0 && <div className="flex flex-col my-auto justify-items-center mt-20 items-center justify-center">
        <img src={IconImag} ></img>
        <h1 className="text-4xl mt-10  text-purple-500 font-bold text-center">You've reached the end</h1>
        </div>}
        {feed.length > 0 && <div className="flex items-center mb-10 justify-center space-x-4  text-white p-2 rounded-lg shadow-md">
      <span className="px-2 py-1 bg-gray-700 rounded">⬅️ Ignore</span>
      <span className="px-2 py-1 bg-gray-700 rounded">Interested ➡️</span>
      </div>}
    </div>
  );
}
