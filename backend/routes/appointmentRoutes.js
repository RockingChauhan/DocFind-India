const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createAppointment,
  getAppointmentsByDoctor,
  getBookedSlots,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// Validation rules for creating appointment
const appointmentValidation = [
  body('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isMongoId()
    .withMessage('Invalid Doctor ID'),
  body('patientName')
    .notEmpty()
    .withMessage('Patient name is required')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Patient name must be between 2 and 100 characters'),
  body('patientEmail')
    .notEmpty()
    .withMessage('Patient email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('patientPhone')
    .notEmpty()
    .withMessage('Patient phone is required')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('date')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('time')
    .notEmpty()
    .withMessage('Appointment time is required'),
  body('consultationType')
    .notEmpty()
    .withMessage('Consultation type is required')
    .isIn(['online', 'offline'])
    .withMessage('Consultation type must be online or offline')
];

// Create new appointment
router.post('/', appointmentValidation, createAppointment);

// Get booked slots for a doctor
router.get('/booked-slots/:doctorId', getBookedSlots);

// Get appointments by doctor ID
router.get('/doctor/:doctorId', getAppointmentsByDoctor);

// Update appointment status
router.patch('/:id/status', updateAppointmentStatus);

module.exports = router;
