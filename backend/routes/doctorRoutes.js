const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  getSpecialities,
  getLocations,
  getLanguages
} = require('../controllers/doctorController');

// Get all specialities - must be before /:id route
router.get('/specialities/list', getSpecialities);

// Get all locations
router.get('/locations/list', getLocations);

// Get all languages
router.get('/languages/list', getLanguages);

// Get all doctors with filters (POST for JSON body)
router.post('/search', getDoctors);

// Get single doctor by ID
router.get('/:id', getDoctorById);

module.exports = router;
