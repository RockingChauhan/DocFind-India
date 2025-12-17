import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaTh, FaList, FaSortAmountDown, FaSortAmountUp, FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';
import DoctorCard from '../components/DoctorCard';
import FilterSidebar from '../components/FilterSidebar';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { useDoctors, useFilterOptions } from '../hooks/useDoctors';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { specialities, locations, languages, loading: optionsLoading } = useFilterOptions();
  // Prepare initial filters from query params
  const initialFilters = {
    speciality: searchParams.get('speciality') || '',
    location: searchParams.get('location') || '',
    consultationType: 'all',
    specialities: searchParams.get('speciality') ? [searchParams.get('speciality')] : [],
    languages: [],
    minPrice: '',
    maxPrice: ''
  };


  const { doctors, loading, error, pagination, fetchDoctors } = useDoctors();

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState(initialFilters);

  // Fetch doctors on mount and whenever filters/sort change
  useEffect(() => {
    const queryParams = {};
    if (filters.specialities && filters.specialities.length > 0) {
      queryParams.speciality = filters.specialities[0];
    } else if (filters.speciality) {
      queryParams.speciality = filters.speciality;
    }
    if (filters.location) {
      queryParams.location = filters.location;
    }
    if (filters.consultationType && filters.consultationType !== 'all') {
      queryParams.consultationType = filters.consultationType;
    }
    if (filters.minPrice) {
      queryParams.minPrice = filters.minPrice;
    }
    if (filters.maxPrice) {
      queryParams.maxPrice = filters.maxPrice;
    }
    if (filters.languages && filters.languages.length > 0) {
      queryParams.languages = filters.languages.join(',');
    }
    if (sortBy) {
      queryParams.sortBy = sortBy;
      queryParams.sortOrder = sortOrder;
    }
    fetchDoctors(queryParams);
  }, [filters, sortBy, sortOrder, fetchDoctors]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      speciality: '',
      location: '',
      consultationType: 'all',
      specialities: [],
      languages: [],
      minPrice: '',
      maxPrice: ''
    });
    setSortBy('');
    setSortOrder('asc');
    setSearchParams({});
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const selectedSpeciality = searchParams.get('speciality');
  const selectedLocation = searchParams.get('location');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Search for Doctors, Hospitals, Clinics
          </h1>
          
          {/* Selected Filters Display */}
          {(selectedSpeciality || selectedLocation) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {selectedSpeciality && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800">
                  <FaUserMd className="mr-1" />
                  {selectedSpeciality}
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  <FaMapMarkerAlt className="mr-1" />
                  {selectedLocation}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden btn-secondary mb-4"
          >
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar Filters */}
          <div className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              specialities={specialities}
              locations={locations}
              languages={languages}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  Found <span className="font-semibold text-gray-800">{pagination.totalDoctors}</span> doctors
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <button
                      onClick={() => handleSort('consultationFee')}
                      className={`flex items-center px-3 py-1 rounded text-sm ${
                        sortBy === 'consultationFee' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Price
                      {sortBy === 'consultationFee' && (
                        sortOrder === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                      )}
                    </button>
                    <button
                      onClick={() => handleSort('experience')}
                      className={`flex items-center px-3 py-1 rounded text-sm ${
                        sortBy === 'experience' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Experience
                      {sortBy === 'experience' && (
                        sortOrder === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                      )}
                    </button>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <FaTh />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading || optionsLoading ? (
              <Loading message="Searching for doctors..." />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={applyFilters} className="btn-primary">
                  Try Again
                </button>
              </div>
            ) : doctors.length === 0 ? (
              <EmptyState
                title="No doctors found"
                message="We couldn't find any doctors matching your criteria. Try adjusting your filters or search for a different speciality."
                actionLabel="Clear All Filters"
                onAction={handleClearFilters}
              />
            ) : (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor._id}
                      doctor={doctor}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination Info */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 text-center text-gray-600">
                    Showing page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
