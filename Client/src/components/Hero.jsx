import React, { useEffect, useState } from "react";
import heroImg from '../assets/Business_SVG.svg'; // Change to your illustration
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Cookies from 'js-cookie';
import axios from 'axios';
import ThreeDCard from "./Hero3dCard";

// Be sure BASE_URL is defined!

const Hero = () => {
  const DEVCONNECT = "<DevConnect />";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Only show join button if no login
    const token = Cookies.get('token');
    setShowCTA(!token);
  }, []);

  // Fetch user logic (could be used inside useEffect if needed)
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate('/login');
      console.error(err);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[70vh] bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="container flex flex-col-reverse justify-center px-6 mx-auto sm:py-16 lg:py-24  lg:flex-row lg:justify-around lg:items-center">
          {/* Left: Headline & CTA */}
          <div className="flex flex-1 flex-col mt-5 md:mt-0 mx-10 justify-center items-center lg:items-start rounded-sm max-w-xl space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-700 dark:text-gray-300">
              Connect. Collaborate.
              <br />
              <span className="bg-clip-text text-transparent leading-tight bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)] ">
                Build & Succeed.
              </span>
            </h1>
            <p className="text-lg text-main dark:text-gray-300 max-w-lg">
              Find developers, form your team, and embark on an unforgettable hackathon journey.<br />
              Empower your ideas with the right collaborators.
            </p>
            {showCTA && (
              <div className="flex flex-col gap-4 sm:flex-row mt-2">
                {/* Primary button: Gradient */}
                <Link
                  to='/signin'
                  className="px-8 py-3 text-lg font-semibold rounded-lg  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)]  text-white shadow-lg hover:opacity-90 transition"
                >
                  Join the Community
                </Link>
                
                
              </div>
            )}
          </div>
          {/* Right: Illustration with a subtle circle gradient background */}
          <div className="hidden lg:block  justify-center items-center">
            <ThreeDCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background dark:bg-background-dark py-16 transition-colors duration-300 mt-4" id="features">
        <div className="container px-6">
          <h1 className="text-3xl font-extrabold text-main lg:text-4xl dark:text-white mb-2  mx-10">
            Explore <br /> <span className="bg-clip-text text-transparent leading-tight  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)] ">DevConnect's</span> <span className="underline text-gray-700 dark:text-gray-300 ">Features</span>
          </h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-lg  mx-10">
            Discover how DevConnect empowers developers to collaborate and build success.
          </p>
          <div className="grid grid-cols-1 gap-8 mt-10 mx-10 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {/* Features: Each uses the same card structure */}
            {/* https://img.icons8.com/?size=100&id=sGNEMWKG3WcQ&format=png&color=FFFFFF */}
            {[
              {
                icon: (
                  <img src="https://img.icons8.com/?size=100&id=bjqhmlJOaXIK&format=png&color=FFFFFF" alt="" className="w-8 h-8" />
                ),
                title: "Find the Perfect Teammates",
                desc: "Connect with like-minded developers and form teams that complement your skillset for any hackathon."
              },
              {
                icon: (
                  <img src="https://img.icons8.com/?size=100&id=85549&format=png&color=FFFFFF" alt="" className="w-8 h-8" />
                ),
                title: "Skill-Based Filtering",
                desc: "Filter users based on specific skills to find the right match for your project or hackathon needs."
              },
              {
                icon: (
                 <img src="https://img.icons8.com/?size=100&id=sGNEMWKG3WcQ&format=png&color=FFFFFF" alt="" className="w-8 h-8" />
                ),
                title: "Showcase Your Hackathon Journey",
                desc: "Highlight your hackathon experiences, achievements, and milestones with a visual timeline."
              },
              {
                icon: (
                  <img src="https://img.icons8.com/ios-filled/50/FFFFFF/learning.png" alt="" className="w-8 h-8" />
                ),
                title: "Showcase Your Skills & Projects",
                desc: "Create a dynamic portfolio of your skills, projects, and achievements for potential collaborators to explore."
              },
              {
                icon: (
                  <img src="https://img.icons8.com/?size=100&id=118374&format=png&color=FFFFFF" alt="" className="w-8 h-8" />
                ),
                title: "Messaging Feature",
                desc: "Communicate with your team and collaborators seamlessly using our built-in messaging system."
              },
              {
                icon: (
                  <img src="https://img.icons8.com/?size=100&id=60656&format=png&color=FFFFFF" alt="" className="w-8 h-8" />
                ),
                title: "Mentorship Matching",
                desc: "Get paired with experienced mentors who can guide you through your development and hackathon journey."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#211d2a] rounded-xl p-8 shadow-md flex flex-col items-center text-center border-2 border-primary-light dark:border-primary"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)]  mb-3">
                  {feature.icon}
                </span>
                <h3 className="font-bold text-lg mb-2 text-main dark:text-white">{feature.title}</h3>
                <p className= "text-gray-500 dark:text-gray-100">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Creator Section */}
      <section className="bg-background dark:bg-background-dark py-12 mt-4 transition-colors duration-300" id="dev">
        <div className="container px-6 mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold text-main dark:text-white mb-2">
            Hi, I'm <span className="text-gray-700 dark:text-gray-300 underline decoration-primary-light">Meet Oza</span>, the creator of <span className="font-bold bg-clip-text text-transparent leading-tight  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)] ">{DEVCONNECT}</span>!
          </p>
          <p className="mt-4 text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto">
            As a passionate developer and hackathon enthusiast, I built this platform to help fellow developers collaborate, connect, and grow together.
            Whether you're looking for a team or honing your skills, <span className="bg-clip-text text-transparent leading-tight  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)]  font-bold">DevConnect</span> is here for you.<br /><br />
            Let's make this a thriving community for developers worldwide!
          </p>
          <p className="mt-4 text-lg md:text-2xl  text-gray-700 dark:text-gray-300 font-medium">
            Got ideas or suggestions? I'd love to hear from you! Feel free to contribute to the project or reach out.
          </p>
          <div className="mt-6">
            <a href="mailto:meetoz305@gmail.com"
              className="px-6 py-3 bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)] text-white font-semibold rounded-lg hover:bg-primary transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer (show only if not logged in) */}
      {!userData &&
        <footer className=" bg-background dark:bg-background-dark  text-white py-10 text-center border-t-2 border-black">
          <h1 className="mb-5 font-bold text-4xl inline-block bg-clip-text text-transparent leading-tight  bg-gradient-to-r from-[rgb(65,88,208)] via-[rgb(200,80,192)] to-[rgb(255,204,112)]">{DEVCONNECT}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </footer>
      }
    </>
  );
};

export default Hero;
