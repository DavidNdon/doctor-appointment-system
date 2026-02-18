import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

  const {docToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      
      const updatedData = {
        fees: profileData.fees,
        address: profileData.address,
        experience: profileData.experience,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updatedData, {
        headers: {
          'doctor-token': docToken
        }
      });

      if (data.success) {
        setProfileData(data.profileData);
        setIsEdit(false);
        getProfileData();
        toast.success(data.message);
      } else {
        console.error(data.error);
      }
      
    } catch (error) {
      toast.error(error.message);
     console.error(error);
    }
  }


  useEffect(() => {
    if(docToken){
      getProfileData();
    }}, [docToken])

  return (
    <div>
      {profileData && (
        <div className="gap-4 m-5">
          <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
          <div className="flex flex-col items-center gap-6 mb-6">
            <img
              className="w-32 h-32 rounded-full bg-primary/80 object-cover border-2 border-gray-300 shadow-sm"
              src={profileData.image}
              alt={profileData.name}
            />
            <div>
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
            </div>
          </div>
          {/* ----Doctor info, name, degree etc */}
          <div className='flex-1 border border-stone-100 rounded-lg p-8 py-4 bg-primary/20'>
            <div className='items-center'>
              <p className='text-xl font-bold p-2 text-gray-700 items-center'>{profileData.degree}</p>
            </div>

            <div>
              <h1 className='text-lg font-bold p-2'>Experience:</h1>
              <p className='text-sm font-black p-2 text-neutral-700'>{isEdit? <input className="border border-gray-700 bg-white rounded px-2 py-1" type='text' onChange={(e) => setProfileData(prev => ({...prev, experience:e.target.value}))} value={profileData.experience} /> : profileData.experience}</p>
            </div>

            <div>
              <h1 className='text-lg font-bold p-2'>About:</h1>
              <p className='text-sm p-2 font-bold text-neutral-700'>{profileData.about}</p>
            </div>

             <div>
              <h1 className='text-lg font-bold p-2'>Appointment Fees:</h1>
              <p className='text-sm p-2 font-bold text-neutral-700'>Ksh {isEdit ? <input className="border border-gray-700 bg-white rounded px-2 py-1" type='number' onChange={(e) => setProfileData(prev => ({...prev, fees:e.target.value}))} value={profileData.fees} />:profileData.fees}</p>
            </div>

            <div>
              <h1 className='text-lg font-bold p-2'>Address:</h1>
              <p className='text-sm p-2 font-bold text-neutral-700'>{isEdit ? <input className="border border-gray-700 bg-white rounded px-2 py-1" type='text' onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address, line1:e.target.value}}))} value={profileData.address.line1 || ''} placeholder="Address Line 1" /> : profileData.address.line1}</p>
              <p className='text-sm p-2 font-bold text-neutral-700'>{isEdit ? <input className="border border-gray-700 bg-white rounded px-2 py-1" type='text' onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address, line2:e.target.value}}))} value={profileData.address.line2 || ''} placeholder="Address Line 2" /> : profileData.address.line2}</p>
            </div>
            <div className='p-2'>
              <input onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name='' id='available' />
              <lable htmlFor="available" className='text-sm font-bold text-neutral-700'>Available</lable>
            </div>
            <div>
             { isEdit ? <button onClick={updateProfile} className="px-10 py-2 border border-gray-400 bg-primary text-white rounded-full hover:text-gray-600 font-semibold cursor-pointer hover:bg-gray-50 transition-colors">Save</button> : <button onClick={() => setIsEdit(true)} className="px-10 py-2 border border-gray-400 rounded-full hover:text-gray-600 bg-primary text-white font-semibold cursor-pointer hover:bg-gray-50 transition-colors">Edit</button>}
            </div>
          </div>

          </div>
      )}
   
    </div>
  )
}

export default DoctorProfile