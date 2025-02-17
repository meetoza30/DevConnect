import React from "react"
import heroImg from '../assets/Business_SVG.svg'
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import meetImg from '../utils/meet_oza.jpg'
const Hero = ()=>{
  const DEVCONNECT = "<DevConnect />"
  const dispath = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async ()=>{
      if(userData) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials : true
        });

       dispath(addUser(res.data));
       
      } catch (err) {
        if(err.status == 401) navigate('/login');
        console.error(err);

      }
  }
    return(
        <>
        {/* <Navbar /> */}
       <section className="text-white">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">
                            Collaborate. Build.
                            <span className="text-violet-600"> Succeed.</span>
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">
                            Find developers, form your team, and embark on an unforgettable hackathon journey.
                            <br className="hidden md:inline lg:hidden" />
                            Empower your ideas with the right collaborators.
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link
                                rel="noopener noreferrer"
                                to='/signin'
                                className="px-8 py-3 text-lg font-semibold rounded bg-violet-600 text-white"
                            >
                                Join the Community
                            </Link>
                            
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src={heroImg}
                            alt="Developers collaborating"
                            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                </div>
            </section>


            <section className="bg-white dark:bg-gray-900 mt-11" id="features">
  <div className="container px-6 py-10 mx-auto">
    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
      Explore <br /> DevConnect's <span className="underline decoration-blue-500">Features</span>
    </h1>
    <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
      Discover how DevConnect empowers developers to collaborate and build success.
    </p>

    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
      {/* Feature 1: Find the Perfect Teammates */}
      <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Find the Perfect Teammates</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Connect with like-minded developers and form teams that complement your skillset for any hackathon.
        </p>
      </div>

      {/* Feature 2: Skill-Based Filtering */}
      <div className="p-8 space-y-3 border-2 border-violet-600 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Skill-Based Filtering</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Filter users based on specific skills to find the right match for your project or hackathon needs.
        </p>
      </div>

      {/* Feature 3: Showcase Your Hackathon Journey */}
      <div className="p-8 space-y-3 border-2 border-violet-600 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h6M3 11h9M3 15h6M13 7h6M13 11h3M13 15h6" />
          </svg>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Showcase Your Hackathon Journey</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Highlight your hackathon experiences, achievements, and milestones with a visual timeline.
        </p>
      </div>

      {/* Feature 4: Showcase Your Skills & Projects */}
      <div className="p-8 space-y-3 border-2 border-violet-600 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
        <img src="https://img.icons8.com/ios-filled/50/C4B4FF/learning.png" className=" size-7"/>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Showcase Your Skills & Projects</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Create a dynamic portfolio of your skills, projects, and achievements for potential collaborators to explore.
        </p>
      </div>

      {/* Feature 5: Messaging Feature */}
      <div className="p-8 space-y-3 border-2 border-violet-600 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
        <img src="https://img.icons8.com/?size=100&id=118374&format=png&color=C4B4FF" className=" size-7"/>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Messaging Feature</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Communicate with your team and collaborators seamlessly using our built-in messaging system.
        </p>
      </div>

      {/* Feature 6: Mentorship Matching */}
      <div className="p-8 space-y-3 border-2 border-violet-600 dark:border-violet-600 rounded-xl">
        <span className="inline-block text-blue-500 dark:text-violet-300">
        <img src="https://img.icons8.com/?size=100&id=60656&format=png&color=C4B4FF" className=" size-7"/>
        </span>
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Mentorship Matching</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Get paired with experienced mentors who can guide you through your development and hackathon journey.
        </p>
      </div>
    </div>
  </div>
</section>


<section className="bg-gray-50 dark:bg-gray-800 py-10 mt-5 mb-5" id="dev">
  <div className="container px-6 mx-auto text-center">
    
    <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold text-xl">
      Hi, I'm <span className="text-purple-500">Meet Oza</span>, the creator of DevConnect! As a passionate developer and hackathon enthusiast, I built this platform to help fellow developers collaborate, connect, and grow together.
      Whether you're looking for a team or honing your skills,<span className="text-purple-500">DevConnect</span>  is here for you.  
      Let's make this a thriving community for developers worldwide!
    </p>
    <p className="mt-4 text-gray-600 dark:text-gray-300">
      Got ideas or suggestions? I'd love to hear from you! Feel free to contribute to the project or reach out.
    </p>
    <div className="mt-6">
      
      <a href="mailto:meetoz305@gmail.com" className="ml-4 px-6 py-3 bg-violet-400 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
        Contact Me
      </a>
    </div>
  </div>
</section>

{!userData && <footer className="footer footer-center bg-gray-900 text-white p-10">
  <aside>
    <h1 className="font-bold text-4xl mb-5 text-violet-500">{DEVCONNECT}</h1>
    
    <p className="text-lg">Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
</footer>}


        </>
    )
}

export default Hero;