import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaVideo, FaClinicMedical } from 'react-icons/fa';

const DoctorCard = ({ doctor, viewMode = 'grid' }) => {
  const {
    _id,
    name,
    speciality,
    location,
    experience,
    consultationFee,
    consultationType,
    profileImage,
    rating,
    reviewCount,
    languages
  } = doctor;

  const getConsultationBadge = () => {
    switch (consultationType) {
      case 'online':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaVideo className="mr-1" /> Online
          </span>
        );
      case 'offline':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaClinicMedical className="mr-1" /> In-Person
          </span>
        );
      default:
        return (
          <div className="flex gap-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <FaVideo className="mr-1" /> Online
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <FaClinicMedical className="mr-1" /> In-Person
            </span>
          </div>
        );
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="card p-4 flex flex-col md:flex-row gap-4">
        <img
          src={profileImage}
          alt={name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-primary-600 font-medium">{speciality}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaBriefcase className="mr-1" />
                <span>{experience} years experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaMapMarkerAlt className="mr-1" />
                <span>{location}</span>
              </div>
            </div>
            <div className="mt-2 md:mt-0 md:text-right">
              <div className="flex items-center md:justify-end">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{rating}</span>
                <span className="text-gray-500 text-sm ml-1">({reviewCount} reviews)</span>
              </div>
              <p className="text-xl font-bold text-primary-600 mt-1">₹{consultationFee}</p>
              <p className="text-xs text-gray-500">per consultation</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {getConsultationBadge()}
            {languages && languages.slice(0, 2).map((lang, index) => (
              <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {lang}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Link to={`/doctors/${_id}`} className="btn-secondary text-sm">
              View Profile
            </Link>
            <Link to={`/doctors/${_id}?book=true`} className="btn-primary text-sm">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="relative flex items-center justify-center bg-gray-400 aspect-[4/3] overflow-hidden">
        <img
          src={profileImage}
          alt={name}
          className="w-[145px] h-[145px] object-cover object-center rounded-full border-4 border-white shadow-md"
        />
        <div className="absolute top-2 right-2">
          {getConsultationBadge()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-primary-600 font-medium text-sm">{speciality}</p>
        
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-semibold text-sm">{rating}</span>
          <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FaBriefcase className="mr-1" />
          <span>{experience} yrs exp</span>
          <span className="mx-2">•</span>
          <FaMapMarkerAlt className="mr-1" />
          <span className="truncate">{location}</span>
        </div>

        <div className="border-t border-gray-100 mt-3 pt-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-primary-600">₹{consultationFee}</p>
              <p className="text-xs text-gray-500">per consultation</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link to={`/doctors/${_id}`} className="btn-secondary text-sm flex-1 text-center">
            View Profile
          </Link>
          <Link to={`/doctors/${_id}?book=true`} className="btn-primary text-sm flex-1 flex items-center justify-center">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
