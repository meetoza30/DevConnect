import React from "react";
import { Link } from "react-router-dom";

const UserConnecCard = ({user}) => {
  
  const { profileUrl, fullName, userName, bio, skills } = user;

  return (
    <div className="flex items-center justify-between bg-purple-700 text-white rounded-xl p-4 shadow-lg w-full mt-6 max-w-lg">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black">
            {profileUrl ? (
              <img src={profileUrl} alt="User" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-sm">User photo</span>
            )}
          </div>
    
          {/* User Info */}
          <div className="flex flex-col flex-grow ml-4">
            <Link to={`/profile/user/${user._id}`}>
              <h3 className="text-lg font-semibold">{fullName}</h3>
              <p className="text-sm text-gray-300">@{userName}</p>
            </Link>
            <p className="text-sm mt-1">
              {bio !== "Bio not available"
                ? bio
                : skills?.length > 0
                ? skills.slice(0, 3).join(", ") + (skills.length > 3 ? "..." : "")
                : ""}
            </p>
          </div>
    
          {/* Actions */}
          <div className="flex flex-col space-y-2">
          <Link
          to={`/profile/user/${user._id}`}
            className="bg-purple-200 text-black font-semibold hover:border-black hover:border-2 transition-all  py-1 px-3 rounded-lg ml-20"
            
          >
            View Profile
          </Link>
          </div>
        </div>
  );
};

export default UserConnecCard;
