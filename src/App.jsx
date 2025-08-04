import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/landingPage/LandinPage'
import AuthLayout from './components/AuthPages/AuthLayout'
import ForgotPassword from './components/AuthPages/ForgotPassword'
import Dashboard from './components/UserMainLayout/Dashboard'
import VerifyMail from './components/AuthPages/VerifyMail'
import ResetPassword from './components/AuthPages/ResetPassword'
import AdminDashboard from './components/AdminMainLayout/AdminDashboard'
import AddMentor from './components/MentorAuthPages/AddMentor'
import AllMentorList from './components/MentorAuthPages/AllMentorList'
import UserProfile from './components/ProfilePages/UserProfile'
import AddPost from './components/UserPost/AddPost'

const App = () => {
  return (
   <>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/Login' element={<AuthLayout/>}/>
      <Route path='/Register' element={<AuthLayout/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/userDashboard' element={<Dashboard/>}/>
      <Route path="/verify-email" element={<VerifyMail />} />

      {/* -------------------------------------------------- */}
      <Route path='/admin/adminDashboard' element={<AdminDashboard/>}></Route>
     <Route path='/admin/addMentor' element={<AddMentor/>}></Route>
     <Route path='/admin/allMentorList' element={<AllMentorList/>}></Route>

     {/* -------------------------------------------------- */}

     {/* -------------------------------------------------- */}
     <Route path='/userProfile' element={<UserProfile/>}></Route>

     {/* -------------------------------------------------- */}
     <Route path='/addPost' element={<AddPost/>}></Route>


    </Routes>
   </>
  )
}

export default App
