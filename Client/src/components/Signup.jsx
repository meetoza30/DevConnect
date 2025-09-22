import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Cookies from "js-cookie"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebaseConfig";
import { toast } from 'react-toastify';
import validate from 'validator';
import { Link } from "react-router-dom";

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [fullName, setName] = useState();
  const [userName, setUsername] = useState();
  //  const { refreshAuth } = useAuth();
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

  const handleGoogleLogin = async()=>{
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(BASE_URL+"/google/login",{_id: user.uid,
      fullName: user.displayName,
      emailId: user.email},{withCredentials:true});
      // console.log(res?.data?.user);
      dispath(addUser(res.data.user));
      localStorage.setItem('userData', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    localStorage.setItem("loggedIn", "true");
    window.dispatchEvent(new Event("storage"));

    toast.success("Successfully logged in!");
            return navigate('/feed')


      }
    catch(err){
      console.log(err);
    }
  }

  const handleLogin = async (e)=>{
        e.preventDefault();
        if(!isSignUp){
          try {
            const res = await axios.post(BASE_URL+"/login",{emailId, password},{withCredentials:true})
            
            if(res.data.error === "Invalid Credentials") throw new Error("Invalid Credentials, please try again")
            // console.log(res.data.user);
            dispath(addUser(res.data.user));
            localStorage.setItem('userData', JSON.stringify(res.data.user));
            toast.success("Successfully logged in!");
            localStorage.setItem('token', res.data.token);
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");

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
          dispath(addUser(res.data.user));
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          toast.success("Account created successfully!");
          
          localStorage.setItem( 'token',res.data.token);
          document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");

    // Store login flag and trigger storage event
    localStorage.setItem("loggedIn", "true");
    window.dispatchEvent(new Event("storage"));

    // Update navbar immediately
    // refreshAuth();
          return navigate('/profile/update/skills');
        } catch (error) {
          toast.error(error.message || "Signup failed. Please try again.");
          
        }}
  }

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <section className="flex flex-col items-center my-20">
      <div className=" bg-gray-800 rounded-lg border-purple-500 shadow border mx-5 md:mx-0 sm:max-w-md ">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            {isSignUp ? "Create an account" : "Sign in"}
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e)=>{setName(e.target.value)}}
                  className="border border-gray-300  sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                  placeholder="ex - Meet Oza"
                  required
                />
              </div>
            )}
            {isSignUp && (<div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={(e)=>{setUsername(e.target.value)}}
                id="username"
                className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  text-white focus:ring-violet-500 focus:border-violet-500"
                placeholder="ex - meetoza30"
                required
              />
            </div>)}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e)=>{setEmailId(e.target.value)}}
                className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  text-white focus:ring-violet-500 focus:border-violet-500"
                placeholder="ex - meetoza@devconnect.com"
                required
              />
            </div>
            {isSignUp && (<div>
              <label
                htmlFor="password"
               
                className="block mb-2 text-sm font-medium text-white"
              >
                Password <span className=" text-gray-300 font-light">(Use uppercase, lowercase, symbols and numbers)</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                placeholder="A strong password contains more than 8 characters"
                className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  text-white focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>)}

            {!isSignUp && (<div>
              <label
                htmlFor="password"
               
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                placeholder="********"
                className="  border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  text-white focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>)}
            <button
              type="submit"
              
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800"
            >
              {isSignUp ? "Create an account" : "Sign in"}
            </button>

            
            <div>
              {!isSignUp && <Link
                to="/forgot-password"
                className="font-medium text-sm text-violet-600 underline dark:text-violet-500 cursor-pointer"
              >Forgot password?</Link>}

            <p className=" mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
              
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={toggleForm}
                className="font-medium text-violet-600 hover:underline dark:text-violet-500 cursor-pointer"
              >
                
                {isSignUp ? "Sign in here" : "Create an account"}
              </span>
            </p>
            </div>

            <div className="flex flex-col items-center my-4">
  <p className="text-gray-500 dark:text-gray-400 mb-2">or</p>
  <button
    onClick={handleGoogleLogin}
    type="button"
    className="flex items-center justify-center w-full text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-blue-800"
  >
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt="Google logo"
      className="w-5 h-5 mr-2"
    />
    Continue with Google
  </button>
</div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
