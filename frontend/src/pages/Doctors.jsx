import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const Doctors = () => {

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors, getDoctorList }  = useContext(AppContext);

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    }
    else{
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
    getDoctorList()
  },[doctors,speciality])

  const navigate = useNavigate();

  

  const specialties = [...new Set(doctors.map((doc) => doc.speciality))]

  const handleSpecialityClick = (spec) => {
    if (speciality === spec) {
      navigate('/doctors');
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  return (
    <div className="mx-16 gap-4">
      <h1 className='text-2xl text-blue-500 text-center my-3'>Browse through our specialied doctors.</h1>
      <div className='flex gap-4'>
        <div className='p-6 gap-3 bg-gray-100 border rounded-lg border-blue-400 h-fit'>
          <p onClick={() => navigate('/doctors')} className='p-2 text-center cursor-pointer text-lg font-medium border-2 border-gray-100 rounded-lg w-full hover:bg-blue-300 transition-all duration-500'>All Doctors</p>

          {specialties.map((spec) => (
            <p key={spec} onClick={() => handleSpecialityClick(spec)} className='p-2 text-center cursor-pointer text-lg font-medium border-2 border-gray-100 rounded-lg w-full hover:bg-blue-300 transition-all duration-500'>{spec}</p>
          ))}
        </div>
        <div className="w-full gap-4 grid grid-cols-auto pt-5 gap-y-6 px-4 sm:px-0">
          {filterDoc.map((item, index) => (
          <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500 shadow-2xl ">
            <img
              className="bg-blue-100 p-2 h-[320px] transition-all duration-500 shadow-2xl hover:bg-primary"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
                <div className={`flex items-center gap-2 text-center text-sm ${item.available ? 'text-green-500' : 'text-red-500'} `}>
                  <span className={`inline-block w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span> <span>{item.available ? 'Available': 'Not Available'}</span>  
                </div>
              <h1 className="text-lg font-medium">{item.name}</h1>
              <h2 className="text-sm text-gray-500">{item.degree}</h2>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors