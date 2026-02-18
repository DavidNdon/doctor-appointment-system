import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RelatedDoc = ({docId, speciality}) => {

    const {doctors} = useContext(AppContext);

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, docId, speciality])

    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-16 gap-4 md:mx-10">
      <h1 className="text-primary font-bold text-2xl">Related Doctors</h1>
      <p className="text-black font-light text-lg">Below are the related Doctors in the same speciality</p>
      <div className="w-full gap-4 grid grid-cols-auto pt-5 gap-y-6 px-4 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(100,100)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500 shadow-2xl">
            <img
            key={index}
              className="bg-blue-100 p-2 h-[320px]"
              src={item.image}
              alt=""
              srcset=""
              // onClick={() => navigate(`/appointment/${item._id}`)}
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
      <button onClick={() => navigate('/doctors')} className="p-2 bg-primary m-6 cursor-pointer hover:bg-indigo-500 hover:scale-x-[1.1] transition-all duration-500 text-lg font-light text-white rounded-full">Explore More</button>
    </div>
  )
}

export default RelatedDoc