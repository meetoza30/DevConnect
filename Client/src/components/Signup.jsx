import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Cookies from "js-cookie"
import { toast } from 'react-toastify';
import validate from 'validator';

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [fullName, setName] = useState();
  const [userName, setUsername] = useState();

  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const checkAuth = async()=>{
const res = await axios.get(BASE_URL + "/check-auth", {withCredentials : true})
if(res.data?.status){
  toast.error("User already logged in, redirecting to feed")
  return navigate('/feed')
} 

    }

    checkAuth();
  }, [])

  const handleLogin = async (e)=>{
    

        e.preventDefault();
        if(!isSignUp){
          try {
            const res = await axios.post(BASE_URL+"/login",{emailId, password},{withCredentials:true})
            
            if(res.data.error === "Invalid Credentials") throw new Error("Invalid Credentials, please try again")
            
            dispath(addUser(res.data.user));
            toast.success("Successfully logged in!");

            return navigate('/feed')
          } catch (err) {
            toast.error(err.response?.data || "Invalid Credentials. Please try again.");
            
          }
        }
        
else {        
  try {
    const usernameRegex = /^[a-z0-9._]+$/;
    if(userName && !usernameRegex.test(userName)) throw new Error("Username should consist of lowercase characters, numbers & ('.' , '_') only")
    if(emailId && !validate.isEmail(emailId)) throw new Error("Enter valid email address")
    if(password && !validate?.isStrongPassword(password)) throw new Error("Enter strong password (Use Uppercase, Special characters & numbers)")

          const res = await axios.post(BASE_URL+"/signup", {
            fullName, userName, emailId, password
          }, {withCredentials:true});
          // if(res.error) throw new Error(res.error)
          dispath(addUser(res.data.user));
          toast.success("Account created successfully!");
          return navigate('/profile/update/skills');
        } catch (error) {
          toast.error(error.message || "Signup failed. Please try again.");
          
        }}
  }

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <section className="flex flex-col items-center pt-6 my-20">
      <div className="w-full bg-white rounded-lg border-purple-500 shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 ">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {isSignUp ? "Create an account" : "Sign in"}
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e)=>{setName(e.target.value)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                  placeholder="ex - Meet Oza"
                  required
                />
              </div>
            )}
            {isSignUp && (<div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={(e)=>{setUsername(e.target.value)}}
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="ex - meetoza30"
                required
              />
            </div>)}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e)=>{setEmailId(e.target.value)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="ex - meetoza@devconnect.com"
                required
              />
            </div>
            {isSignUp && (<div>
              <label
                htmlFor="password"
               
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                placeholder="A strong password contains more than 8 characters"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                required
              />
            </div>)}

            {!isSignUp && (<div>
              <label
                htmlFor="password"
               
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                placeholder="********"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                required
              />
            </div>)}
            <button
              type="submit"
              
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800"
            >
              {isSignUp ? "Create an account" : "Sign in"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={toggleForm}
                className="font-medium text-violet-600 hover:underline dark:text-violet-500 cursor-pointer"
              >
                {isSignUp ? "Sign in here" : "Create an account"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
