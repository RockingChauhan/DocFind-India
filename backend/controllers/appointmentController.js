const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { validationResult } = require('express-validator');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { doctorId, patientName, patientEmail, patientPhone, date, time, consultationType, notes } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if consultation type is available for this doctor
    if (doctor.consultationType !== 'both' && doctor.consultationType !== consultationType) {
      return res.status(400).json({
        success: false,
        message: `This doctor only offers ${doctor.consultationType} consultations`
      });
    }

    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please choose another slot.'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      date: new Date(date),
      time,
      consultationType,
      notes
    });

    // Populate doctor info for response
    const populatedAppointment = await Appointment.findById(appointment._id).populate('doctorId', 'name speciality location consultationFee');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: populatedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// @desc    Get appointments by doctor ID
// @route   GET /api/appointments/doctor/:doctorId
// @access  Public
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, status } = req.query;

    const filter = { doctorId };

    if (date) {
      const queryDate = new Date(date);
      filter.date = {
        $gte: new Date(queryDate.setHours(0, 0, 0, 0)),
        $lt: new Date(queryDate.setHours(23, 59, 59, 999))
      };
    }

    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name speciality')
      .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// @desc    Get booked slots for a doctor on a specific date
// @route   GET /api/appointments/booked-slots/:doctorId
// @access  Public
const getBookedSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const queryDate = new Date(date);
    const appointments = await Appointment.find({
      doctorId,
      date: {
        $gte: new Date(queryDate.setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
      },
      status: { $in: ['pending', 'confirmed'] }
    }).select('time');

    const bookedSlots = appointments.map(apt => apt.time);

    res.json({
      success: true,
      data: bookedSlots
    });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booked slots',
      error: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Public
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('doctorId', 'name speciality');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment status updated',
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByDoctor,
  getBookedSlots,
  updateAppointmentStatus
};
