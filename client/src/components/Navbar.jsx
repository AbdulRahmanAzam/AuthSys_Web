import React, { useContext } from 'react';
import {assets} from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      
      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp");

      if(data.success){
        navigate('/email-verify');
        toast.success("Verification email sent successfully");
      }else{
        toast.error(data.message || "Failed to send verification email"); 
      }

    } catch (error) {
      toast.error(error.message || "Failed to send verification email");
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedin(false);
      data.success && setUserData(false);

      navigate('/login');
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />

        {/* IF THE USER IS LOGGED IN THEN DONT SHOW LOGIN BUTTON */}
        {userData ? 
        <div className='w-8 h-8 flex justify-center items-center rounded-full text-white bg-black relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {/* IF ACCOUNT IS NOT VERIFIED THEN ONLY SHOW THE VERIFY EMAIL  */}
              {!userData.isAccountVerified && 
                <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
              }
              <li onClick={() => navigate('/reset-password')} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Change Password</li>
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-20'>Logout</li>
            </ul>

          </div>
        </div>
        :  
        <button onClick={() => navigate('/login')}
        className='text-sm flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
            Login
            <img src={assets.arrow_icon} alt="" />
        </button>

      }

    </div>
  )
}

export default Navbar