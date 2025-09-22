import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { FilterSidebar } from "./FilterSidebar";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import IconImag from '../assets/Business_SVG.svg'
import { toast } from "react-toastify";
import { Filter } from 'lucide-react';
import { useSelector } from "react-redux";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [originalFeed, setOriginalFeed] = useState([]); // Store original data
  const [swipeText, setSwipeText] = useState("");
  const [showSwipeText, setShowSwipeText] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const user = useSelector((store) => store.user);
  // console.log("in feed..........");
  // console.log(user);
  
  
  // Filter state
  const [filters, setFilters] = useState({
    skills: [],
    hackathons: '',
    graduationYears: []
  });

  const getFeed = async() => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      setFeed(res.data.feedData);
      setOriginalFeed(res.data.feedData); // Store original data
    } catch(err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  // Filter function
  const applyFilters = (feedData, currentFilters) => {
    return feedData.filter(user => {
      // Skills filter
      if (currentFilters.skills.length > 0) {
        const userSkills = user.skills || [];
        const hasMatchingSkill = currentFilters.skills.some(skill => 
          userSkills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        );
        if (!hasMatchingSkill) return false;
      }

      // Experience filter (you'll need to add hackathon count to your API data)
      if (currentFilters.hackathons) {
        const hackathonCount = user.hackathons.length > 0 || 0;
        switch(currentFilters.hackathons) {
          case 'beginner':
            if (hackathonCount !== 0) return false;
            break;
          case 'intermediate':
            if (hackathonCount < 1 || hackathonCount > 3) return false;
            break;
          case 'experienced':
            if (hackathonCount <= 3) return false;
            break;
        }
      }

      // Graduation year filter (you'll need to add graduation year to your API data)
      if (currentFilters.graduationYears.length > 0) {
        const userGradYear = user.gradYear;
        if (!userGradYear || !currentFilters.graduationYears.includes(parseInt(userGradYear))) {
          return false;
        }
      }

      return true;
    });
  };

  // Apply filters whenever filters change
  useEffect(() => {
    const filteredFeed = applyFilters(originalFeed, filters);
    setFeed(filteredFeed);
  }, [filters, originalFeed]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      skills: [],
      hackathons: '',
      graduationYears: []
    });
  };

  const handleSwipe = async (status, receiverId) => {
    try {
      const res = await axios.post(BASE_URL + `/reqs/send/${status}/${receiverId}`, {}, {withCredentials: true});
    } catch(err) {
      toast.error(err);
    }
    setFeed((prev) => prev.filter((user) => user._id !== receiverId));
    setOriginalFeed((prev) => prev.filter((user) => user._id !== receiverId));
  };

  const hasActiveFilters = filters.skills.length > 0 || filters.hackathons || filters.graduationYears.length > 0;

  return (
    <div className="relative max-h-screen h-[80vh]">
      {/* Filter Button - Left side on desktop, top on mobile */}
      <div className="fixed  left-4 z-40 md:top-20 md:left-4">
        <button
          onClick={() => setShowFilters(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors shadow-lg ${
            hasActiveFilters 
              ? 'bg-purple-600 border-purple-600 text-white' 
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Filter size={18} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="bg-white text-purple-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
              {filters.skills.length + (filters.hackathons ? 1 : 0) + filters.graduationYears.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Feed Content - Always Centered */}
      <div className="flex   min-h-screen pt-16 md:pt-0">
        <div className="w-96 mx-auto relative flex flex-col mt-5 items-center z-0 ">
          <AnimatePresence className="mx-auto">
            {feed.map((user, index) => (
              <div key={user._id} className="z-0 absolute flex justify-center mx-auto mt-5">
                {index === 0 && <UserCard user={user} onSwipe={handleSwipe} />}
              </div>
            ))}
          </AnimatePresence>
          
          {feed.length === 0 && (
            <div className="flex flex-col my-auto justify-items-center mt-20 items-center justify-center">
              <img src={IconImag} alt="No more users" />
              <h1 className="text-4xl mt-10 text-purple-500 font-bold text-center">
                {hasActiveFilters ? "No matches found" : "You've reached the end"}
              </h1>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
          
          {/* {feed.length > 0 && (
            <div className="flex items-center mb-10 justify-center space-x-4 text-white p-2 rounded-lg shadow-md">
              <span className="px-2 py-1 bg-gray-700 rounded">⬅️ Ignore</span>
              <span className="px-2 py-1 bg-gray-700 rounded">Interested ➡️</span>
            </div>
          )} */}
        </div>
      </div>

      {/* Filter Modal */}
      <FilterSidebar 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </div>
  );
}