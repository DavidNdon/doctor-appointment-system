import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='bg-blue-100 relative min-h-screen pb-1'
          style={{
          backgroundImage: `
            linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px)
          `,
          backgroundSize: '2px 2px'
        }}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App