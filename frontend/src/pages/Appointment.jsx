import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoc from "../components/RelatedDoc";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const params = useParams();
  const paramId = params.docId ?? params.id ?? params.doctorId;

  const ctx = useContext(AppContext) || {};
  const { doctors = [], token, backend_url, getDoctorList } = ctx;
 
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();
  
  const getAvailableSlots = async () => {
    setDocSlots([]);

    const today = new Date();
    const allDaysSlots = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);

      // determine start time for the day
      const start = new Date(day);
      if (i === 0) {
        // today: start at next available slot or 8:30
        const now = new Date();
        let nextSlotHour = now.getHours();
        let nextSlotMinute = now.getMinutes();
        if (nextSlotHour < 8 || (nextSlotHour === 8 && nextSlotMinute < 30)) {
          start.setHours(8, 30, 0, 0);
        } else {
          // round up to next 30-min slot
          if (nextSlotMinute < 30) {
            start.setHours(nextSlotHour, 30, 0, 0);
          } else {
            start.setHours(nextSlotHour + 1, 0, 0, 0);
          }
          // but not before 8:30
          if (start.getHours() < 8 || (start.getHours() === 8 && start.getMinutes() < 30)) {
            start.setHours(8, 30, 0, 0);
          }
        }
      } else {
        start.setHours(8, 30, 0, 0);
      }

      // end time is 21:00 for every day
      const endTime = new Date(day);
      endTime.setHours(21, 0, 0, 0);

      const slots = [];
      const cursor = new Date(start);
      while (cursor < endTime) {
        slots.push({
          datetime: new Date(cursor),
          time: cursor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        cursor.setMinutes(cursor.getMinutes() + 30);
      }

      allDaysSlots.push(slots);
    }

    setDocSlots(allDaysSlots);
  };


  const bookAppointment = async () => {

    if (!token) {
      toast.warn('Login to book a doctor');
      return navigate('/login');
    }

    try {
      const slotItem = docSlots?.[slotIndex]?.[0];
      if (!slotItem) {
        toast.error('No available slot to book');
        return;
      }

      const dateObj = slotItem.datetime instanceof Date ? slotItem.datetime : new Date(slotItem.datetime);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const slotTime = selectedTime;

      if (!slotTime) {
        toast.warn('Please select a time slot');
        return;
      }

      const docIdToSend = docInfo?._id ?? paramId;

      const { data } = await axios.post(
        `${backend_url}/api/user/book-appointment`,
        { docId: docIdToSend, slotDate, slotTime },
        { headers: { usertoken: token } }
      );

      if (data && data.success) {
        toast.success(data.message);
        getDoctorList?.();
        navigate('/my-appointment');
      } else {
        toast.error((data && data.message) || 'Booking failed');
      }
      
    } catch (error) {
     // console.log(error.message);
      toast.error("Doctor not available for booking");
    }

  };

  useEffect(() => {
    //console.debug("Appointment: doctors ->", doctors, "paramId ->", paramId);

    if (!paramId || doctors.length === 0) {
      setDocInfo(null);
      return;
    }

    const found = doctors.find((doc) => String(doc._id) === String(paramId));
    setDocInfo(found ?? null);
    //console.debug("Appointment: found ->", found);
  }, [doctors, paramId]);


  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    //console.log(docSlots);
  }, [docSlots]);

  const isSlotBooked = (slotDate, slotTime) => {
    if (!docInfo?.slots_booked) return false;
    
    const bookedTimes = docInfo.slots_booked[slotDate];
    if (!bookedTimes) return false;
    
    return bookedTimes.includes(slotTime);
  };

  if (doctors.length === 0) {
    return <div className="m-10">Loading doctors…</div>;
  }

  if (!docInfo) {
    return <div className="m-10">Doctor not found.</div>;
  }

  return (
    <div className="m-10">
      <div className="flex justify-around p-10 gap-4 items-center border border-blue-400 rounded-lg">
        <div>
          <img
            className="w-100 bg-primary rounded-lg"
            src={docInfo.image}
            alt={docInfo.name || "Doctor image"}
            srcSet={docInfo.srcSet || undefined}
          />
        </div>
        <div className="w-[700px] mt-3">
          <h1 className="text-blue-600 text-lg">{docInfo.name}</h1>
          <h2 className="text-lg font-black">{docInfo.speciality}</h2>
          <h3 className="text-lg font-black">{docInfo.degree}</h3>
          <h3 className="text-lg font-black">{docInfo.experience}</h3>
          <p className="font-semibold">{docInfo.about}</p>
          <p className="mt-6 text-lg font-semibold">Fees:Ksh {docInfo.fees}</p>

          {/* ------------Book by date and time------------ */}
          <div className="mt-4 items-center">
            <div>
              <h1 className="text-blue-600 text-xl">Book by Date and Time:-</h1>

              {/* ----- Booking slots ----- */}
              <div className="sm:ml-36 items-start sm:pl-4 mt-4 font-medium text-gray-700">
                <div className="flex gap-3 items-center justify-start w-full mt-4">
                  {docSlots.length > 0 &&
                    docSlots.map((item, index) => (
                      <div
                        onClick={() => setSlotIndex(index)}
                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                          slotIndex === index
                            ? `bg-primary text-white`
                            : `bg-gray-300 border border-gray-400`
                        }`}
                        key={index}
                      >
                        <p>
                          {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                        </p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-3">
                  {docSlots.length > 0 && docSlots[slotIndex] &&
                    docSlots[slotIndex].map((item, index) => {
                      const dateObj = item.datetime instanceof Date ? item.datetime : new Date(item.datetime);
                      const day = dateObj.getDate();
                      const month = dateObj.getMonth() + 1;
                      const year = dateObj.getFullYear();
                      const slotDate = `${day}_${month}_${year}`;
                      
                      const booked = isSlotBooked(slotDate, item.time);
                      
                      if (booked) return null;
                      
                      return (
                        <p
                          onClick={() => setSelectedTime(item.time)}
                          className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                            item.time === selectedTime
                              ? `bg-primary text-white`
                              : `bg-gray-300 border border-gray-400`
                          }`}
                          key={index}
                        >
                          {item.time.toLowerCase()}
                        </p>
                      );
                    })}
                </div>
                <button onClick={() => bookAppointment()} className="bg-primary/80 p-3 rounded-full cursor-pointer text-white font-semibold mt-2 transition-all duration-500 hover:scale-105 hover:bg-primary">Book Appointment</button>
              </div>

            </div>
          </div>
        </div>

      </div>

      <RelatedDoc docId={docInfo._id} speciality={docInfo.speciality}/>

    </div>
  );
};

export default Appointment;

