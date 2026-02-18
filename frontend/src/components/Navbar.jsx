import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();

  const {token, setToken, userData} = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logOut =  () => {
   setToken(false)
   localStorage.removeItem('usertoken')
  } 
  

  return (
    <div className="flex justify-between items-center pt-2 border-b mr-4 ml-4">
      <img className="w-22 h-22" src={assets.logo} alt="logo" srcSet="" />
      <ul className=" hidden md:flex gap-16 list-none">
        <NavLink to="/">
          <li className="font-medium text-lg">Home</li>
          <hr className="border-none outline-none h-0.5 w-2/3 m-auto bg-blue-600 hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="font-medium text-lg">All Doctors</li>
          <hr className="border-none outline-none h-0.5 w-2/3 m-auto bg-blue-600 hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="font-medium text-lg">About</li>
          <hr className="border-none outline-none h-0.5 w-2/3 m-auto bg-blue-600 hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="font-medium text-lg">Contact</li>
          <hr className="border-none outline-none h-0.5 w-2/3 m-auto bg-blue-600 hidden" />
        </NavLink>
      </ul>
      <div>
        {token ? (
          <div className="flex gap-2 items-center group relative">
            <div className="w-12 rounded-full object-cover bg-black">
              <img
            onClick={() => setShowMenu(true)}
              className="w-10 rounded-full bg-black"
              src={userData.image}
              alt=""
              srcSet=""
            />
            </div>
            <img
            onClick={() => setShowMenu(true)}
              className="text-black w-2.5 cursor-pointer"
              src={assets.dropdown_icon}
              alt=""
              srcSet=""
            />
            <div className="absolute top-0 right-0 text-base font-medium p-14 text-black z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4">
                <h3 onClick={() => navigate('/my-profile')} className="hover:bg-white p-2 cursor-pointer rounded">My Profile</h3>
                <h3 onClick={() => navigate('/my-appointment')} className="hover:bg-white p-2 cursor-pointer rounded">My Appointment</h3>
                <h3 onClick={logOut} className="hover:bg-white p-2 cursor-pointer rounded">logout</h3>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-blue-500 text-white p-4 rounded-full hidden md:block">
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
