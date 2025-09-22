import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ()=>{
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const {id, token} = useParams();

    const handleResetPassword = async ()=>{
        // console.log("in sendEmail")
        const res = await axios.patch(BASE_URL + `/resetPassword/${token}/${id}`, {password}, {withCredentials:true});
        // console.log(res?.data?.message)
        if(res?.data?.message == "Failure") toast.error("An error occured :(");

        else toast.success("Password changed! Sign in with new password");
        return navigate(`/signin`)
    }
    return(
        <section className="flex flex-col items-center pt-6 my-20">
        <div className="w-full bg-white rounded-lg border-purple-500 shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 ">
            <div className="p-6 space-y-4 sm:p-8">
                {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Enter new password:
            </h1> */}

            <div>
              <label
                htmlFor="password"
               
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password <span className=" text-gray-300 font-light">(Use uppercase, lowercase, symbols and numbers)</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="Enter new strong password"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleResetPassword}
              
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800"
            >
              Reset Password
            </button>
            </div>
        </div>
        </section>
        
    )
}

export default ResetPassword;