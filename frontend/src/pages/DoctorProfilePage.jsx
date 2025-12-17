import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  FaStar, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaHospital, 
  FaLanguage, FaVideo, FaClinicMedical, FaCalendarAlt, FaClock,
  FaArrowLeft, FaPhone
} from 'react-icons/fa';
import { useDoctor } from '../hooks/useDoctors';
import BookingModal from '../components/BookingModal';
import Loading from '../components/Loading';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { doctor, loading, error } = useDoctor(id);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Open booking modal if book=true in URL
  useEffect(() => {
    if (searchParams.get('book') === 'true' && doctor) {
      setIsBookingModalOpen(true);
    }
  }, [searchParams, doctor]);

  if (loading) {
    return <Loading message="Loading doctor profile..." />;
  }

  if (error || !doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "The doctor you're looking for doesn't exist."}</p>
        <Link to="/search" className="btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  const {
    name,
    speciality,
    location,
    experience,
    consultationFee,
    consultationType,
    languages,
    availabilitySlots,
    profileImage,
    about,
    education,
    hospital,
    rating,
    reviewCount
  } = doctor;

  const getConsultationTypes = () => {
    const types = [];
    if (consultationType === 'online' || consultationType === 'both') {
      types.push({ label: 'Online Consultation', icon: <FaVideo />, color: 'text-green-600 bg-green-100' });
    }
    if (consultationType === 'offline' || consultationType === 'both') {
      types.push({ label: 'In-Person Visit', icon: <FaClinicMedical />, color: 'text-blue-600 bg-blue-100' });
    }
    return types;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/search" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <div className="card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={profileImage}
                  alt={name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
                      <p className="text-primary-600 font-semibold text-lg">{speciality}</p>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold">{rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FaBriefcase className="mr-2 text-primary-500" />
                      <span>{experience} years of experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-primary-500" />
                      <span>{location}</span>
                    </div>
                    {hospital && (
                      <div className="flex items-center text-gray-600">
                        <FaHospital className="mr-2 text-primary-500" />
                        <span>{hospital}</span>
                      </div>
                    )}
                    {education && (
                      <div className="flex items-center text-gray-600">
                        <FaGraduationCap className="mr-2 text-primary-500" />
                        <span>{education}</span>
                      </div>
                    )}
                  </div>

                  {/* Consultation Types */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getConsultationTypes().map((type, index) => (
                      <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${type.color}`}>
                        {type.icon}
                        <span className="ml-1">{type.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{about}</p>
            </div>

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaLanguage className="mr-2 text-primary-500" />
                  Languages Spoken
                </h2>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {availabilitySlots && availabilitySlots.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-500" />
                  Availability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availabilitySlots.filter(slot => slot.isAvailable).map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{slot.day}</span>
                      <span className="flex items-center text-gray-600">
                        <FaClock className="mr-1 text-primary-500" />
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Appointment</h2>
              
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="text-2xl font-bold text-primary-600">₹{consultationFee}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-2 text-primary-500" />
                  <span>Available slots for next 30 days</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2 text-primary-500" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full btn-primary py-3 text-lg"
              >
                Book Appointment
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Or call to book:
                </p>
                <a href="tel:+919876543210" className="inline-flex items-center text-primary-600 font-medium mt-1">
                  <FaPhone className="mr-2" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={doctor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default DoctorProfilePage;
