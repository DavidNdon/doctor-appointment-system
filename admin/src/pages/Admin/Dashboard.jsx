import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import assets from '../../assets/assets';

const Dashboard = () => {

  const { adminToken, dashboardData, getDashboardData} = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getDashboardData();
    }
  }, [adminToken]);

  return (
    dashboardData && (
      <div className="m-5">
        <h1 className="font-bold text-lg text-center">Admin Dashboard</h1>
        <div clsassName="mt-5 flex flex-wrap gap-3 items-center w-full max-w-4xl">
          <div className="flex gap-5 justify-center mt-5">
            <div className="flex gap-4 items-center bg-neutral-200 text-black p-5 rounded-xl min-w-52 border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all duration-500">
              <img className="w-14" src={assets.doctor_icon} alt="" srcset="" />
              <div>
                <h2 className="text-lg font-black italic">Total Doctors: </h2>
                <p className="text-xl font-bold text-amber-700">
                  {dashboardData.totalDoctors}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-blue-200 text-black p-5 rounded-xl min-w-52 border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all duration-500">
              <img className="w-14" src={assets.people_icon} alt="" srcset="" />
              <div>
                <h2 className="text-lg font-black italic">Total Users: </h2>
                <p className="text-xl font-bold text-amber-700">
                  {dashboardData.totalUsers}
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
              {dashboardData.latestappointments ? (
                dashboardData.latestappointments.map((item, index) => (
                  <div
                    className="flex items-center justify-between gap-4 py-4 px-6 hover:bg-blue-50 transition-colors duration-200"
                    key={index}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        className="rounded-full border-2 border-blue-300 w-12 h-12 object-cover shadow-sm"
                        src={item.docData.image}
                        alt={item.docData.name}
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
      </div>
    )
  );
}

export default Dashboard