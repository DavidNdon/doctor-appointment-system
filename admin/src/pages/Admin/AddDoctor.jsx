import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Adddoctor = () => {

const [docImg, setDocImg] = useState(null)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [experience, setExperience] = useState('1 year')
const [fees, setFees] = useState('')
const [about, setAbout] = useState('')
const [speciality, setSpeciality] = useState('General Physician')
const [degree, setDegree] = useState('')
const [address1, setAddress1] = useState('')
const [address2, setAddress2] = useState('')

const {backend_url, adminToken} = useContext(AdminContext)

const handleSubmit = async (event) => {
  event.preventDefault()

  try {

    if(!docImg){
      return toast.error("Image must be filled")
    }

  const formData = new FormData();

  formData.append("image", docImg);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("experience", experience);
  formData.append("fees", Number(fees));
  formData.append("about", about);
  formData.append("speciality", speciality);
  formData.append("degree", degree);
  formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

  // formData.forEach((value, key) => {
  //   console.log(`${key} : ${value}`) 
  // })

  const {data} = await axios.post(backend_url + '/api/admin/add-doctor', formData, {
    headers: {
      'admin-token': adminToken
    }
  })

  if (data.success) {
    toast.success(data.message)

    setDocImg(false);
    setName("");
    setPassword("");
    setEmail("");
    setAddress1("");
    setAddress2("");
    setDegree("");
    setAbout("");
    setFees("");

  } else {
    toast.error(data.message)
  }

    
  } catch (error) {
    console.error('Add doctor error:', error)
    const message = error?.response?.data?.message || error.message || 'Something went wrong'
    toast.error(message)
  }

}

  return (
      <form onSubmit={handleSubmit} className='m-5 w-full'>
        <p>Add Doctor</p>

        <div className='bg-gray-50 p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
          <div className='flex items-center mb-8 gap-4 text-gray-500'>
            <label htmlFor="doc-img">
              <img className='w-16 cursor-pointer bg-gray-700 rounded-full' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="doctor" srcSet="" />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>
              Upload <br />
              image
            </p>
          </div>

          <div className='flex flex-col lg:flex-row items-start gap-10'>
            <div className='w-full flex flex-col lg:flex-1 gap-4 '>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Doctor name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='p-2 border-0 rounded ' type="text" placeholder="Name" required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Doctor email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email}  className='p-2 border-0 rounded ' type="email" placeholder="email" required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Doctor password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password}  className='p-2 border-0 rounded ' type="password" placeholder="password" required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Doctor Experience</p>
                <select onChange={(e) => setExperience(e.target.value)} value={experience}  className='p-2 border-0 rounded ' name="" id="">
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                  <option value="6 years">6 years</option>
                  <option value="7 years">7 years</option>
                  <option value="8 years">8 years</option>
                  <option value="9 years">9 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Fees</p>
                <input onChange={(e) => setFees(e.target.value)} value={fees}  className='p-2 border-0 rounded ' type="number" placeholder="fees" required />
              </div>
            </div>

            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Speciality</p>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}  className='p-2 border-0 rounded ' name="" id="">
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
                <input onChange={(e) => setSpeciality(e.target.value)} className='p-2 border-0 rounded ' type="text" placeholder="Enter custom speciality" />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Education</p>
                <input onChange={(e) => setDegree(e.target.value)} value={degree}  className='p-2 border-0 rounded ' type="text" placeholder="education" required />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-gray-500 font-semibold p-2'>Address</p>
                <input onChange={(e) => setAddress1(e.target.value)} value={address1}  className='p-2 border-0 rounded ' type="text" placeholder="address 1" required />
                <input onChange={(e) => setAddress2(e.target.value)} value={address2}  className='p-2 border-0 rounded ' type="text" placeholder="address 2" required />
              </div>

            </div>
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <p className='text-gray-500 font-semibold p-2'>About Doctor</p>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about}  className='p-2 border-0 rounded '  placeholder="description about doctor" rows={5} required></textarea>
          </div>
          <button className='bg-primary text-white text-lg font-bold boder-0 rounded-full py-3 px-10 mt-3 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-primary/95'>Add Doctor</button>
        </div>

        
      </form>
  );
}

export default Adddoctor