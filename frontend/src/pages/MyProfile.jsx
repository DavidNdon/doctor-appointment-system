import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
const {userData, setUserData, backend_url, token} = useContext(AppContext);

  const [isEdit, setIsEdit] =useState(false);

  const onSaveHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      
      if (userData.image && userData.image instanceof File) {
        formData.append('image', userData.image);
      }

      const {data} = await axios.post(backend_url + '/api/user/update-profile', formData, {headers: {'usertoken': token}});
      
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return userData && (
    <div className='items-center justify-start'>
      <div className="max-w-lg p-8  rounded-lg font-sans">
  {/* Profile Images */}
  <div className="flex gap-4 mb-6">
    {isEdit ?
    <input type='file' onChange={(e) => setUserData((prev) => ({...prev,image:e.target.files[0]}))} className="border border-gray-300 rounded px-2 py-1"/>
     :
     userData.image ? 
     <img className="w-24 h-24 rounded-full object-cover bg-primary/20" src={userData.image} alt="Profile" />
     :
     <div className="w-24 h-24 rounded-lg bg-indigo-50 flex items-center justify-center text-gray-300 text-3xl">
        👤
     </div>
    }
    
  </div>

  {
    isEdit 
    ? <input type='text' value={userData.name} onChange={(e) => setUserData((prev) => ({...prev,name:e.target.value}))} className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"/>
    : <h1 className="text-3xl font-bold text-gray-800 mb-4">{userData.name}</h1>
  }
  
  
  <hr className="border-gray-200 mb-6" />

  {/* Contact Information */}
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest underline mb-4">Contact Information</h3>
      <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
        <p className="text-gray-700 font-medium">Email id:</p>
        <p className="text-blue-500">{userData.email}</p>
        
        <p className="text-gray-700 font-medium">Phone:</p>
        {
      isEdit 
      ? <input type='text' value={userData.phone} onChange={(e) => setUserData((prev) => ({...prev,phone:e.target.value}))} className="border border-gray-300 rounded px-2 py-1"/>
      : <p className="text-blue-400">{userData.phone}</p>
    }
        
        
        {/* <p className="text-gray-700 font-medium">Address:</p>
        {isEdit
        ? <div className="col-span-1">
        <input type='text' placeholder='Line 1' value={userData.address?.line1 || ''} onChange={(e) => setUserData((prev) => ({...prev,address:{...prev.address,line1: e.target.value}}))} className="w-full border border-gray-300 rounded px-2 py-1 mb-2"/>
        <input type='text' placeholder='Line 2' value={userData.address?.line2 || ''} onChange={(e) => setUserData((prev) => ({...prev,address:{...prev.address,line2: e.target.value}}))} className="w-full border border-gray-300 rounded px-2 py-1"/> </div>
        : <p className="text-gray-500">{userData.address?.line1} <br />{userData.address?.line2} </p>
        } */}
        
      </div>
    </div>

    {/* Basic Information */}
  <div className="mb-8">
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest underline mb-4">Basic Information</h3>
    <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
      <p className="text-gray-700 font-medium">Gender:</p>
      {
        isEdit ?
        <select onChange={(e) => setUserData(prev => ({...prev, gender:e.target.value}))} value={userData.gender} className="border border-gray-300 rounded px-2 py-1">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>:
        <p className="text-gray-500">{userData.gender}</p>
      }
      
      
      <p className="text-gray-700 font-medium">Birthday:</p>
      {
        isEdit ?
        <input type='date' value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob:e.target.value}))} className="border border-gray-300 rounded px-2 py-1"/>
        :
        <p className="text-gray-500">{userData.dob}</p>
      }
    </div>
  </div>

  {/* Buttons onClick={() => setIsEdit(true)}*/}
  <div className="flex gap-4">
    <button onClick={() => setIsEdit(true)} className="px-10 py-2 border border-gray-400 rounded-full text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">Edit</button>
    <button onClick={onSaveHandler} className="px-10 py-2 border border-gray-400 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">Save information</button>
  </div>
</div>
    </div>
  )
}

export default MyProfile