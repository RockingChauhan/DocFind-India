const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  speciality: {
    type: String,
    required: [true, 'Speciality is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: 0
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: 0
  },
  consultationType: {
    type: String,
    enum: ['online', 'offline', 'both'],
    default: 'both'
  },
  languages: [{
    type: String,
    trim: true
  }],
  availabilitySlots: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150x150?text=Doctor'
  },
  about: {
    type: String,
    trim: true
  },
  education: {
    type: String,
    trim: true
  },
  hospital: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search optimization
doctorSchema.index({ speciality: 1, location: 1, consultationFee: 1 });
doctorSchema.index({ name: 'text', speciality: 'text', location: 'text' });

module.exports = mongoose.model('Doctor', doctorSchema);
