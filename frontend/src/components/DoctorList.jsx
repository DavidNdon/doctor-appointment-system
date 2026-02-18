import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorList = () => {

    const navigate = useNavigate();
    const {doctors} = useContext(AppContext)

  return (
    <div className="flex flex-col items-center my-16 gap-4 md:mx-10">
      <h1 className="text-primary font-bold text-2xl">Our Top Doctors</h1>
      <p className="text-black font-light text-lg">Our list of specialize, well-learned doctors</p>
      <div className="w-full gap-4 grid grid-cols-auto pt-5 gap-y-6 px-4 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500 shadow-2xl">
            <img
              className="bg-blue-100 p-2 h-[320px]"
              src={item.image}
              alt=""
              srcSet=""
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
  );
};

export default DoctorList;
