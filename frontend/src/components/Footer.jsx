import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

  return (
    <div className=' rounded-lg px-6 pb-4 sm:px-10 md:px-14 lg:12 my-20 md:mx-10 bg-primary text-white'>
      <div className="flex gap-4 p-5 justify-around border-b-2 border-gray-600">
        <div className="w-[400px]">
          <img src={assets.logo} className="w-16" alt="logo" srcset="" />
          <p className="text-lg pt-4 line-clamp-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis laborum, autem aspernatur hic corporis vel, labore, laboriosam a molestias earum fugit at dolor expedita quas?</p>
        </div>
        <div>
            <h1 className="text-2xl font-bold mb-6">Company</h1>
            <ul className="flex flex-col">
                <li onClick={() => navigate('/')} className="cursor-pointer gap-2 hover:text-blue-500 transition-all duration-500">Home</li>
                <li onClick={() => navigate('/doctors')} className="cursor-pointer gap-2 hover:text-blue-500 transition-all duration-500">All Doctors</li>
                <li onClick={() => navigate('/about')} className="cursor-pointer gap-2 hover:text-blue-500 transition-all duration-500">About Us</li>
                <li onClick={() => navigate('/contact')} className="cursor-pointer gap-2 hover:text-blue-500 transition-all duration-500">Contact Us</li>
            </ul>
        </div>
        <div>
            <h1 className="text-2xl font-bold mb-6">Get Intouch</h1>
            <p>+254789096754</p>
            <p>bookingdoc@gmail.com</p>
        </div>
      </div>
      <p className="text-xs text-center text-gray-400 mt-10">&copy; 2025 Doctors Appointment. All rights reserved.</p>
    </div>
  );
};

export default Footer;
