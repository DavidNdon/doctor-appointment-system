
import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
// import AllAppointment from './pages/Admin/AllAppointment';
import Adddoctor from './pages/Admin/Adddoctor';
import DoctorList from './pages/Admin/DoctorList';
import AllAppointments from './pages/Admin/AllAppointments';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {

   const {adminToken} = useContext(AdminContext);
   const {docToken} = useContext(DoctorContext);

  return adminToken || docToken ? (
    <div className='bg-gray-50'>
      {/* <h1 className='text-3xl text-center text-indigo-600 my-2'>admin panel</h1> */}
      <ToastContainer />
      <Navbar />

      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<Adddoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />
          {/* Doctor routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>

      </div>

    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App