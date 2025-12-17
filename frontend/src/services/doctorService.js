import api from './api';

export const doctorService = {
  // Get all doctors with filters
  getDoctors: async (filters = {}) => {
    const response = await api.post('/doctors/search', filters);
    return response.data;
  },

  // Get single doctor by ID
  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  // Get all specialities
  getSpecialities: async () => {
    const response = await api.get('/doctors/specialities/list');
    return response.data;
  },

  // Get all locations
  getLocations: async () => {
    const response = await api.get('/doctors/locations/list');
    return response.data;
  },

  // Get all languages
  getLanguages: async () => {
    const response = await api.get('/doctors/languages/list');
    return response.data;
  }
};

export default doctorService;
