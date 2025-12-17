import { useState, useEffect, useCallback } from 'react';
import doctorService from '../services/doctorService';

export const useDoctors = (initialFilters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDoctors: 0,
    hasMore: false
  });

  const fetchDoctors = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await doctorService.getDoctors(filters);
      setDoctors(response.data || []);
      setPagination(response.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalDoctors: 0,
        hasMore: false
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctors');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove initial fetch; fetching is now controlled by SearchPage

  return { doctors, loading, error, pagination, fetchDoctors };
};

export const useDoctor = (id) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await doctorService.getDoctorById(id);
        setDoctor(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch doctor');
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  return { doctor, loading, error };
};

export const useFilterOptions = () => {
  const [specialities, setSpecialities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const [specRes, locRes, langRes] = await Promise.all([
          doctorService.getSpecialities(),
          doctorService.getLocations(),
          doctorService.getLanguages()
        ]);
        setSpecialities(specRes.data);
        setLocations(locRes.data);
        setLanguages(langRes.data);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { specialities, locations, languages, loading };
};

export default useDoctors;
