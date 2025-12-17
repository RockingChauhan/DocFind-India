import { useState } from 'react';
import appointmentService from '../services/appointmentService';

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const bookAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await appointmentService.createAppointment(appointmentData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookedSlots = async (doctorId, date) => {
    try {
      const response = await appointmentService.getBookedSlots(doctorId, date);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch booked slots:', err);
      return [];
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { bookAppointment, getBookedSlots, loading, error, success, resetState };
};

export default useAppointment;
