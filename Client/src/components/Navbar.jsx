import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Layout = () => {
  const DEVCONNECT = "<DevConnect />"
  
  let [userExist, setUserExist] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    const checkAuth = async()=>{
const res = await axios.get(BASE_URL + "/check-auth", {withCredentials : true})
if(res.data?.status){
  setUserExist(true)
} 
}
checkAuth();
  }, [])

 
  const userData = useSelector((store)=>store.user);
 


  return (
    <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="navbar bg-base-300 w-full">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 font-bold text-violet-600 text-2xl">{DEVCONNECT}</div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          
          {userExist && <li><Link to="/feed">
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=115270&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Feed</p>
          </div>
          </Link></li>}

          {!userExist && <li><Link to='/signin'>
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=a8WlVR9Y2GKa&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Sign In</p>
          </div>
          </Link></li>}

          {!userExist && <li>
            <HashLink smooth to="/#features">
    <div className="flex flex-grow justify-between items-center">
      <img
        src="https://img.icons8.com/?size=100&id=37112&format=png&color=C4B4FF"
        className="size-4"
      />
      <p className="px-1">Why DevConnect?</p>
    </div>
  </HashLink>
</li>}

{!userExist && <li>
            <HashLink smooth to="/#dev">
    <div className="flex flex-grow justify-between items-center">
      <img
        src="https://img.icons8.com/?size=100&id=77971&format=png&color=C4B4FF"
        className="size-4"
      />
      <p className="px-1">Developer's Message</p>
    </div>
  </HashLink>
</li>}
          
          {userExist && <li><Link to='/convos'>
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=tlOx8qQnfJdO&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Convos</p>
          </div>
          </Link></li>}

          {userExist && <li><Link to="/reqs/review">
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=5MMxDaGdGsBe&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Reqs</p>
          </div>
          </Link></li>}

          {userExist && <li><Link to="/profile">
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=85147&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Profile</p>
          </div>
          </Link></li>}
          
         
        </ul>
      </div>
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      {userExist && <li><Link to="/feed">
          <div className="flex flex-grow justify-between items-center z-50 ">
            <img src="https://img.icons8.com/?size=100&id=115270&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Feed</p>
          </div>
          </Link></li>}

          {!userExist && <li><Link to='/signin'>
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=a8WlVR9Y2GKa&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Sign In</p>
          </div>
          </Link></li>}

          {!userExist && <li>
            <HashLink smooth to="/#features">
    <div className="flex flex-grow justify-between items-center">
      <img
        src="https://img.icons8.com/?size=100&id=37112&format=png&color=C4B4FF"
        className="size-4"
      />
      <p className="px-1">Why DevConnect?</p>
    </div>
  </HashLink>
</li>}

{!userExist && <li>
            <HashLink smooth to="/#dev">
    <div className="flex flex-grow justify-between items-center">
      <img
        src="https://img.icons8.com/?size=100&id=77971&format=png&color=C4B4FF"
        className="size-4"
      />
      <p className="px-1">Developer's Message</p>
    </div>
  </HashLink>
</li>}
          
          {userExist && <li><Link to='/convos'>
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=tlOx8qQnfJdO&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Convos</p>
          </div>
          </Link></li>}

          {userExist && <li><Link to="/reqs/review">
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=5MMxDaGdGsBe&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Reqs</p>
          </div>
          </Link></li>}

          {userExist && <li><Link to='/profile'>
          <div className="flex flex-grow justify-between items-center">
            <img src="https://img.icons8.com/?size=100&id=85147&format=png&color=C4B4FF" className=" size-4"/>
            <p className=" px-1">Profile</p>
          </div>
          </Link></li>}
          
         
    </ul>
  </div>
</div>
  );
};

export default Layout;
