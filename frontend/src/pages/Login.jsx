import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate()

  const [login, setLogin] = useState('Sign Up');

  const {backend_url, token, setToken} = useContext(AppContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (login === 'Sign Up') {

        const {data} = await axios.post(backend_url + '/api/user/register', {name, email, password})
        if (data.success) {
          localStorage.setItem('usertoken', data.token);
          setToken(data.token)

          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
        
      } else{
         const {data} = await axios.post(backend_url + '/api/user/login', {email, password})
        if (data.success) {
          localStorage.setItem('usertoken', data.token);
          setToken(data.token)

          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='flex flex-col p-4 items-center justify-between'>
      <div className='flex flex-col p-4 items-center justify-between border-0 border-black rounded-lg bg-gray-100 shadow-2xl'>
        <div>
          <h1 className='text-primary text-xl font-extrabold text-center'>{login === 'Sign Up' ? "Create an account": "Login"}</h1>
          <p className='mt-2 text-gray-600'>{login === 'Sign Up' ? "Create a new account": "Login to your account"}</p>
        </div>

        <div className='flex flex-col'>
          {login === 'Sign Up' && <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Full Name' className='p-3 text-gray-400 border-0 rounded-lg bg-gray-200 mt-2 w-full'/>}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='p-3 text-gray-400 border-0 rounded-lg bg-gray-200 mt-2'/>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='p-3 text-gray-400 border-0 rounded-lg bg-gray-200 mt-2'/>
        </div>
        {
          login === "Sign Up" ? 
          <p className='mt-2 text-gray-600'>Already have an account?<span onClick={() => setLogin("Login")} className='text-primary italic font-semibold cursor-pointer underline'>Login here</span> </p> :
          <p className='mt-2 text-gray-600'>Don't have an account?<span onClick={() => setLogin("Sign Up")} className='text-primary italic font-semibold cursor-pointer underline'>Create account</span> </p>
        }
        
        
        
        <button onClick={handleSubmit} type='submit' className='bg-primary text-white text-lg font-bold boder-0 rounded-full p-3  mt-3 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-primary/95 px-8'>{login === 'Sign Up' ? "Create Account": "Login"}</button>
      </div>
    </div>
  )
}

export default Login