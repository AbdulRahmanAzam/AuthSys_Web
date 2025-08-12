import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const {backendUrl} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);
  
    const handleInput = (e, index) => {
      if(e.target.value.length > 0 && inputRefs.current.length - 1){
        inputRefs.current[index + 1].focus();
      }
    }
  
    const handleBackspace = (e, index) => {
      if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index) => {
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char;
        }
      })
    }

    const onSubmitEmail = async (e) => {
      e.preventDefault();

      try {
        const {data} = await axios.post(backendUrl + "/api/auth/send-reset-otp", {email});
        data.success ? toast.success("OTP sent successfully!") : toast.error(data.message);
        data.success && setIsEmailSent(true);
      } catch (error) {
        toast.error(error.message);
      }
    }

    const onSubmitOtp = async (e) => {
      e.preventDefault();
      
      try {
        const otpArray = inputRefs.current.map(e => e.value);
        const otpString = otpArray.join('');
        
        // Validate OTP
        if (otpString.length !== 6) {
          toast.error("Please enter complete 6-digit OTP");
          return;
        }
        
        setOtp(otpString);
        setIsOtpSubmitted(true);
        toast.success("OTP submitted successfully!");
      } catch (error) {
        toast.error("Failed to submit OTP");
      }
    }

    const onSubmitNewPassword = async (e) => {
      e.preventDefault();

      try {
        console.log("Sending data:", { email, otp, newpassword });
        
        const {data} = await axios.post(backendUrl + "/api/auth/reset-password", {email, otp, newPassword: newpassword});

        if (data.success) {
          toast.success("Password reset successfully!");
          navigate('/login');
        } else {
          toast.error(data.message || "Password reset failed");
        }
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error(error.response?.data?.message || error.message || "Failed to reset password");
      }
    }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt=""  className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      {/* // EMAIL INPUT FORM */}
      {!isEmailSent && 
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter your registered email address.</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
            <input 
            type="email" 
            placeholder='Email Address' 
            className='bg-transparent outline-none text-white' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <button 
          className='w-full py-2.5 rounded-full bg-indigo-600 text-white font-semibold mt-3'>Submit</button>
        </form>
      }


      {/* // OTP INPUT FORM */}
      {!isOtpSubmitted && isEmailSent && 
        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>

          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index) => (
              <input 
                type='text'
                maxLength={1}
                key={index}
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                required
                ref = {e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleBackspace(e,index)}
              />
            ))}
          </div>

            <button className='w-full py-2.5 bg-indigo-500 text-white rounded-full'>Submit</button>
      </form>
      }


      {/* // ENTER NEW PASSWORD */}
      {isEmailSent && isOtpSubmitted &&

      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your new password below.</p>

        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
          <input 
          type="password" 
          placeholder='New Password' 
          className='bg-transparent outline-none text-white' 
          value={newpassword}
          onChange={(e) => setNewpassword(e.target.value)} required/>
        </div>

        <button 
        className='w-full py-2.5 rounded-full bg-indigo-600 text-white font-semibold mt-3'>Submit</button>
      </form>
      }
    </div>
  )
}

export default ResetPassword