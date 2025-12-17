import api from './api';

export const appointmentService = {
  // Create new appointment
  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Get appointments by doctor ID
  getAppointmentsByDoctor: async (doctorId, params = {}) => {
    const response = await api.get(`/appointments/doctor/${doctorId}`, { params });
    return response.data;
  },

  // Get booked slots for a doctor on a specific date
  getBookedSlots: async (doctorId, date) => {
    const response = await api.get(`/appointments/booked-slots/${doctorId}`, {
      params: { date }
    });
    return response.data;
  },

  // Update appointment status
  updateAppointmentStatus: async (appointmentId, status) => {
    const response = await api.patch(`/appointments/${appointmentId}/status`, { status });
    return response.data;
  }
};

export default appointmentService;
