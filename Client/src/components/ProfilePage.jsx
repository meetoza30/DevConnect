import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/constants.js'
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SKILLS_LIST = [
  'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 
  'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Machine Learning'
];

const DeveloperProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempHackathons, setTempHackathons] = useState([])
  const [editingHackathons, setEditingHackathons] = useState(new Set());
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [tempProjects, setTempProjects] = useState([])
  const [editingProjects, setEditingProjects] = useState(new Set());
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState({
    fullName: "",
    userName: "",
    bio: "",
    profileUrl: "",
    socialIds: {
      Linkedin: "",
      Github: "",
      LeetCode: "",
      GeeksForGeeks: "",
      CodeForces: "",
      CodeChef: "",
    }, 
    skills: [],
  });
  const SKILLS_LIST = [
    'C', 'C#', 'C++', 'CSS3', 'DART', 'GOLANG', 'GRAPHQL', 'HTML5', 'JAVA',
    'JavaScript', 'KOTLIN', 'PHP', 'RUST', 'PYTHON', 'TYPESCRIPT',
    'AWS', 'AZURE', 'FIREBASE', 'GOOGLE CLOUD', 'NETLIFY', 'VERCEL', 'RENDER',
    'ANGULAR', 'BOOTSTRAP', 'BUM', 'CHART.JS', 'Context API', 'DAISYUI', 'DJANGO',
    'Electron.JS', 'EXPRESS.JS', 'FLASK', 'FLUTTER', 'JQUERY', 'JWT', 'NEXT.JS',
    'NODE.JS', 'NODEMON', 'OPENCV', 'REACT.JS', 'REACT ROUTER',
    'SOCKET.IO', 'TAILWINDCSS', 'THREE.JS', 'VITE', 'VUE.JS',
    'APPWRITE', 'MONGODB', 'MYSQL', 'POCKETBASE', 'POSTGRES',
    'REDIS', 'SQLITE', 'PRISMA',
    'KERAS', 'MATPLOTLIB', 'MLFLOW', 'NUMPY', 'PANDAS', 'PYTORCH', 'TENSORFLOW',
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const checkAuth = async()=>{
const res = await axios.get(BASE_URL + "/check-auth", {withCredentials : true})
if(!res.data?.status){
  return navigate('/')
} 
}
 checkAuth();
  }, [])
  const getProfile = async()=>{
    
      try{
        const res = await axios.get(BASE_URL + `/profile/view`, {withCredentials:true})
        setTempProfile({
          fullName: res.data?.fullName, 
          userName: res.data?.userName,
          bio: res.data?.bio || "",
          profileUrl: res.data?.profileUrl,
          socialIds: res.data?.socialIds || {
            Linkedin: "",
            Github: "",
            LeetCode: "",
            GeeksForGeeks: "",
            CodeForces: "",
            CodeChef: "",
          }, 
          skills: res.data?.skills || [],
        });
        
        dispatch(addUser(res.data));
      }
      catch(err){
        toast.error("Something went wrong")
        
      }
    
    
  }

 

  const userData = useSelector((store)=>store.user);
  useEffect(()=>{
      const token = Cookies.get('token')
      getProfile();
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
  
  // ... (existing toggleEditMode, handleProfileUpdate, handleSocialProfileUpdate)

  const handleProfileUpdate = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = async()=>{
    try {
      
      
      await axios.patch(BASE_URL + "/profile/edit", tempProfile, {withCredentials : true})
      toast.success("Profile updated successfully")
      setIsEditMode(!isEditMode)
    } catch (error) {
      toast.error("Something went wrong")
      
    }
  } 

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

  const handleSocialProfileUpdate = (platform, value) => {
    
    setTempProfile((prev)=>({
      ...prev,
      socialIds : {...prev.socialIds, [platform] : value}
    }))
  };

  const handleProjectUpdate = (projectId, updates) => {
    if(updates.title == "" || updates.description == "" || updates.url =="") toast.error("Please fill all the details")
    console.log(updates)
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
   
    const project = tempProjects.find(p=>p._id === projectId);
    console.log(project);
    
    if(!project || projectId.startsWith("temp-")){
      try { 
        if(project.title == "" || project.description == "" || project.url =="") throw new Error("Please fill all the details of the project")
        else {
      const res = await axios.post(BASE_URL + "/profile/add/project", project, {withCredentials : true});
        setTempProjects(prev => prev.map(p=> p._id === projectId ? res.data : p));
        setEditingProjects(prevSet=> {
          const newSet = new Set(prevSet)
          newSet.delete(projectId);
          return newSet;
         })
        toast.success("Project updated successfully")
      }
      }
        catch(err){
          toast.error(err.message)
        }
    }
    else {
      try{
        if(project.title == "" || project.description == "" || project.url =="") throw new Error("Please fill all the details")
      await axios.patch(BASE_URL + `/project-edit/${projectId}`, project, {withCredentials : true})
      setEditingProjects(prevSet=> {
        const newSet = new Set(prevSet)
        newSet.delete(projectId);
        return newSet;
       })
      }catch(error){
        toast.error(error.message)
      }
    }

   
}

  const removeProject = async (projectId) => {
   
   try{
    await axios.delete(BASE_URL + `/remove-project/${projectId}`, {withCredentials : true})
    setTempProjects(prev => prev.filter(proj => proj._id !== projectId))
  }
   catch(err){
    toast.error("Something went wrong")
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
      toast.error("Something went wrong")
  }
      const hackathon = tempHackathons.find(h=> h._id === hackathonId);
      console.log(hackathon)
      if (!hackathon) {
        toast.error("Something went wrong")
        return;
    }
      if(!hackathon || hackathonId.startsWith("temp-")){
       
        try {
          if(hackathon.name == "" ||hackathon.description == "") throw new Error("Please fill all the details")
          const res = await axios.post(BASE_URL + "/profile/add/hackathon", {hackathon}, {withCredentials : true})
        if(res.data) setTempHackathons(prev=>prev.map(h=>(h._id === hackathonId ? res.data : h)))
          setEditingHackathons(prevSet =>{
            const newSet = new Set(prevSet);
            newSet.delete(hackathonId);
            return newSet;
           })
        toast.success("Hackathon details updated successfully!")
      }
      catch(err){
        toast.error(err.message)
      }
      }
      else {
       try {
        if(hackathon.name == "" ||hackathon.description == "") throw new Error("Please fill all the details")
        await axios.patch(BASE_URL + `/hackathon-edit/${hackathonId}`, hackathon, {withCredentials : true})
        setEditingHackathons(prevSet =>{
          const newSet = new Set(prevSet);
          newSet.delete(hackathonId);
          return newSet;
         })
        toast.success("Hackathon details updated successfully!")
      }catch(err){
          toast.error(err.message)
        }
      }
     
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
    toast.error("Something went wrong")
  }
  };
  const logout = async ()=>{
      try{const res = await axios.post(BASE_URL + "/logout", {}, {withCredentials:true})
      toast.success("User logged out successfully!")
      dispatch(removeUser());
      navigate('/')
    }
      catch(err){
        toast.error("Something went wrong")
      }
  }

  const handleSkillsUpdate = (skill) => {
    setTempProfile(prev => {
      const currentSkills = prev.skills;
      const updatedSkills = currentSkills.includes(skill)
        ? currentSkills.filter(s => s !== skill)
        : [...currentSkills, skill];
      return { ...prev, skills: updatedSkills };
    });

   
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); 
  };
  
  const uploadProfilePic = async()=>{
    if(!image) return alert("Please select an image")
      const formData = new FormData();
    formData.append('profilePic', image);

    try{
      const res = await axios.patch(BASE_URL + "/profile/upload", formData, {headers : {'Content-Type' : 'multipart/form-data'},
      withCredentials : true});
      tempProfile.profileUrl = res.profileUrl;
      toast.success(res.data.message);
    }
    catch(err){
      toast.error("Upload failed")
    }
  }
  

  return (
    
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Section (Left Sidebar) & SKills & Profiles - Unchanged */}
      <div className="w-full md:w-1/3  rounded-lg shadow-2xl p-6 transition-all duration-300 border border-purple-500">
        <div className="flex flex-col items-center">
          <div className="relative group flex flex-col justify-center items-center">
            <img 
              src={tempProfile?.profileUrl} 
              alt="Profile" 
              className="w-32 h-32 z-0 rounded-full object-cover border-4 border-purple-600"
            />
            {isEditMode && (
              <div className="profile-upload flex flex-row items-center justify-between mt-2">
              {preview && 
              <div>
              <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full mr-5" />
              </div>
              }
              <div className='flex flex-col items-start justify-start mt-5'>
              <input type="file" className='mx-auto text-purple-500' accept="image/*" onChange={handleFileChange} />
              <button className='bg-purple-500 mt-5 px-2 py-1 rounded-lg' onClick={uploadProfilePic}>Upload</button>
              
              </div>
            </div>
            )}
          </div>
          
          {!isEditMode ? (
            <>
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{tempProfile?.fullName}</h2>
              {
                tempProfile?.userName.length > 0 && <p className="text-purple-500">@{othersProfile?.userName}</p>
              }
              <p className="text-center mt-2 text-gray-300">{tempProfile?.bio}</p>
            </>
          ) : (
            <div className="w-full mt-4 space-y-3">
              <h2 className="text-2xl font-bold mt-4 text-purple-300">{tempProfile?.fullName}</h2>
              <input 
                type="text" 
                value={tempProfile?.userName}
                onChange={(e) => handleProfileUpdate("userName", e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
              <textarea 
                value={tempProfile?.bio}
                onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                placeholder="Bio"
                className="w-full p-2 border rounded h-24 bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          
        </div>
        {/* Coding & Social Profiles */}
       <div className=" rounded-lg shadow-2xl p-6 border mt-10 mb-5 border-purple-500 z-0">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Coding Profiles</h3>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${isEditMode ? 'opacity-100' : 'opacity-90'}`}>
            {Object.entries(tempProfile?.socialIds).map(([platform]) => (
              <div key={platform} className="flex items-center space-x-2">
                {isEditMode ? (
                  <input 
                    type="text"
                    value={tempProfile?.socialIds[platform]}
                    onChange={(e) => handleSocialProfileUpdate(platform, e.target.value)}
                    placeholder={`${platform} Profile`}
                    className="w-full p-2 border rounded bg-gray-800 border-purple-700 text-gray-100 focus:ring-2 focus:ring-purple-600"
                  />
                ) : tempProfile.socialIds[platform] && (
                  <a 
                    href={tempProfile.socialIds[platform].startsWith("http") ? tempProfile.socialIds[platform] : `https://${tempProfile.socialIds[platform]}`}
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

        <div className="rounded-lg shadow-2xl p-6 border border-purple-500">
  <h3 className="text-xl font-semibold mb-4 text-purple-300">Skills</h3>
  
  <div className="flex flex-wrap gap-2 overflow-auto max-h-40">
    {!isEditMode ? (
      tempProfile.skills.length > 0 &&
      tempProfile?.skills?.map(skill => (
        <span 
          key={skill} 
          className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full text-sm min-w-[80px] text-center"
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
            px-3 py-1 rounded-full text-sm transition-colors min-w-[80px] text-center
            ${tempProfile?.skills.includes(skill) 
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

        
        <div className="mt-6 flex justify-center space-x-4">
        {!isEditMode ? (
          <div className="flex flex-col justify-center">
          <button
            onClick={() => setIsEditMode(true)}
            className="  px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
          >
            Edit Profile
          </button>
          <button
            onClick={() => logout()}
            className="  px-4 py-2 bg-purple-600 mt-3 text-white rounded-lg shadow-md hover:bg-purple-700"
          >
           Log Out
          </button>
          </div>

          
        ) : (
          <>
            <button
              onClick={() => setIsEditMode(false)}
              className="px-4 py-2 mt-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={saveProfile}
              className="px-4 py-2 mt-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Save
            </button>
          </>
        )}
      </div>
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
                <a href={project.url.startsWith("http") ? project.url : `https://${project.url}`} target='_blank' className="text-purple-300 cursor-pointer hover:underline">
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
              placeholder='Project title'
              value={project.title} 
              onChange={(e) => handleProjectUpdate(project._id, { title: e.target.value })} 
              className="w-full p-2 border rounded bg-gray-800 text-gray-100"
              disabled={!editingProjects.has(project._id)}
            />
            
            <textarea 
              value={project.description} 
              placeholder='Description'
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

  {(tempHackathons?.length === 0) &&  (
    <div className="flex flex-col items-center justify-center py-10 bg-purple-900/30 rounded">
      <p className="text-gray-400 mb-4">No hackathons added yet</p>
      
    </div>
  )}
  {tempHackathons.length > 0 && tempHackathons.map((hackathon) => (
    <div key={hackathon._id} className="mb-4 mt-10 bg-purple-900/30  p-4 rounded-lg relative">
      {!editingHackathons.has(hackathon._id) ? (
        <>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <h4 className="font-bold text-purple-300">{hackathon.name}</h4>
          <p className="text-gray-400 mt-1">{hackathon.description}</p>
          <small className="text-purple-300 mt-3">Outcome - {hackathon.outcome}</small>
        </div>
        <button onClick={() => setEditingHackathons(prevSet => new Set(prevSet).add(hackathon._id))} className="ml-3 border border-purple-500 text-white px-2 py-1 rounded hover:bg-purple-500  hover:transition-all hover:duration-200">Edit</button>
        </div>
        </>
      ) : (
        <div>
<input 
  type="text" 
  value={hackathon.name} 
  placeholder='Title'
  onChange={(e) => handleHackathonUpdate(hackathon._id, { name: e.target.value })} 
  className="w-full p-2 border border-purple-200 rounded bg-gray-800 text-gray-300"
  disabled={!editingHackathons.has(hackathon._id)}
/>

<textarea 
  value={hackathon.description} 
  placeholder='Description'
  onChange={(e) => handleHackathonUpdate(hackathon._id, { description: e.target.value })} 
  className="w-full p-2 border rounded h-24 bg-gray-800 text-gray-100"
  disabled={!editingHackathons.has(hackathon._id)}
></textarea>

<input 
  type="text" 
  value={hackathon.outcome} 
  placeholder='Outcome (Win/Loss, prize, or participation details)'
  onChange={(e) => handleHackathonUpdate(hackathon._id, { outcome: e.target.value })} 
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