import { FaTimes } from 'react-icons/fa';

const FilterSidebar = ({
  specialities,
  locations,
  languages,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const consultationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'online', label: 'Online Consultation' },
    { value: 'offline', label: 'In-Person Visit' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000-1500', label: '₹1000 - ₹1500' },
    { value: '1500-2000', label: '₹1500 - ₹2000' },
    { value: '2000+', label: '₹2000+' }
  ];

  const handleSpecialityChange = (speciality) => {
    const currentSpecialities = filters.specialities || [];
    const newSpecialities = currentSpecialities.includes(speciality)
      ? currentSpecialities.filter(s => s !== speciality)
      : [...currentSpecialities, speciality];
    onFilterChange({ specialities: newSpecialities });
  };

  const handleLanguageChange = (language) => {
    const currentLanguages = filters.languages || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];
    onFilterChange({ languages: newLanguages });
  };

  const handlePriceChange = (priceRange) => {
    if (!priceRange) {
      onFilterChange({ minPrice: '', maxPrice: '' });
      return;
    }
    if (priceRange === '2000+') {
      onFilterChange({ minPrice: '2000', maxPrice: '' });
    } else {
      const [min, max] = priceRange.split('-');
      onFilterChange({ minPrice: min, maxPrice: max });
    }
  };

  const hasActiveFilters = () => {
    return (
      filters.consultationType !== 'all' ||
      (filters.specialities && filters.specialities.length > 0) ||
      (filters.languages && filters.languages.length > 0) ||
      filters.minPrice ||
      filters.maxPrice
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Filters</h3>
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <FaTimes className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Specialities */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Speciality</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {specialities.map((speciality) => (
            <label key={speciality} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.specialities || []).includes(speciality)}
                onChange={() => handleSpecialityChange(speciality)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600">{speciality}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Consultation Type */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Consultation Type</h4>
        <div className="space-y-2">
          {consultationTypes.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="consultationType"
                value={type.value}
                checked={filters.consultationType === type.value}
                onChange={(e) => onFilterChange({ consultationType: e.target.value })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Languages</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {languages.map((language) => (
            <label key={language} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.languages || []).includes(language)}
                onChange={() => handleLanguageChange(language)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={
                  range.value === '' 
                    ? !filters.minPrice && !filters.maxPrice
                    : range.value === '300+'
                    ? filters.minPrice === '2000' && !filters.maxPrice
                    : `${filters.minPrice}-${filters.maxPrice}` === range.value
                }
                onChange={() => handlePriceChange(range.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
