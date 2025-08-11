import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import ThemeToggle from "./ThemeToggle";
import  useAuth  from "../hooks/useAuth";

const Layout = () => {
  const DEVCONNECT = "<DevConnect />"
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn)
  
  
  const dispatch = useDispatch();
//   useEffect(()=>{
//     const checkAuth = async()=>{
// const res = await axios.get(BASE_URL + "/check-auth", {withCredentials : true})
// if(res.data?.status){
//   setisLoggedIn(true)
// } 
// }
// checkAuth();
//   }, [])

  const userData = useSelector((store)=>store.user);
 
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar  dark:bg-background-dark w-full max-w-full border-b-2 border-black dark:border-gray-300 overflow-hidden">
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
          <Link className="mx-2 flex-1 px-2 font-bold  min-w-0" to='/feed'>
            <h1 className=" bg-clip-text text-transparent leading-tight  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)] text-3xl">{DEVCONNECT}</h1>
          </Link>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal flex-nowrap">
              
              {isLoggedIn && <li><Link to="/feed">
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=59766&format=png&color=7c3aed" className=" size-4"/>
                <p className=" px-1">Explore</p>
              </div>
              </Link></li>}

              {!isLoggedIn && <li><Link to='/signin'>
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=a8WlVR9Y2GKa&format=png&color=7c3aed" className=" size-4"/>
                <p className=" dark:text-gray-300 font-medium px-1">Sign In</p>
              </div>
              </Link></li>}

              {!isLoggedIn && <li>
                <HashLink smooth to="/#features">
        <div className="flex flex-grow justify-between items-center">
          <img
            src="https://img.icons8.com/?size=100&id=37112&format=png&color=7c3aed"
            className="size-4"
          />
          <p className="px-1  dark:text-gray-300 font-medium">Why DevConnect?</p>
        </div>
      </HashLink>
    </li>}

    {!isLoggedIn && <li>
                <HashLink smooth to="/#dev">
        <div className="flex flex-grow justify-between items-center">
          <img
            src="https://img.icons8.com/?size=100&id=77971&format=png&color=7c3aed"
            className="size-4"
          />
          <p className="px-1  dark:text-gray-300 font-medium">Developer's Message</p>
        </div>
      </HashLink>
    </li>}
              
              {isLoggedIn && <li><Link to='/convos'>
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=tlOx8qQnfJdO&format=png&color=7c3aed" className=" size-4"/>
                <p className=" px-1">Convos</p>
              </div>
              </Link></li>}

              {isLoggedIn && <li><Link to="/reqs/review">
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=5MMxDaGdGsBe&format=png&color=7c3aed" className=" size-4"/>
                <p className=" px-1">Reqs</p>
              </div>
              </Link></li>}
              {isLoggedIn && (
        <li>
          <Link to="/connections" onClick={() => (document.getElementById('my-drawer-3').checked = false)}>
            <div className="flex flex-grow justify-between items-center z-50">
              <img src="https://img.icons8.com/?size=100&id=92484&format=png&color=7c3aed" className="size-4" />
              <p className="px-1">Connections</p>
            </div>
          </Link>
        </li>
      )}

              {isLoggedIn && <li><Link to="/profile">
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=85147&format=png&color=7c3aed" className=" size-4"/>
                <p className=" px-1">Profile</p>
              </div>
              </Link></li>}

                 {!isLoggedIn && <li><ThemeToggle /></li>}
             
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 ">
          {/* Sidebar content here */}
          {isLoggedIn && <li><Link to="/feed">
              <div className="flex flex-grow justify-between items-center">
                <img src="https://img.icons8.com/?size=100&id=59766&format=png&color=7c3aed" className=" size-4"/>
                <p className=" px-1">Explore</p>
              </div>
              </Link></li>}

              {!isLoggedIn && <li><Link to='/signin'>
              <div className="flex flex-grow justify-between items-center ">
                <img src="https://img.icons8.com/?size=100&id=a8WlVR9Y2GKa&format=png&color=7c3aed" className=" size-4"/>
                <p className="text-black dark:text-white px-1">Sign In</p>
              </div>
              </Link></li>}

              {!isLoggedIn && <li>
                <HashLink smooth to="/#features">
        <div className="flex flex-grow justify-between items-center">
          <img
            src="https://img.icons8.com/?size=100&id=37112&format=png&color=7c3aed"
            className="size-4"
          />
          <p className="px-1  dark:text-gray-300 font-medium">Why DevConnect?</p>
        </div>
      </HashLink>
    </li>}

    {!isLoggedIn && <li>
                <HashLink smooth to="/#dev">
        <div className="flex flex-grow justify-between items-center">
          <img
            src="https://img.icons8.com/?size=100&id=77971&format=png&color=7c3aed"
            className="size-4"
          />
          <p className="px-1  dark:text-gray-300 font-medium">Developer's Message</p>
        </div>
      </HashLink>
    </li>}
              
    {isLoggedIn && (
        <li>
          <Link to="/convos" onClick={() => (document.getElementById('my-drawer-3').checked = false)}>
            <div className="flex flex-grow justify-between items-center z-50">
            <img src="https://img.icons8.com/?size=100&id=tlOx8qQnfJdO&format=png&color=7c3aed" className=" size-4"/>
              <p className="px-1">Convos</p>
            </div>
          </Link>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <Link to="/reqs/review" onClick={() => (document.getElementById('my-drawer-3').checked = false)}>
            <div className="flex flex-grow justify-between items-center">
              <img src="https://img.icons8.com/?size=100&id=5MMxDaGdGsBe&format=png&color=7c3aed" className="size-4" />
              <p className="px-1">Reqs</p>
            </div>
          </Link>
        </li>
      )}

    {isLoggedIn && (
        <li>
          <Link to="/connections" onClick={() => (document.getElementById('my-drawer-3').checked = false)}>
            <div className="flex flex-grow justify-between items-center z-50">
              <img src="https://img.icons8.com/?size=100&id=92484&format=png&color=7c3aed" className="size-4" />
              <p className="px-1">Connections</p>
            </div>
          </Link>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <Link to="/profile" onClick={() => (document.getElementById('my-drawer-3').checked = false)}>
            <div className="flex flex-grow justify-between items-center">
              <img src="https://img.icons8.com/?size=100&id=85147&format=png&color=7c3aed" className="size-4" />
              <p className="px-1">Profile</p>
            </div>
          </Link>
        </li>
      )}
             
        </ul>
      </div>
    </div>
  );
};

export default Layout;