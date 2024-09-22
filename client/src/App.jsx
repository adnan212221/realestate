import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/SIgnup'
import Header from './components/Header'


const App = () => {
  return (
    <>
    <Header />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
     </Routes>
    </>
  )
}

export default App