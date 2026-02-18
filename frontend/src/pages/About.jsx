import React from 'react'
import about from '../assets/about_image.png'

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">About <span className="text-indigo-600">Us</span></h1>

        <img src={about} className="mx-auto w-64 md:w-80 rounded-lg border border-gray-200 shadow-sm mb-6" alt="About" />

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Heritage of Care</h2>
            <p className="text-gray-600 leading-7 px-4">
              Established to serve the vibrant and growing population of Nairobi's Eastlands, <span className="font-semibold">Mama Lucy Kibaki Hospital</span> has evolved from a local health facility into a premier Level 5 County Referral Hospital. Named in honor of the former First Lady for her advocacy in maternal and child health, the hospital was commissioned to bridge the gap in accessible, specialized medical care. Over the years, we have expanded our capacity to provide comprehensive services—from emergency interventions to specialized surgeries—becoming a beacon of hope and healing for thousands of families every year.
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Modernizing Your Patient Journey</h2>
            <p className="text-gray-700 leading-relaxed px-4">
              As we grow, our commitment to patient dignity remains at the forefront. We recognize that in a bustling city, your time is your most valuable asset. Our <span className="text-indigo-600 font-medium">Online Doctor Appointment System</span> is a strategic response to the traditional challenges of healthcare access. By transitioning to a digital-first approach, we are effectively <span className="font-semibold text-gray-900">decongesting our corridors</span>, allowing for a more serene and sterile environment that promotes faster recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <h4 className="font-semibold text-indigo-600 mb-1">Time Efficiency</h4>
              <p className="text-sm text-gray-600">Skip the early morning queues. Arrive just in time for your scheduled slot.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <h4 className="font-semibold text-indigo-600 mb-1">Guaranteed Access</h4>
              <p className="text-sm text-gray-600">A confirmed booking ensures your preferred specialist is available.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <h4 className="font-semibold text-indigo-600 mb-1">Better Preparation</h4>
              <p className="text-sm text-gray-600">Medical records can be retrieved in advance for a thorough consultation.</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic mt-6">
            At Mama Lucy Kibaki Hospital, we are not just treating illnesses; we are honoring our history by embracing the future of efficient, organized, and patient-centered healthcare.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About