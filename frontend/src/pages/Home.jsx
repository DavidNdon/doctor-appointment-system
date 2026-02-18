import React from 'react'
import Hero from '../components/Hero'
import Speciality from '../components/Speciality'
import DoctorList from '../components/DoctorList'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className=' m-6 bg-background'>
       <Hero />
       <Speciality />
       <DoctorList />
       <Banner />
    </div>
  )
}

export default Home