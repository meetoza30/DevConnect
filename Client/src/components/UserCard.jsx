import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";

const UserCard = ({ user, onSwipe }) => {
  const swipe = async ()=>{
    await axios.post(BASE_URL + "")
  }
  const [x, setX] = useState();
  const navigate = useNavigate()
  return (
    <TinderCard className="absolute w-[400px] h-[80vh] mb-1 cursor-pointer flex justify-center items-center group"
  onSwipe={(dir) => onSwipe(dir)}
>
    <motion.div
      className="absolute w-[400px] h-[80vh] cursor-pointer flex justify-center items-center group"
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ x: x, y:100, opacity: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100) {
          onSwipe("interested", user._id);
          setX(200)
        } else if (info.offset.x < -100) {
          onSwipe("ignored", user._id);
          setX(-200)
        }
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Gradient backgrounds */}
      <div className="z-0 absolute inset-0 rounded-2xl bg-gradient-to-br mx-5 from-purple-700 to-pink-600" />
      <div className="z-0 absolute inset-0 bg-gradient rounded-2xl-to-br mx-5 from-purple-700 to-pink-600 blur-xl" />

      {/* Inner dark container */}
      <div className="absolute mx-5 rounded-2xl inset-[6px] bg-black/60 z-0" />

      {/* Content container */}
      <div className="absolute z-0 rounded-2xl w-full h-full flex flex-col items-center justify-center ">
        {/* Profile image */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white ">
          <img src={user?.profileUrl} alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Name and skills */}
        <div className="text-center mb-10">
          <h3 className="text-white font-medium text-3xl mb-4">{user?.firstName}</h3>
          <div className="flex flex-wrap flex-col justify-center gap-2 mt-4 max-w-sm">
            <span className="text-base text-white/80 underline">{user?.userName}</span>
            <h5 className=" text-lg text-white font-medium mb-4">
              {user?.bio ? <span>{user?.bio.slice(0,35)}...</span> : ""}</h5>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            {user?.skills && user?.skills.slice(0,6).map(skill => (
              <span 
              key={skill} 
              className=" text-purple-200 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
            ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 w-full flex justify-center gap-6 mt-2 mb-3">
          {/* Reject button */}
<button
  onClick={() => {
    onSwipe("ignore", user._id);
    setX(-200);
  }}
  className="relative w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
>
  {/* Tooltip */}
  <span className="absolute -top-7 px-3 py-1 text-sm bg-black text-white rounded-md opacity-0 transition-opacity group-hover:opacity-100">
    Ignore
  </span>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

{/* Accept button */}
<button
  onClick={() => {
    onSwipe("interested", user._id);
    setX(200);
  }}
  className="relative w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
>
  {/* Tooltip */}
  <span className="absolute -top-7 px-3 py-1 text-sm bg-black text-white rounded-md opacity-0 transition-opacity group-hover:opacity-100">
    Interested
  </span>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
</button>


              {/* View profile button */}
          <button
            onClick={() => navigate(`/profile/user/${user._id}`)}
            className="px-5 h-16 bg-black/20 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
           View Profile
          </button>
        </div>
      </div>
    </motion.div>
    </TinderCard>
  );
};

export default UserCard;
