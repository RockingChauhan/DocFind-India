import { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaVideo, FaClinicMedical } from 'react-icons/fa';
import useAppointment from '../hooks/useAppointment';

const BookingModal = ({ doctor, isOpen, onClose }) => {
  const { bookAppointment, getBookedSlots, loading, error, success, resetState } = useAppointment();
  const [bookedSlots, setBookedSlots] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    consultationType: doctor?.consultationType === 'online' ? 'online' : 
                       doctor?.consultationType === 'offline' ? 'offline' : 'online',
    notes: ''
  });

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  // Fetch booked slots when date changes
  useEffect(() => {
    if (formData.date && doctor?._id) {
      getBookedSlots(doctor._id, formData.date).then(setBookedSlots);
    }
  }, [formData.date, doctor?._id]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetState();
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        date: '',
        time: '',
        consultationType: doctor?.consultationType === 'online' ? 'online' : 
                         doctor?.consultationType === 'offline' ? 'offline' : 'online',
        notes: ''
      });
    }
  }, [isOpen, doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment({
        doctorId: doctor._id,
        ...formData
      });
    } catch (err) {
      // Error handled by hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="text-xl" />
          </button>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Booked!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment with {doctor?.name} has been successfully scheduled.
              </p>
              <button onClick={onClose} className="btn-primary">
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Book Appointment</h3>
                <p className="text-gray-600">with {doctor?.name}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUser className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="patientPhone"
                    value={formData.patientPhone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="input-field"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="inline mr-2" />
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                    {timeSlots.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                          className={`px-2 py-1 text-sm rounded border transition-colors ${
                            formData.time === slot
                              ? 'bg-primary-600 text-white border-primary-600'
                              : isBooked
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consultation Type */}
                {doctor?.consultationType === 'both' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="online"
                          checked={formData.consultationType === 'online'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <FaVideo className="mr-1 text-green-600" />
                        Online
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="offline"
                          checked={formData.consultationType === 'offline'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <FaClinicMedical className="mr-1 text-blue-600" />
                        In-Person
                      </label>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    className="input-field"
                    placeholder="Any specific concerns or requirements"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.date || !formData.time}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? 'Booking...' : `Book Appointment - ₹${doctor?.consultationFee}`}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
