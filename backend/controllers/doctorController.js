const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get all doctors with filters
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const {
      speciality,
      location,
      consultationType,
      minPrice,
      maxPrice,
      languages,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
      search
    } = req.body;

    // Build filter object
    const filter = {};

    if (speciality) {
      filter.speciality = { $regex: speciality, $options: 'i' };
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (consultationType && consultationType !== 'all') {
      filter.$or = [
        { consultationType: consultationType },
        { consultationType: 'both' }
      ];
    }

    if (minPrice || maxPrice) {
      filter.consultationFee = {};
      if (minPrice) filter.consultationFee.$gte = Number(minPrice);
      if (maxPrice) filter.consultationFee.$lte = Number(maxPrice);
    }

    if (languages) {
      const languageArray = languages.split(',').map(lang => lang.trim());
      filter.languages = { $in: languageArray };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { speciality: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const [doctors, total] = await Promise.all([
      Doctor.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      Doctor.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: doctors,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalDoctors: total,
        hasMore: skip + doctors.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Get upcoming appointments count for availability info
    const appointmentsToday = await Appointment.countDocuments({
      doctorId: doctor._id,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    res.json({
      success: true,
      data: {
        ...doctor.toObject(),
        appointmentsToday
      }
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
};

// @desc    Get all specialities
// @route   GET /api/doctors/specialities/list
// @access  Public
const getSpecialities = async (req, res) => {
  try {
    const specialities = await Doctor.distinct('speciality');
    res.json({
      success: true,
      data: specialities.sort()
    });
  } catch (error) {
    console.error('Error fetching specialities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching specialities',
      error: error.message
    });
  }
};

// @desc    Get all locations
// @route   GET /api/doctors/locations/list
// @access  Public
const getLocations = async (req, res) => {
  try {
    const locations = await Doctor.distinct('location');
    res.json({
      success: true,
      data: locations.sort()
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching locations',
      error: error.message
    });
  }
};

// @desc    Get all languages
// @route   GET /api/doctors/languages/list
// @access  Public
const getLanguages = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'languages');
    const languagesSet = new Set();
    doctors.forEach(doc => {
      doc.languages.forEach(lang => languagesSet.add(lang));
    });
    res.json({
      success: true,
      data: Array.from(languagesSet).sort()
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching languages',
      error: error.message
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  getSpecialities,
  getLocations,
  getLanguages
};
