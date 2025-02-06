import React, { useState } from 'react';

const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hackathonEdit, setHackathonEdit] = useState(false);
  const [editingHackathons, setEditingHackathons] = useState(new Set());
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

  // ... (existing toggleEditMode, handleProfileUpdate, handleSocialProfileUpdate)
  const toggleEditMode = (index) => {
    setEditingHackathons(prevSet => {
      const newSet = new Set(prevSet);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
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
    setProfile(prev => ({
      ...prev,
      hackathons: [...prev.hackathons, { name: 'New Hackathon', description: '', date: '' }] 
    }));
  
    // Wait for the new hackathon to be added, then set edit mode for only the new one
    setTimeout(() => {
      setEditingHackathons(prevSet => {
        const newSet = new Set(prevSet);
        newSet.add(profile.hackathons.length); // New hackathon index
        return newSet;
      });
    }, 0);
  };

  const handleHackathonUpdate = (index, updatedFields) => {
    setProfile(prev => ({
      ...prev,
      hackathons: prev.hackathons.map((hackathon, i) => 
        i === index ? { ...hackathon, ...updatedFields } : hackathon
      )
    }));
  };
  

  const removeHackathon = (indexToRemove) => {
    setProfile(prev => ({
      ...prev,
      hackathons: prev.hackathons.filter((_, index) => index !== indexToRemove)
    }));
  };

  // ... (existing handleSkillsUpdate)
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
      {/* Profile Section (Left Sidebar) & SKills & PRofiles - Unchanged */}
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
        {/* Coding & Social Profiles */}
       <div className="bg-purple-900/30 rounded-lg shadow-2xl p-6 border mt-10 mb-5 border-purple-700/50">
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
        {/* ... (existing Skills Showcase section) */}

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
                      : 'bg-gray-800 text-purple-400 hover:bg-purple-900'}
                  `}
                >
                  {skill}
                </button>
              ))
            )}
          </div>
        </div>
        
        <button 
          onClick={toggleEditMode} 
          className="mt-4 w-full flex items-center justify-center p-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors"
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
    <button onClick={addHackathon} className="bg-purple-700 text-white px-3 py-1 rounded">Add Hackathon</button>
  </div>

  {profile.hackathons.map((hackathon, index) => (
    <div key={index} className="mb-4 bg-gray-800 p-4 rounded relative">
      {!editingHackathons.has(index) ? (
        <>
          <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
          <p className="text-gray-400">{hackathon.description}</p>
          <small className="text-purple-500">{hackathon.date}</small>
          <button onClick={() => toggleEditMode(index)} className="ml-3 bg-purple-700 text-white px-2 py-1 rounded">Edit</button>
        </>
      ) : (
        <div>
<input 
  type="text" 
  value={hackathon.name} 
  onChange={(e) => handleHackathonUpdate(index, { name: e.target.value })} 
  className="w-full p-2 border rounded bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(index)}
/>

<textarea 
  value={hackathon.description} 
  onChange={(e) => handleHackathonUpdate(index, { description: e.target.value })} 
  className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(index)}
></textarea>

<input 
  type="text" 
  value={hackathon.date} 
  onChange={(e) => handleHackathonUpdate(index, { date: e.target.value })} 
  className="w-full p-2 border rounded bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(index)}
/>


          <button onClick={() => toggleEditMode(index)} className="mt-2 bg-green-600 text-white px-2 py-1 rounded">Save</button>
          <button onClick={() => removeHackathon(index)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
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