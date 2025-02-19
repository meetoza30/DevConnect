import React from "react";
import { Link } from "react-router-dom";

const UserReqCard = ({ req, showSent, reviewReq}) => {
  const user = showSent ? req.receiverId : req.senderId;
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
        {showSent ? (
          // Withdraw Button for Sent Requests
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
            onClick={() => reviewReq("withdraw",req._id)}
          >
            Withdraw
          </button>
        ) : (
          // Accept/Reject Buttons for Received Requests
          <>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-lg"
              onClick={() => reviewReq("accepted", req._id)}
            >
              Accept
            </button>
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white py-1 px-3 rounded-lg"
              onClick={() => reviewReq("rejected", req._id)}
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserReqCard;
