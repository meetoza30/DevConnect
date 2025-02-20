import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserReqCard from "./UserReqCard";

const Connections = () => {
  const [receivedReqs, setReceivedReqs] = useState([]);
  const [sentReqs, setSentReqs] = useState([]);
  const [showSent, setShowSent] = useState(false); // Toggle state

  // Fetch Received Requests
  const getReceivedReqs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/reqs/received`, { withCredentials: true });
      setReceivedReqs(res.data.reqs);
    } catch (err) {
      console.error(err);
    }
  };


  // Handle Request Review (Accept/Reject)
  const reviewReq = async (status, reqId) => {
    try {
      await axios.patch(`${BASE_URL}/reqs/review/${status}/${reqId}`, {}, { withCredentials: true });
      setReceivedReqs((prev) => prev.filter((req) => req._id !== reqId));
      setSentReqs((prev) => prev.filter((req) => req._id !== reqId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReceivedReqs();
    getSentReqs();
  }, []);

  return (
    
    <div className="flex flex-col items-center mx-5">
      <h1 className="text-xl font-semibold mb-4">Requests</h1>

      {/* Toggle Switch */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-sm ${!showSent ? "text-purple-600 font-bold" : "text-gray-400"}`}>
          Received
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showSent}
            onChange={() => setShowSent(!showSent)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
        <span className={`text-sm ${showSent ? "text-purple-600 font-bold" : "text-gray-400"}`}>
          Sent
        </span>
      </div>

      {/* Requests List */}
      <div className="flex flex-col justify-center items-center mx-5 max-w-lg w-full">
        {showSent
          ? sentReqs.map((req) => <UserReqCard showSent = {true} key={req._id} req={req} reviewReq={reviewReq}/>)
          : receivedReqs.map((req) => (
              <UserReqCard key={req._id} showSent = {false} req={req} reviewReq={reviewReq} />
            ))}
      </div>
    </div>
  );
};

export default Connections;
