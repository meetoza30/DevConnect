import React, { useState } from 'react';

// Predefined skills list
const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
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
      {
        name: 'AI Chatbot',
        description: 'Advanced conversational AI using transformer models',
        githubLink: 'https://github.com/alexdev/ai-chatbot'
      },
      {
        name: 'E-Commerce Platform',
        description: 'Scalable microservices-based online shopping solution',
        githubLink: 'https://github.com/alexdev/ecommerce-platform'
      },
      {
        name: 'Weather Forecast App',
        description: 'Real-time weather tracking with predictive analytics',
        githubLink: 'https://github.com/alexdev/weather-app'
      }
    ],
    hackathons: [
      {
        name: 'Global AI Hackathon',
        description: 'Built an AI-powered mental health support chatbot',
        date: 'July 2023'
      }
    ],
    skills: ['React', 'Python', 'Machine Learning', 'Docker']
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleProfileUpdate = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleSocialProfileUpdate = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialProfiles: {
        ...prev.socialProfiles,
        [platform]: value
      }
    }));
  };

  const handleProjectUpdate = (index, updates) => {
    const newProjects = [...profile.projects];
    newProjects[index] = { ...newProjects[index], ...updates };
    setProfile(prev => ({ ...prev, projects: newProjects }));
  };

  const handleSkillsUpdate = (skill) => {
    setProfile(prev => {
      const currentSkills = prev.skills;
      const updatedSkills = currentSkills.includes(skill)
        ? currentSkills.filter(s => s !== skill)
        : [...currentSkills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Section (Left Sidebar) */}
      <div className="w-full md:w-1/3 bg-purple-900/30 rounded-lg shadow-2xl p-6 transition-all duration-300 border border-purple-700/50">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img 
              src={profile.profilePic} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
            />
            {isEditMode && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white">Upload</span>
              </div>
            )}
          </div>
          
          {!isEditMode ? (
            <>
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{profile.name}</h2>
              <p className="text-purple-500">@{profile.username}</p>
              <p className="text-center mt-2 text-gray-300">{profile.bio}</p>
            </>
          ) : (
            <div className="w-full mt-4 space-y-3">
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                placeholder="Full Name"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <input 
                type="text" 
                value={profile.username}
                onChange={(e) => handleProfileUpdate({ username: e.target.value })}
                place
                
                holder="Username"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <textarea 
                value={profile.bio}
                onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
                placeholder="Bio"
                className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
        </div>
        <button 
          onClick={toggleEditMode} 
          className="mt-4 w-full flex items-center justify-center p-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors"
        >
          {isEditMode ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Right Section Container */}
      <div className="w-full md:w-2/3 space-y-6">
        {/* Coding & Social Profiles */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6 border border-purple-700/50">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Coding Profiles</h3>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isEditMode ? 'opacity-100' : 'opacity-90'}`}>
            {Object.entries(profile.socialProfiles).map(([platform, link]) => (
              <div key={platform} className="flex items-center space-x-2">
                {isEditMode ? (
                  <input 
                    type="text"
                    value={link}
                    onChange={(e) => handleSocialProfileUpdate(platform, e.target.value)}
                    placeholder={`${platform} Profile`}
                    className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                ) : (
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center hover:text-purple-400 transition-colors text-purple-500"
                  >
                    <span className="text-sm">{platform}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6 border border-purple-700/50">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Projects</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {profile.projects.map((project, index) => (
              <div 
                key={project.name} 
                className="border rounded p-4 bg-gray-800 border-purple-700 hover:shadow-lg transition-shadow"
              >
                {!isEditMode ? (
                  <>
                    <h4 className="font-bold mb-2 text-purple-300">{project.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:underline flex items-center"
                    >
                      View on GitHub
                    </a>
                  </>
                ) : (
                  <div className="space-y-2">
                    <input 
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectUpdate(index, { name: e.target.value })}
                      placeholder="Project Name"
                      className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                    />
                    <textarea 
                      value={project.description}
                      onChange={(e) => handleProjectUpdate(index, { description: e.target.value })}
                      placeholder="Project Description"
                      maxLength={200}
                      className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                    />
                    <input 
                      type="text"
                      value={project.githubLink}
                      onChange={(e) => handleProjectUpdate(index, { githubLink: e.target.value })}
                      placeholder="GitHub Link"
                      className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Journey */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6 border border-purple-700/50">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Hackathon Journey</h3>
          {profile.hackathons.map((hackathon, index) => (
            <div key={hackathon.name} className="mb-4 bg-gray-800 p-4 rounded">
              {!isEditMode ? (
                <>
                  <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
                  <p className="text-gray-400">{hackathon.description}</p>
                  <small className="text-purple-500">{hackathon.date}</small>
                </>
              ) : (
                <div className="space-y-2">
                  <input 
                    type="text"
                    value={hackathon.name}
                    onChange={(e) => {
                      const newHackathons = [...profile.hackathons];
                      newHackathons[index].name = e.target.value;
                      handleProfileUpdate({ hackathons: newHackathons });
                    }}
                    placeholder="Hackathon Name"
                    className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                  <textarea 
                    value={hackathon.description}
                    onChange={(e) => {
                      const newHackathons = [...profile.hackathons];
                      newHackathons[index].description = e.target.value;
                      handleProfileUpdate({ hackathons: newHackathons });
                    }}
                    placeholder="Hackathon Description"
                    className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                  <input 
                    type="text"
                    value={hackathon.date}
                    onChange={(e) => {
                      const newHackathons = [...profile.hackathons];
                      newHackathons[index].date = e.target.value;
                      handleProfileUpdate({ hackathons: newHackathons });
                    }}
                    placeholder="Month/Year"
                    className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Skills Showcase */}
        <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6 border border-purple-700/50">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {!isEditMode ? (
              profile.skills.map(skill => (
                <span 
                  key={skill} 
                  className="bg-purple-700/30 text-purple-300 px-3 py-1 rounded-full text-sm"
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
                    ${profile.skills.includes(skill) 
                      ? 'bg-purple-700 text-white' 
                      : 'bg-gray-800 text-purple-400 hover:bg-purple-900'
                    }
                  `}
                >
                  {skill}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;