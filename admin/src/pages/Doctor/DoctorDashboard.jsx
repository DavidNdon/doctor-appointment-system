import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import assets from '../../assets/assets';

const DoctorDashboard = () => {

  const {dashboardData, setDashboardData, getDashboardData, docToken} = useContext(DoctorContext);

  useEffect(() => {
    if(docToken){
      getDashboardData();
      
    }
  }, [docToken])

  return dashboardData &&  (
    <div className='m-5'>
     <div className="flex gap-5 justify-center mt-5">
            <div className="flex gap-4 items-center bg-neutral-200 text-black p-5 rounded-xl min-w-52 border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all duration-500">
              <img className="w-14" src={assets.earning_icon} alt="" srcset="" />
              <div>
                <h2 className="text-lg font-black italic">Total Earnings: </h2>
                <p className="text-xl font-bold text-amber-700">Ksh 
                   {dashboardData.earnings}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-blue-200 text-black p-5 rounded-xl min-w-52 border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all duration-500">
              <img className="w-14" src={assets.people_icon} alt="" srcset="" />
              <div>
                <h2 className="text-lg font-black italic">Total Patients: </h2>
                <p className="text-xl font-bold text-amber-700">
                  {dashboardData.totalPatients}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-yellow-200 text-black p-5 rounded-xl min-w-52 border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all duration-500">
              <img
                className="w-14"
                src={assets.appointments_icon}
                alt=""
                srcset=""
              />
              <div>
                <h2 className="text-lg font-black italic">Total Appointments: </h2>
                <p className="text-xl font-bold text-amber-700">
                  {dashboardData.totalAppointments}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-4xl mx-auto">
            <div className="rounded-t-lg bg-linear-to-r from-blue-100 to-blue-300 text-black px-6 py-4 border-b-2 border-blue-400 flex items-center gap-3 shadow-md">
              <img className="w-8 h-8" src={assets.appointments_icon} alt="Appointments Icon" />
              <h2 className="text-xl font-bold tracking-wide">Latest Appointments</h2>
            </div>
            <div className="bg-white border border-t-0 rounded-b-lg shadow-md divide-y divide-gray-100">
              {dashboardData.latestappointments && dashboardData.latestappointments.length > 0 ? (
                dashboardData.latestappointments.map((item, index) => (
                  <div
                    className="flex items-center justify-between gap-4 py-4 px-6 hover:bg-blue-50 transition-colors duration-200"
                    key={index}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        className="rounded-full border-2 border-blue-300 w-12 h-12 object-cover shadow-sm"
                        src={item.userData.image}
                        alt={item.userData.name}
                      />
                      <div className="min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate">{item.userData.name}</p>
                        <p className="text-xs text-gray-500 italic truncate">{item.slotDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.cancel ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold border border-red-200">Cancelled</span>
                      ) : item.isCompleted ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold border border-green-200">Completed</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200">Upcoming</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 px-6 text-center text-gray-400 text-base">No appointments found.</div>
              )}
            </div>
          </div>
    </div>
  )
}

export default DoctorDashboard

{/*  <h1 className='text-2xl font-bold mb-5'>Doctor Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
        <div className='bg-white p-5 rounded-lg shadow'>
          <p className='text-sm text-gray-500'>Earnings</p>
          <p className='text-xl font-bold'>Ksh{dashboardData.earnings}</p>
        </div>
        <div className='bg-white p-5 rounded-lg shadow'>
          <p className='text-sm text-gray-500'>Total Appointments</p>
          <p className='text-xl font-bold'>{dashboardData.totalAppointments}</p>
        </div>
        <div className='bg-white p-5 rounded-lg shadow'>
          <p className='text-sm text-gray-500'>Total Patients</p>
          <p className='text-xl font-bold'>{dashboardData.totalPatients}</p>
        </div>
      </div>
      <h2 className='text-xl font-bold mb-5'>Latest Appointments</h2>
      <div className='bg-white p-5 rounded-lg shadow'>
        {dashboardData.latestappointments.length > 0 ? (
          <table className='w-full text-left'>
            <thead>
              <tr>
                <th className='border-b p-2'>Patient Name</th>
                <th className='border-b p-2'>Date</th>
                <th className='border-b p-2'>Time</th>
                <th className='border-b p-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.latestappointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className='border-b p-2'>{appointment.patientName}</td>
                  <td className='border-b p-2'>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className='border-b p-2'>{appointment.time}</td>

                  <td className='border-b p-2'>{appointment.isCompleted ? 'Completed' : appointment.cancel ? 'Cancelled' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>*/}