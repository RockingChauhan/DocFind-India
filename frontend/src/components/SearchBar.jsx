import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';

const SearchBar = ({ specialities = [], locations = [], initialSpeciality = '', initialLocation = '' }) => {
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState(initialSpeciality);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (speciality) params.set('speciality', speciality);
    if (location) params.set('location', location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl shadow-lg">
        {/* Speciality Select */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaUserMd className="inline mr-2 text-primary-600" />
            Speciality
          </label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="input-field text-gray-800"
          >
            <option value="">Select Speciality</option>
            {specialities.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Location Select/Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline mr-2 text-primary-600" />
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field text-gray-800"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center w-full md:w-auto px-8"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
