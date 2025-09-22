import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserConnecCard from "./UserConnecCard";

const ShowConnections = () => {
  const [connections, setConnections] = useState([]);
  
  
  // Fetch Received Requests
  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
      // console.log(res.data.connections);
      setConnections(res.data.connections);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);


  return (
    
    <div className="flex flex-col items-center justify-center mx-5 mb-5">
      <h1 className="text-3xl mt-10 mb-10 font-bold text-white ">Your Connections</h1>

      {/* Requests List */}
      <div className=" lg:grid lg:grid-cols-2 lg:gap-4  sm:grid-cols-1 justify-center items-center">
      {connections.length > 0 ? connections.map((connec, index) => (
          <div key={index} className="flex justify-center mx-5">
            {<UserConnecCard user = {connec} />}
            
          </div>
        ))
        : <div className="text-purple-500 text-2xl font-bold text-center md:w-26 items-center lg:w-66 mt-10">
        Nothing to show here. Explore & send reqs to other users.
      </div>
      
        }
          
      </div>
    </div>
  );
};

export default ShowConnections;
