import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from "axios"

// Predefined skills list
const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript',
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hackathonEdit, setHackathonEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Alex Rodriguez',
    username: 'alexdev',
    bio: 'Full Stack Developer | Open Source Enthusiast | Machine Learning Explorer',
    profilePic: '/api/placeholder/200/200',
    socialProfiles: {
      leetcode: 'https://leetcode.com/alexdev',
      geeksforgeeks: 'https://geeksforgeeks.org/alexdev',
      codeforces: 'https://codeforces.com/profile/alexdev',
      github: 'https://github.com/alexdev',
      linkedin: 'https://linkedin.com/in/alexdev'
    },
    projects: [
      // {
      //   name: 'AI Chatbot',
      //   description: 'Advanced conversational AI using transformer models',
      //   githubLink: 'https://github.com/alexdev/ai-chatbot'
      // }
    ],
    hackathons: [
      // {
      //   name: 'Global AI Hackathon',
      //   description: 'Built an AI-powered mental health support chatbot',
      //   date: 'July 2023'
      // }
    ],
    skills: ['React', 'Python', 'Machine Learning', 'Docker']
  });
const getProfile = async ()=>{
  const res = await axios.get(BASE_URL + "/profile/view", {withCredentials : true})
  console.log(res.data);
}
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleProfileUpdate = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleProjectUpdate = (index, updates) => {
    const newProjects = [...profile.projects];
    newProjects[index] = { ...newProjects[index], ...updates };
    setProfile(prev => ({ ...prev, projects: newProjects }));
  };

  const handleHackathonUpdate = (index, updates) => {
    const newHackathons = [...profile.hackathons];
    newHackathons[index] = { ...newHackathons[index], ...updates };
    setProfile(prev => ({ ...prev, hackathons: newHackathons }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: 'New Project', description: '', githubLink: '' }]
    }));
  };

  const removeProject = (indexToRemove) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addHackathon = () => {
    if(profile.hackathons.length  == 0) setHackathonEdit(!hackathonEdit)
    setProfile(prev => ({
      ...prev,
      hackathons: [...prev.hackathons, { name: 'New Hackathon', description: '', date: '' }]
    }));
  };

  const removeHackathon = (indexToRemove) => {
    setProfile(prev => ({
      ...prev,
      hackathons: prev.hackathons.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Section */}
      <div className="w-full md:w-1/3 bg-purple-900/30 rounded-lg shadow-2xl p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mt-4 text-purple-300">{profile.name}</h2>
          <p className="text-purple-500">@{profile.username}</p>
          <p className="text-center mt-2 text-gray-300">{profile.bio}</p>
        </div>
        <button 
          onClick={toggleEditMode} 
          className="mt-4 w-full p-2 bg-purple-700 text-white rounded hover:bg-purple-600"
        >
          {isEditMode ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 space-y-6">
        {/* Projects Section */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-purple-300">Projects</h3>
            {isEditMode || profile.projects.length >= 0 && (
              <button onClick={addProject} className="bg-purple-700 text-white px-3 py-1 rounded">Add Project</button>
            )}
          </div>
          {profile.projects.map((project, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded relative">
              {!isEditMode ? (
                <>
                  <h4 className="font-bold text-purple-300">{project.name}</h4>
                  <p className="text-gray-400">{project.description}</p>
                  <a href={project.githubLink} className="text-purple-500 hover:underline">View on GitHub</a>
                </>
              ) : (
                <div>
                  <input type="text" value={project.name} onChange={(e) => handleProjectUpdate(index, { name: e.target.value })} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  <textarea value={project.description} onChange={(e) => handleProjectUpdate(index, { description: e.target.value })} className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100"></textarea>
                  <input type="text" value={project.githubLink} onChange={(e) => handleProjectUpdate(index, { githubLink: e.target.value })} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  {profile.projects.length > 1 && (
                    <button onClick={() => removeProject(index)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hackathon Journey */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-purple-300">Hackathon Journey</h3>
            {hackathonEdit || profile.hackathons.length >= 0 && (
              <button onClick={addHackathon} className="bg-purple-700 text-white px-3 py-1 rounded">Add Hackathon</button>
            )}
          </div>
          {profile.hackathons.map((hackathon, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded relative">
              {hackathonEdit == false && (
                <>
                  <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
                  <p className="text-gray-400">{hackathon.description}</p>
                  <small className="text-purple-500">{hackathon.date}</small>
                </>
              ) }
              
              { (hackathonEdit == true && profile.hackathons.length >= 1) && 
                <div>
                  <input type="text" value={hackathon.name} onChange={(e) => handleHackathonUpdate(index, { name: e.target.value })} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  <textarea value={hackathon.description} onChange={(e) => handleHackathonUpdate(index, { description: e.target.value })} className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100"></textarea>
                  <input type="text" value={hackathon.date} onChange={(e) => handleHackathonUpdate(index, { date: e.target.value })} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  {profile.hackathons.length >= 1 && 
                    <button onClick={() => removeHackathon(index)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
                  }
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

