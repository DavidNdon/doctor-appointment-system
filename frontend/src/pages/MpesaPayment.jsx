import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MpesaPayment = ({ appointment, backend_url, token, onPaymentSuccess, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Ensure it starts with 254 or 07
    if (value.length > 0) {
      if (!value.startsWith('254') && !value.startsWith('07')) {
        if (value.startsWith('7')) {
          value = '254' + value;
        }
      }
    }
    
    setPhoneNumber(value);
  };

  const validatePhoneNumber = () => {
    // Valid M-Pesa numbers: 254711... or 0711...
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (!cleanNumber) {
      toast.error('Please enter a phone number');
      return false;
    }

    if (cleanNumber.length < 10) {
      toast.error('Phone number must be at least 10 digits');
      return false;
    }

    // if (!cleanNumber.startsWith('254')) {
    //   toast.error('Phone number must start with country code 254');
    //   return false;
    // }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        backend_url + '/api/user/payment-mpesa',
        {
          appointmentId: appointment._id,
          phoneNumber: phoneNumber,
          amount: appointment.amount,
        },
        { headers: { usertoken: token } }
      );

      if (data.success) {
        toast.success('Payment initiated! Check phone for M-Pesa prompt.');
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 1500);
      } else {
        toast.error(data.message || 'Payment failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment error: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white h-[100vh] rounded-2xl shadow-2xl max-w-md w-full overflow-scroll">
        {/* M-Pesa Header */}
        <div className="bg-gradient-to-r from-[#1AB655] to-[#0f8a3f] text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">M-Pesa</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-green-100 text-sm">Secure Payment</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Doctor</span>
              <span className="font-semibold text-gray-900">{appointment.docData.name}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Appointment Date</span>
              <span className="font-semibold text-gray-900">{appointment.slotDate}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Time</span>
              <span className="font-semibold text-gray-900">{appointment.slotTime}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-gray-900 font-bold">Amount to Pay</span>
              <span className="text-2xl font-bold text-[#1AB655]">Ksh {appointment.amount}</span>
            </div>
          </div>

          {/* Phone Input Form */}
          <form onSubmit={handlePayment}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-600 font-semibold">🇰🇪</span>
                <input
                  type="tel"
                  placeholder="0711223344 or 254711223344"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1AB655] focus:outline-none focus:ring-2 focus:ring-[#1AB655] focus:ring-opacity-50 transition"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter your registered M-Pesa number
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-6 rounded">
              {/* <p className="text-xs text-blue-800">
                <span className="font-semibold">ℹ️ Note:</span> You will receive an M-Pesa prompt on your phone. Enter your M-Pesa PIN to complete the payment.
              </p> */}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1AB655] to-[#0f8a3f] text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>💳</span>
                    Pay Ksh {appointment.amount}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
               Secure payment powered by M-Pesa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;
