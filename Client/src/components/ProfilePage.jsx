import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/constants.js'
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
// import { startSession } from 'mongoose';
 

const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempHackathons, setTempHackathons] = useState([])
  const [editingHackathons, setEditingHackathons] = useState(new Set());
  const [tempProjects, setTempProjects] = useState([])
  const [editingProjects, setEditingProjects] = useState(new Set());
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  

  const getProfile = async()=>{
    setTimeout(async() => {
      try{
        const res = await axios.get(BASE_URL + "/profile/view", {withCredentials:true})
        console.log(res.data)
        dispatch(addUser(res.data));
      }
      catch(err){
        console.log(err);
      }
    }, 500);
    
  }

  const postProfile = async (updates) => {
    try {
      const res = await axios.patch(BASE_URL+"/profile/edit", {  }, { withCredentials: true });
      
      dispatch(addUser(res.data));
      
    } catch(err) {
      console.log(err);
    }
  };

  const userData = useSelector((store)=>store.user);
  useEffect(()=>{
    setTimeout(() => {
      getProfile();
    }, 1000);
    
  }, [])

  useEffect(() => {
    
      if (userData) {
        setProfile(userData); 
      }
   
    
  }, [userData]);

  useEffect(() => {
    if (profile?.projects && tempProjects.length === 0) {
      setTempProjects(profile.projects);
    }
    if(profile?.hackathons && tempHackathons.length === 0) setTempHackathons(profile.hackathons);

  }, [profile?.projects, profile?.hackathons]);
  

//  console.log(profile?.projects)
  


  // ... (existing toggleEditMode, handleProfileUpdate, handleSocialProfileUpdate)
  const toggleHackathonEditMode = (index) => {
  setEditingHackathons(prevSet => {
    const newSet = new Set(prevSet);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    return newSet;
  });
};

  const toggleProjectEditMode = (index) => {
  setEditingProjects(prevSet => {
    const newSet = new Set(prevSet);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    return newSet;
  });
};

  const toggleEditMode = ()=>{
    setIsEditMode(!isEditMode);
  }

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

    postProfile(e);
  };

  const handleProjectUpdate = (projectId, updates) => {
    setTempProjects(prev => prev.map(p=>p._id === projectId ? {...p, ...updates} : p))
};

  const addProject = () => {
    
    const newProject = {title : "", description: "", url : "", techStack : "", _id : `temp-${Date.now()}`}
    setTempProjects(prev => [
      ...prev, newProject
    ]);
    setEditingProjects(prevSet => new Set(prevSet).add(newProject._id))

};

  const saveProject = async(projectId)=>{
    console.log("In save project ", projectId)
    const project = tempProjects.find(p=>p._id === projectId);
    if(!project || projectId.startsWith("temp-")){
      try { 
        const res = await axios.post(BASE_URL + "/profile/add/project", project, {withCredentials : true});
        setTempProjects(prev => prev.map(p=> p._id === projectId ? res.data : p));
      }
        catch(err){
          console.log(err)
        }
    }
    else {
      await axios.patch(BASE_URL + `/project-edit/${projectId}`, project, {withCredentials : true})
    }

   setEditingProjects(prevSet=> {
    const newSet = new Set(prevSet)
    newSet.delete(projectId);
    return newSet;
   })
}

  const removeProject = async (projectId) => {
   
   try{
    await axios.delete(BASE_URL + `/remove-project/${projectId}`, {withCredentials : true})
    setTempProjects(prev => prev.filter(proj => proj._id !== projectId))
  }
   catch(err){
    console.log(err)
   }
  };


  const addHackathon = () => {
    const newHackathon = {name : "", description : "", outcome : "", date : "", role : "", _id : `temp-${Date.now()}`}
    setTempHackathons(prev=>[
      ...prev, newHackathon
    ])
    setEditingHackathons(prevSet => new Set(prevSet).add(newHackathon._id));
  };

  const saveHackathon = async(hackathonId)=>{
    if (!hackathonId) {
      console.error("saveHackathon called with undefined ID");
      
  }
      const hackathon = tempHackathons.find(h=> h._id === hackathonId);
      
      if (!hackathon) {
        console.error("Hackathon not found for ID:", hackathonId);
        return;
    }
      if(!hackathon || hackathonId.startsWith("temp-")){
        console.log(hackathon)
        try {const res = await axios.post(BASE_URL + "/profile/add/hackathon", {hackathon}, {withCredentials : true})
        if(res.data) setTempHackathons(prev=>prev.map(h=>(h._id === hackathonId ? res.data : h)))
      }
      catch(err){
        console.log(err);
      }
      }
      else {
        await axios.patch(BASE_URL + `/hackathon-edit/${hackathonId}`, hackathon, {withCredentials : true})
      }
     setEditingHackathons(prevSet =>{
      const newSet = new Set(prevSet);
      newSet.delete(hackathonId);
      return newSet;
     })
  }

  const handleHackathonUpdate = (hackathonId, updatedFields) => {
    setTempHackathons(prev=>prev.map(h=>h._id === hackathonId ? {...h, ...updatedFields} : h))
  };
  
  const removeHackathon = async (hackathonId) => {
    try{
      
    await axios.delete(BASE_URL + `/remove-hackathon/${hackathonId}`, {withCredentials : true})
    setTempHackathons(prev => prev.filter(h=> h._id !== hackathonId))
  }
  catch(err){
    console.log(err)
  }
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
      {/* Profile Section (Left Sidebar) & SKills & Profiles - Unchanged */}
      <div className="w-full md:w-1/3  rounded-lg shadow-2xl p-6 transition-all duration-300 border border-purple-500">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img 
              src={profile?.profileUrl} 
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
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{profile?.fullName}</h2>
              <p className="text-purple-500">@{profile?.userName}</p>
              <p className="text-center mt-2 text-gray-300">{profile?.bio}</p>
            </>
          ) : (
            <div className="w-full mt-4 space-y-3">
              <input 
                type="text" 
                value={profile?.fullName}
                onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                placeholder="Full Name"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <input 
                type="text" 
                value={profile?.userName}
                onChange={(e) => handleProfileUpdate({ username: e.target.value })}
                place
                
                holder="Username"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <textarea 
                value={profile?.bio}
                onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
                placeholder="Bio"
                className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          
        </div>
        {/* Coding & Social Profiles */}
       <div className=" rounded-lg shadow-2xl p-6 border mt-10 mb-5 border-purple-500">
          {/* <h3 className="text-xl font-semibold mb-4 text-purple-300">Coding Profiles</h3>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isEditMode ? 'opacity-100' : 'opacity-90'}`}>
            {Object.entries(profile?.socials).map(([platform, link]) => (
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
                    className="flex items-center p-1 underline hover:text-purple-400 transition-colors text-purple-200"
                  >
                    <span className="text-sm">{platform}</span>
                  </a>
                )}
              </div>
            ))}
          </div> */}
        </div>
        {/* ... (existing Skills Showcase section) */}

        <div className=" rounded-lg shadow-2xl p-6 border border-purple-500">
          
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Skills</h3>
          
          <div className="flex flex-wrap gap-2">
            {!isEditMode ? (
              profile?.skills?.map(skill => (
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
                    ${profile?.skills.includes(skill) 
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
        <div className="rounded-lg border border-purple-500 shadow-2xl p-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-bold text-purple-300">Project Journey</h3>
    
    <button 
      onClick={addProject} 
      className="bg-purple-700 font-semibold text-white px-3 py-1 rounded hover:shadow-md hover:shadow-purple-400 hover:transition-all hover:duration-300"
    >
      Add Project
    </button>
  </div>

  {(tempProjects?.length === 0) ? (
    <div className="flex flex-col items-center justify-center py-10 bg-purple-900/30 rounded">
      <p className="text-gray-400 mb-4">No projects added yet</p>
      <button 
        onClick={addProject}
        className="bg-purple-700 font-semibold text-white px-4 py-2 rounded hover:bg-purple-600 transition-all duration-300"
      >
        Start Your Project Journey
      </button>
    </div>
  ) : (
    tempProjects.map((project) => (
      <div key={project._id} className="mb-4 bg-purple-900/30 mt-10 p-4 rounded relative">
        {!editingProjects.has(project._id) ? (
          <>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-col'>
                <h4 className="font-bold text-purple-300">{project.title}</h4>
                <p className="text-gray-400">{project.description}</p>
                <a href={project.url} className="text-purple-300 cursor-pointer hover:underline">
                  View
                </a>
              </div>
              <button 
                onClick={() => setEditingProjects(prevSet => new Set(prevSet).add(project._id))} 
                className="ml-3 border border-purple-500 bg-gray-800 text-white px-2 py-1 rounded hover:bg-purple-500 hover:transition-all hover:duration-200"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <div>
            <input 
              type="text" 
              value={project.title} 
              onChange={(e) => handleProjectUpdate(project._id, { title: e.target.value })} 
              className="w-full p-2 border rounded bg-gray-800 text-gray-100"
              disabled={!editingProjects.has(project._id)}
            />
            
            <textarea 
              value={project.description} 
              onChange={(e) => handleProjectUpdate(project._id, { description: e.target.value })} 
              className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100 mt-2"
              disabled={!editingProjects.has(project._id)}
            ></textarea>
            
            <input 
              type="text" 
              value={project.url} 
              placeholder='Put the link where project is hosted or Github repo'
              onChange={(e) => handleProjectUpdate(project._id, { url: e.target.value })} 
              className="w-full p-2 border rounded bg-gray-800 text-gray-100 mt-2"
              disabled={!editingProjects.has(project._id)}
            />
            <button 
              onClick={() => saveProject(project._id)} 
              className="mt-2 bg-green-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button 
              onClick={() => removeProject(project._id)} 
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    ))
  )}
</div>

        {/* Hackathon Journey */}
        <div className="border border-purple-500 rounded-lg shadow-2xl p-6"> 
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-purple-300">Hackathon Journey</h3>
    <button onClick={addHackathon} className="bg-purple-700 text-white px-3 py-1 rounded hover:shadow-md hover:shadow-purple-400 hover:transition-all hover:duration-300">Add Hackathon</button>
  </div>


  

  {tempHackathons.length > 0 && tempHackathons.map((hackathon) => (
    <div key={hackathon._id} className="mb-4 mt-10 bg-purple-900/30  p-4 rounded-lg relative">
      {!editingHackathons.has(hackathon._id) ? (
        <>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
          <p className="text-gray-400">{hackathon.description}</p>
          <small className="text-purple-300">{hackathon.date}</small>
        </div>
        <button onClick={() => setEditingHackathons(prevSet => new Set(prevSet).add(hackathon._id))} className="ml-3 border border-purple-500 text-white px-2 py-1 rounded hover:bg-purple-500  hover:transition-all hover:duration-200">Edit</button>
        </div>
        </>
      ) : (
        <div>
<input 
  type="text" 
  value={hackathon.name} 
  onChange={(e) => handleHackathonUpdate(hackathon._id, { name: e.target.value })} 
  className="w-full p-2 border border-purple-200 rounded bg-gray-800 text-gray-300"
  disabled={!editingHackathons.has(hackathon._id)}
/>

<textarea 
  value={hackathon.description} 
  onChange={(e) => handleHackathonUpdate(hackathon._id, { description: e.target.value })} 
  className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(hackathon._id)}
></textarea>

<input 
  type="date" 
  value={hackathon.date} 
  onChange={(e) => handleHackathonUpdate(hackathon._id, { date: e.target.value })} 
  className="w-full p-2 border rounded bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(hackathon._id)}
/>
          <button onClick={() => saveHackathon(hackathon._id)} className="mt-2 bg-green-600 text-white px-2 py-1 rounded">Save</button>
          <button onClick={() => removeHackathon(hackathon._id)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
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