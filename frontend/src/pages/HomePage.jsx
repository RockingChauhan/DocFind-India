import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaHeartbeat, FaShieldAlt, FaStethoscope, FaBrain, FaChild, FaBone, FaEye, FaTooth } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import { useFilterOptions } from '../hooks/useDoctors';
import hero from '../assets/HeroImage.jpg';
const HomePage = () => {
  const { specialities, locations, loading } = useFilterOptions();

  const features = [
    {
      icon: <FaUserMd className="text-3xl text-primary-600" />,
      title: 'Expert Doctors',
      description: 'Access to thousands of verified and experienced doctors across all specialities'
    },
    {
      icon: <FaCalendarCheck className="text-3xl text-primary-600" />,
      title: 'Easy Booking',
      description: 'Book appointments instantly with just a few clicks, anytime, anywhere'
    },
    {
      icon: <FaHeartbeat className="text-3xl text-primary-600" />,
      title: 'Quality Care',
      description: 'Receive personalized care from top-rated healthcare professionals'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-primary-600" />,
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security'
    }
  ];

  const popularSpecialities = [
    { name: 'Cardiologist', icon: <FaHeartbeat />, color: 'bg-red-100 text-red-600' },
    { name: 'Dermatologist', icon: <FaUserMd />, color: 'bg-pink-100 text-pink-600' },
    { name: 'Neurologist', icon: <FaBrain />, color: 'bg-purple-100 text-purple-600' },
    { name: 'Pediatrician', icon: <FaChild />, color: 'bg-blue-100 text-blue-600' },
    { name: 'Orthopedic Surgeon', icon: <FaBone />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Ophthalmologist', icon: <FaEye />, color: 'bg-green-100 text-green-600' },
    { name: 'Dentist', icon: <FaTooth />, color: 'bg-cyan-100 text-cyan-600' },
    { name: 'General Physician', icon: <FaStethoscope />, color: 'bg-indigo-100 text-indigo-600' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 text-white">
        <img src={hero} alt="Doctor" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-gray-600/60 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Best Doctors in India
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Search from thousands of verified doctors across India. Book appointments instantly for online or in-person consultations in your city.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            {!loading && (
              <SearchBar 
                specialities={specialities} 
                locations={locations}
              />
            )}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">5000+</div>
              <div className="text-primary-200">Verified Indian Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">100+</div>
              <div className="text-primary-200">Specialities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">1M+</div>
              <div className="text-primary-200">Appointments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">99%</div>
              <div className="text-primary-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Specialities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Specialities in India</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse doctors by their speciality to find the right healthcare professional for your needs in India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSpecialities.map((spec) => (
              <Link
                key={spec.name}
                to={`/search?speciality=${encodeURIComponent(spec.name)}`}
                className="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-14 h-14 rounded-full ${spec.color} flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {spec.icon}
                </div>
                <h3 className="font-medium text-gray-800">{spec.name}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/search" className="btn-secondary">
              View All Specialities
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose DocFind?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make it easy to find the right doctor and book appointments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Doctor in India?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join lakhs of patients who have found their perfect healthcare provider through DocFind India.
          </p>
          <Link to="/search" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
