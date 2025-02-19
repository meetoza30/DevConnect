import React, { useState } from 'react';
import '../styles/SkillsPage.css';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSkills } from '../utils/userSlice';
import axios from 'axios';
const skillsData = {
  Languages: [
    'C', 'C#', 'C++', 'CSS3', 'DART', 'GOLANG', 'GRAPHQL', 'HTML5', 'JAVA',
    'JavaScript', 'KOTLIN', 'PHP', 'RUST', 'PYTHON', 'TYPESCRIPT',
  ],
  Hosting: [
    'AWS', 'AZURE', 'FIREBASE', 'GOOGLE CLOUD', 'NETLIFY', 'VERCEL', 'RENDER',
  ],
  Frameworks_Libraries: [
    'ANGULAR', 'BOOTSTRAP', 'BUM', 'CHART.JS', 'Context API', 'DAISYUI', 'DJANGO',
    'Electron.JS', 'EXPRESS.JS', 'FLASK', 'FLUTTER', 'JQUERY', 'JWT', 'NEXT.JS',
    'NODE.JS', 'NODEMON', 'OPENCV', 'REACT.JS', 'REACT ROUTER',
    'SOCKET.IO', 'TAILWINDCSS', 'THREE.JS', 'VITE', 'VUE.JS',
  ],
  Databases: [
    'APPWRITE', 'FIREBASE', 'MONGODB', 'MYSQL', 'POCKETBASE', 'POSTGRES',
    'REDIS', 'SQLITE', 'PRISMA',
  ],
  ML_DL: [
    'KERAS', 'MATPLOTLIB', 'MLFLOW', 'NUMPY', 'PANDAS', 'PYTORCH', 'TENSORFLOW',
  ],
};

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const postSkills = async(e)=>{
    // e.preventDefault();
    try{
      const res  = await axios.patch(BASE_URL + "/profile/edit", {skills}, {withCredentials :true})
      dispath(addSkills(res.data.user))
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }


  const handleCheckBox = (skill) => {
    setSkills((prev) => {
      const updatedSkills = prev.includes(skill)
        ? prev.filter((s) => s !== skill) // Remove skill if already selected
        : [...prev, skill]; // Add skill if not already selected

      return updatedSkills;
    });
  };

  const handleNext = () => {
    console.log(skills);
    postSkills()
    return navigate('/profile') // Send the selected skills to your database
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Let people know about your skills
      </h1>
      {Object.entries(skillsData).map(([category, items]) => (
        <CheckBoxGroup
          key={category}
          category={category}
          items={items}
          selected={skills}
          handleCheckBox={handleCheckBox}
        />
      ))}
      <div className="flex justify-between mt-6 w-full lg:w-2/3 mx-auto">
        <button
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-lg"
        >
          Skip
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const CheckBoxGroup = ({ category, items, selected, handleCheckBox }) => {
  return (
    <div className="bg-purple-700 rounded-xl p-6 mb-6 w-full lg:w-2/3 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">{category}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <div key={index} className="customCheckBoxHolder">
            <input
              type="checkbox"
              id={`${category}-${index}`}
              checked={selected.includes(item)}
              onChange={() => handleCheckBox(item)}
              className="customCheckBoxInput hidden"
            />
            <label
              htmlFor={`${category}-${index}`}
              className="customCheckBoxWrapper cursor-pointer"
            >
              <div className="customCheckBox bg-purple-500 rounded-lg py-2 px-4 text-center">
                <div className="inner text-white">{item}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
