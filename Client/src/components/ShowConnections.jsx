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
      setConnections(res.data.connections);
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    getConnections();
  }, []);

  console.log(connections)
  return (
    
    <div className="flex flex-col items-center justify-center mx-5">
      <h1 className="text-3xl mt-10 mb-10 font-bold text-white ">Your Connections</h1>

      {/* Requests List */}
      <div className="flex flex-col justify-center items-center my-10 mx-5 max-w-lg w-full">
      {connections.length > 0 ? connections.map((connec, index) => (
          <div key={index} className="absolute flex justify-center mx-5">
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
