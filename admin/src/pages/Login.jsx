import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');

    const {setAdminToken, backend_url} = useContext(AdminContext);
    const {setDocToken} = useContext(DoctorContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            if(state === 'Admin'){

                const {data} = await axios.post(backend_url + '/api/admin/admin-login', {email, password})
                if(data.success){
                    toast.success(data.message);
                    setTimeout(() => {
                        localStorage.setItem('adminToken', data.token)
                        setAdminToken(data.token)
                    }, 2000);
                }else{
                    toast.error(data.message);
                }

            }else{
                const {data} = await axios.post(backend_url + '/api/doctor/login', {email, password})
                 if(data.success){
                    toast.success(data.message);
                    setTimeout(() => {
                        localStorage.setItem('docToken', data.token)
                        setDocToken(data.token)
                    }, 2000);
                    console.log(data.token)
                }else{
                    toast.error(data.message);
                }

            }

        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-xl shadow-2xl'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='p-2 w-full text-gray-400 border-0 rounded-lg bg-gray-200 mt-2' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='p-2 w-full text-gray-400 border-0 rounded-lg bg-gray-200 mt-2' type="password" required />
                </div>
                <button className='bg-primary text-white text-lg font-bold boder-0 rounded-lg p-3 w-full mt-3 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-primary/95'>Login</button>

                { state === 'Admin' ? 
                <p className='text-sm'>Doctor's login? <span onClick={() => setState('Doctor')} className='text-primary italic font-semibold cursor-pointer underline'>Click here</span></p>
                :<p className='text-sm'>Admin login? <span onClick={() => setState('Admin')} className='text-primary italic font-semibold cursor-pointer underline'>Click here</span></p>
                }
            </div>
        </form>
    </div>
  )
}

export default Login