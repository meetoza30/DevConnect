import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";

const UserCard = ({ user, onSwipe }) => {
  const swipe = async () => {
    // Make sure to add your endpoint here
    await axios.post(BASE_URL + ""); 
  };
  const [x, setX] = useState();
  const navigate = useNavigate();

  return (
    <TinderCard
      className="absolute w-[400px] h-[80vh] mb-1 cursor-pointer flex justify-center items-center group"
    >
      <motion.div
        className="absolute w-[400px] h-[80vh] cursor-pointer flex justify-center items-center group"
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ x: x, y: 100, opacity: 0 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            onSwipe("interested", user._id);
            setX(200);
          } else if (info.offset.x < -100) {
            onSwipe("ignore", user._id);
            setX(-200);
          }
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Glowing background gradients - adapts to light/dark */}
        <div className="z-0 absolute inset-0 rounded-2xl bg-gradient-to-br mx-5 from-violet-400 to-fuchsia-400 dark:from-purple-700 dark:to-pink-600" />
        <div className="z-0 absolute inset-0 rounded-2xl mx-5 bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:from-purple-700 dark:to-pink-600 blur-xl opacity-70 dark:opacity-100" />

        {/* Inner container - Light violet glass in light mode, dark glass in dark mode */}
        <div className="absolute mx-5 rounded-2xl inset-[6px] bg-violet-50/95 dark:bg-black/80 backdrop-blur-sm z-0" />

        {/* Content container */}
        <div className="absolute z-0 rounded-2xl w-full h-full flex flex-col items-center justify-center pt-8">
          
          {/* Profile image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <img src={user?.profileUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Name and details */}
          <div className="text-center mb-6 mt-6">
            <h3 className="text-violet-950 dark:text-white font-bold text-3xl mb-2">{user?.firstName}</h3>
            
            <div className="flex flex-col justify-center gap-2 mt-2 max-w-sm px-6">
              <span className="text-base text-violet-600 dark:text-white/80 underline font-medium">@{user?.userName}</span>
              
              <h5 className="text-lg text-violet-800 dark:text-white/90 font-medium my-2 min-h-[1.75rem]">
                {user?.bio ? <span>{user?.bio.slice(0, 45)}...</span> : ""}
              </h5>
              
              {/* Skills Grid */}
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-7">
                {user?.skills && user?.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="bg-violet-200/70 text-violet-800 dark:bg-white/10 dark:text-purple-200 px-2 py-0.5 rounded-full text-sm font-medium border border-violet-300/50 dark:border-transparent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-6 w-full flex justify-center items-center gap-4 px-8">
            
            {/* Ignore button */}
            <button
              onClick={() => {
                onSwipe("ignore", user._id);
                setX(-200);
              }}
              className="relative w-14 h-14 bg-violet-200 dark:bg-black/40 rounded-full flex items-center justify-center text-violet-600 dark:text-white/50 hover:bg-violet-300 dark:hover:bg-black/60 hover:text-violet-900 dark:hover:text-white transition-all shadow-sm"
            >
              <span className="absolute -top-10 px-3 py-1 text-sm bg-gray-800 dark:bg-black text-white rounded-md opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                Ignore
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* View profile button */}
            <button
              onClick={() => navigate(`/profile/user/${user._id}`)}
              className="px-6 h-14 bg-violet-200 dark:bg-black/40 rounded-full flex items-center justify-center text-violet-800 dark:text-white/70 font-semibold hover:bg-violet-300 dark:hover:bg-black/60 hover:text-violet-950 dark:hover:text-white transition-all shadow-sm"
            >
              View Profile
            </button>

            {/* Interested button */}
            <button
              onClick={() => {
                onSwipe("interested", user._id);
                setX(200);
              }}
              className="relative w-14 h-14 bg-violet-200 dark:bg-black/40 rounded-full flex items-center justify-center text-violet-600 dark:text-white/50 hover:bg-violet-300 dark:hover:bg-black/60 hover:text-violet-900 dark:hover:text-white transition-all shadow-sm"
            >
              <span className="absolute -top-10 px-3 py-1 text-sm bg-gray-800 dark:bg-black text-white rounded-md opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                Interested
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </button>

          </div>
        </div>
      </motion.div>
    </TinderCard>
  );
};

export default UserCard;