const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  patientEmail: {
    type: String,
    required: [true, 'Patient email is required'],
    trim: true,
    lowercase: true
  },
  patientPhone: {
    type: String,
    required: [true, 'Patient phone is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  consultationType: {
    type: String,
    enum: ['online', 'offline'],
    required: [true, 'Consultation type is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
appointmentSchema.index({ doctorId: 1, date: 1 });
appointmentSchema.index({ patientEmail: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
