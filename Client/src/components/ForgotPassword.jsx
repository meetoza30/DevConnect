import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgotPassword = ()=>{
    const [emailId, setEmailId] = useState();
    const navigate = useNavigate();
    const sendEmail = async ()=>{
        // console.log("in sendEmail")
        const result = await axios.post(BASE_URL + '/forgotPassword', {emailId}, {withCredentials:true});

        if(result?.data?.message == "User doesnt exist" || result?.data?.message == "Failure"){
            toast.error("User with this email doesn't exist");
        }

        else toast.success("Email sent!");

        // return navigate(`/reset-password/`)

    }
    return(
        <section className="flex flex-col items-center pt-6 my-20">
        <div className="w-full bg-white rounded-lg border-purple-500 shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 ">
            <div className="p-6 space-y-4 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot password:
            </h1>

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
                placeholder="Link to reset password will be sent to this email"
                required
              />
            </div>
            <button
              type="submit"
              onClick={sendEmail}
              
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800"
            >
              Proceed
            </button>
            </div>
        </div>
        </section>
        
    )
}

export default ForgotPassword;