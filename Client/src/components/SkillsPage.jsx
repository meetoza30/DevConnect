import React, { useState } from 'react';

// Predefined skills list
const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript',
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex',
    username: 'alexdev',
    bio: 'Full Stack Developer | Open Source Enthusiast | Machine Learning Explorer',
    profilePic: 'https://via.placeholder.com/200', // Placeholder image URL
    socialProfiles: {
      leetcode: 'https://leetcode.com/alexdev',
      geeksforgeeks: 'https://geeksforgeeks.org/alexdev',
      codeforces: 'https://codeforces.com/profile/alexdev',
      github: 'https://github.com/alexdev',
      linkedin: 'https://linkedin.com/in/alexdev'
    },
    projects: [
      { name: 'AI Chatbot', description: 'AI-powered chatbot', githubLink: 'https://github.com/alexdev/ai-chatbot' }
    ],
    hackathons: [
      { name: 'Global AI Hackathon', description: 'Built an AI-powered chatbot', date: 'July 2023' }
    ],
    skills: ['React', 'Python', 'Machine Learning', 'Docker']
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleProfileUpdate = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleSkillChange = (skill) => {
    if (profile.skills.includes(skill)) {
      setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    } else {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Section */}
      <div className="w-full md:w-1/3 bg-purple-900/30 rounded-lg shadow-2xl p-6">
        <div className="flex flex-col items-center">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
          />
          {isEditMode && (
            <input
              type="text"
              value={profile.profilePic}
              onChange={(e) => handleProfileUpdate({ profilePic: e.target.value })}
              className="w-full p-2 border rounded mt-2 bg-gray-800 text-gray-100"
              placeholder="Enter Image URL"
            />
          )}
          <h2 className="text-2xl font-bold mt-4 text-purple-300">{profile.name}</h2>
          <p className="text-purple-500">@{profile.username}</p>
          {isEditMode ? (
            <textarea
              value={profile.bio}
              onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-gray-100 mt-2"
            ></textarea>
          ) : (
            <p className="text-center mt-2 text-gray-300">{profile.bio}</p>
          )}
        </div>

        {/* Coding Profiles */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-300">Coding Profiles</h3>
          <ul className="mt-2 space-y-2">
            {Object.entries(profile.socialProfiles).map(([platform, url]) => (
              <li key={platform}>
                <a href={url} className="text-purple-500 hover:underline">{platform}</a>
              </li>
            ))}
          </ul>
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
        {/* Skills Section */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-purple-300">Skills</h3>
          <div className="flex flex-wrap mt-2 gap-2">
            {SKILLS_LIST.map(skill => (
              <button
                key={skill}
                className={`px-3 py-1 rounded ${profile.skills.includes(skill) ? 'bg-purple-500' : 'bg-gray-700'}`}
                onClick={() => isEditMode && handleSkillChange(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-purple-300">Projects</h3>
          {profile.projects.map((project, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded">
              {!isEditMode ? (
                <>
                  <h4 className="font-bold text-purple-300">{project.name}</h4>
                  <p className="text-gray-400">{project.description}</p>
                  <a href={project.githubLink} className="text-purple-500 hover:underline">GitHub</a>
                </>
              ) : (
                <div>
                  <input type="text" value={project.name} onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[index].name = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                  }} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  <textarea value={project.description} onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[index].description = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                  }} className="w-full p-2 border rounded bg-gray-800 text-gray-100"></textarea>
                  <input type="text" value={project.githubLink} onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[index].githubLink = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                  }} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hackathon Journey */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-purple-300">Hackathon Journey</h3>
          {profile.hackathons.map((hackathon, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded">
              {!isEditMode ? (
                <>
                  <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
                  <p className="text-gray-400">{hackathon.description}</p>
                  <small className="text-purple-500">{hackathon.date}</small>
                </>
              ) : (
                <div>
                  <input type="text" value={hackathon.name} onChange={(e) => {
                    const newHackathons = [...profile.hackathons];
                    newHackathons[index].name = e.target.value;
                    setProfile({ ...profile, hackathons: newHackathons });
                  }} className="w-full p-2 border rounded bg-gray-800 text-gray-100" />
                  <textarea value={hackathon.description} onChange={(e) => {
                    const newHackathons = [...profile.hackathons];
                    newHackathons[index].description = e.target.value;
                    setProfile({ ...profile, hackathons: newHackathons });
                  }} className="w-full p-2 border rounded bg-gray-800 text-gray-100"></textarea>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
