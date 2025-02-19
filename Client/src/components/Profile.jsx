import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/constants.js'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Cookies from 'js-cookie'

const Profile = ()=>{
    const { userId } = useParams();
    const navigate = useNavigate();
    const [othersProfile, setOthersProfile] = useState(null);
    const [tempProjects, setTempProjects] = useState([]);
    const [tempHackathons, setTempHackathons] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) return navigate("/signin");

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/profile/user/${userId}`, { withCredentials: true });
                if (res.data) {
                    setOthersProfile(res.data);
                    setTempProjects(res.data.projects || []);
                    setTempHackathons(res.data.hackathons || []);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        
        fetchProfile();
    }, [userId, navigate]);

    console.log(othersProfile)
    return(
        
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Section (Left Sidebar) & SKills & Profiles - Unchanged */}
      <div className="w-full md:w-1/3  rounded-lg shadow-2xl p-6 transition-all duration-300 border border-purple-500">
        <div className="flex flex-col items-center">
          <div className="relative group flex flex-col justify-center items-center">
            <img 
              src={othersProfile?.profileUrl} 
              alt="Profile" 
              className="w-32 h-32 z-10 rounded-full object-cover border-4 border-purple-600"
            />
            {isEditMode && (
              <div className="profile-upload flex mt-2">
              {preview && <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full" />}
              <input type="file" className='text-purple-500' accept="image/*" onChange={handleFileChange} />
              <button className='bg-purple-500 px-2 py-1 rounded-lg' onClick={uploadProfilePic}>Upload</button>
            </div>
            )}
          </div>
          
          {!isEditMode ? (
            <>
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{othersProfile?.fullName}</h2>
              <p className="text-purple-500">@{othersProfile?.userName}</p>
              <p className="text-center mt-2 text-gray-300">{othersProfile?.bio}</p>
            </>
          ) : (
            <div className="w-full mt-4 space-y-3">
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{othersProfile?.fullName}</h2>
              <input 
                type="text" 
                value={othersProfile?.userName}
                onChange={(e) => handleProfileUpdate("userName", e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <textarea 
                value={othersProfile?.bio}
                onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                placeholder="Bio"
                className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          
        </div>
        {/* Coding & Social Profiles */}
       <div className=" rounded-lg shadow-2xl p-6 border mt-10 mb-5 border-purple-500 z-20">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Coding Profiles</h3>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isEditMode ? 'opacity-100' : 'opacity-90'}`}>
            {othersProfile?.socialIds && Object.entries(othersProfile?.socialIds).map(([platform]) => (
              <div key={platform} className="flex items-center space-x-2">
                {isEditMode ? (
                  <input 
                    type="text"
                    value={othersProfile?.socialIds[platform]}
                    onChange={(e) => handleSocialProfileUpdate(platform, e.target.value)}
                    placeholder={`${platform} Profile`}
                    className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                ) : othersProfile.socialIds[platform] && (
                  <a 
                    href={othersProfile.socialIds[platform].startsWith("http") ? othersProfile.socialIds[platform] : `https://${othersProfile.socialIds[platform]}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-1 underline hover:text-purple-400 transition-colors text-purple-200"
                  >
                    <span className="text-sm">{platform}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* ... (existing Skills Showcase section) */}

        <div className=" rounded-lg shadow-2xl p-6 border border-purple-500">
          
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Skills</h3>
          
          <div className="flex flex-wrap gap-2">
            {!isEditMode ? (
              othersProfile?.skills &&
              othersProfile?.skills?.map(skill => (
                <span 
                  key={skill} 
                  className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              SKILLS_LIST.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillsUpdate(skill)}
                  className={`
                    px-3 py-1 rounded-full text-sm transition-colors
                    ${othersProfile?.skills.includes(skill) 
                      ? 'bg-purple-700 text-white' 
                      : 'bg-gray-800 text-purple-400 hover:bg-purple-900'}
                  `}
                >
                  {skill}
                </button>
              ))
            )}
            
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 space-y-6">
       
        {/* Projects Section */}
        <div className="rounded-lg border border-purple-500 shadow-2xl p-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-bold text-purple-300">Project Journey</h3>
  </div>

  {(tempProjects?.length === 0) ? (
    <div className="flex flex-col items-center justify-center py-10 bg-purple-900/30 rounded">
      <p className="text-gray-400 mb-4">No projects added yet</p>
      
    </div>
  ) : (
    tempProjects.map((project) => (
      <div key={project._id} className="mb-4 bg-purple-900/30 mt-10 p-4 rounded relative">
        
          <>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-col'>
                <h4 className="font-bold text-purple-300">{project.title}</h4>
                <p className="text-gray-400">{project.description}</p>
                <a href={project.url} className="text-purple-300 cursor-pointer hover:underline">
                  View
                </a>
              </div>
            </div>
          </>
      </div>
    ))
  )}
</div>

        {/* Hackathon Journey */}
        <div className="border border-purple-500 rounded-lg shadow-2xl p-6"> 
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-purple-300">Hackathon Journey</h3>
    
  </div>

  {(tempHackathons?.length === 0) &&  (
    <div className="flex flex-col items-center justify-center py-10 bg-purple-900/30 rounded">
      <p className="text-gray-400 mb-4">No hackathons added yet</p>
      
    </div>
  )}
  {tempHackathons.length > 0 && tempHackathons.map((hackathon) => (
    <div key={hackathon._id} className="mb-4 mt-10 bg-purple-900/30  p-4 rounded-lg relative">
      
        
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
          <p className="text-gray-400">{hackathon.description}</p>
          <small className="text-purple-300">{hackathon.date}</small>
        </div>
        </div>
    </div>
  ))}
</div>

      </div>
    </div>
    )
}

export default Profile;