import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import { Home, Login, EmailVerify, ResetPassword } from "./pages/index";
import { ToastContainer } from "react-toastify";

 const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
};

export default App;