const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

dotenv.config();

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    speciality: 'Cardiologist',
    location: 'New York',
    experience: 15,
    consultationFee: 200,
    consultationType: 'both',
    languages: ['English', 'Spanish'],
    profileImage: '/src/assets/portrait-mature-therapist-sitting-table-looking-camera.jpg',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation.',
    education: 'MD from Johns Hopkins University, Fellowship at Cleveland Clinic',
    hospital: 'Mount Sinai Hospital',
    rating: 4.8,
    reviewCount: 245,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '13:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Michael Chen',
    speciality: 'Dermatologist',
    location: 'Los Angeles',
    experience: 12,
    consultationFee: 150,
    consultationType: 'both',
    languages: ['English', 'Mandarin'],
    profileImage: '/src/assets/young-handsome-indian-man-doctor_251136-50316.jpg',
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions, performing cosmetic procedures, and skin cancer screening.',
    education: 'MD from Stanford University, Residency at UCLA Medical Center',
    hospital: 'Cedars-Sinai Medical Center',
    rating: 4.7,
    reviewCount: 189,
    availabilitySlots: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Saturday', startTime: '09:00', endTime: '14:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Emily Rodriguez',
    speciality: 'Pediatrician',
    location: 'Chicago',
    experience: 10,
    consultationFee: 120,
    consultationType: 'offline',
    languages: ['English', 'Spanish', 'Portuguese'],
    profileImage: '/src/assets/close-up-health-worker.jpg',
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. She focuses on preventive care, developmental assessments, and managing childhood illnesses.',
    education: 'MD from Northwestern University, Pediatric Residency at Children\'s Hospital of Chicago',
    hospital: 'Lurie Children\'s Hospital',
    rating: 4.9,
    reviewCount: 312,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '12:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedic Surgeon',
    location: 'Houston',
    experience: 20,
    consultationFee: 250,
    consultationType: 'offline',
    languages: ['English'],
    profileImage: '/src/assets/young-doctor-getting-ready-work.jpg',
    about: 'Dr. James Wilson is a highly skilled orthopedic surgeon with 20 years of experience in joint replacement, sports medicine, and trauma surgery. He has performed over 5,000 successful surgeries.',
    education: 'MD from Harvard Medical School, Orthopedic Fellowship at Hospital for Special Surgery',
    hospital: 'Houston Methodist Hospital',
    rating: 4.6,
    reviewCount: 178,
    availabilitySlots: [
      { day: 'Tuesday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '13:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Priya Sharma',
    speciality: 'Neurologist',
    location: 'San Francisco',
    experience: 14,
    consultationFee: 220,
    consultationType: 'both',
    languages: ['English', 'Hindi', 'Punjabi'],
    profileImage: '/src/assets/portrait-mature-therapist-sitting-table-looking-camera.jpg',
    about: 'Dr. Priya Sharma is a board-certified neurologist specializing in headache medicine, epilepsy, and neurodegenerative diseases. She combines cutting-edge treatments with a patient-centered approach.',
    education: 'MD from UCSF, Neurology Fellowship at Mayo Clinic',
    hospital: 'UCSF Medical Center',
    rating: 4.8,
    reviewCount: 203,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. David Kim',
    speciality: 'Psychiatrist',
    location: 'Seattle',
    experience: 11,
    consultationFee: 180,
    consultationType: 'online',
    languages: ['English', 'Korean'],
    profileImage: '/src/assets/young-handsome-indian-man-doctor_251136-50316.jpg',
    about: 'Dr. David Kim is a compassionate psychiatrist specializing in mood disorders, anxiety, PTSD, and addiction medicine. He offers both medication management and psychotherapy.',
    education: 'MD from University of Washington, Psychiatry Residency at Columbia University',
    hospital: 'Seattle Psychiatric Associates',
    rating: 4.7,
    reviewCount: 156,
    availabilitySlots: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Lisa Thompson',
    speciality: 'Gynecologist',
    location: 'Miami',
    experience: 16,
    consultationFee: 175,
    consultationType: 'both',
    languages: ['English', 'Spanish', 'French'],
    profileImage: '/src/assets/close-up-health-worker.jpg',
    about: 'Dr. Lisa Thompson is an experienced OB-GYN providing comprehensive women\'s healthcare including prenatal care, gynecological exams, minimally invasive surgery, and menopause management.',
    education: 'MD from Duke University, OB-GYN Residency at Johns Hopkins Hospital',
    hospital: 'Baptist Health South Florida',
    rating: 4.9,
    reviewCount: 287,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Robert Martinez',
    speciality: 'General Physician',
    location: 'Phoenix',
    experience: 8,
    consultationFee: 100,
    consultationType: 'both',
    languages: ['English', 'Spanish'],
    profileImage: '/src/assets/young-doctor-getting-ready-work.jpg',
    about: 'Dr. Robert Martinez is a dedicated family medicine physician providing comprehensive primary care for patients of all ages. He focuses on preventive medicine, chronic disease management, and acute care.',
    education: 'MD from University of Arizona, Family Medicine Residency at Banner Health',
    hospital: 'Banner University Medical Center',
    rating: 4.5,
    reviewCount: 134,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Saturday', startTime: '09:00', endTime: '12:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Amanda Foster',
    speciality: 'Ophthalmologist',
    location: 'Boston',
    experience: 13,
    consultationFee: 190,
    consultationType: 'offline',
    languages: ['English', 'German'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Amanda',
    about: 'Dr. Amanda Foster is a skilled ophthalmologist specializing in cataract surgery, LASIK, glaucoma treatment, and comprehensive eye care. She uses the latest technology for precise diagnoses and treatments.',
    education: 'MD from Boston University, Ophthalmology Fellowship at Massachusetts Eye and Ear',
    hospital: 'Massachusetts Eye and Ear',
    rating: 4.8,
    reviewCount: 198,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '13:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Kevin O\'Brien',
    speciality: 'Dentist',
    location: 'Denver',
    experience: 9,
    consultationFee: 130,
    consultationType: 'offline',
    languages: ['English', 'Irish'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Kevin',
    about: 'Dr. Kevin O\'Brien is a skilled general dentist offering comprehensive dental care including cleanings, fillings, crowns, root canals, and cosmetic dentistry. He prioritizes patient comfort and uses modern techniques.',
    education: 'DDS from University of Colorado, General Practice Residency at Denver Health',
    hospital: 'Denver Dental Clinic',
    rating: 4.6,
    reviewCount: 167,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Jennifer Lee',
    speciality: 'Endocrinologist',
    location: 'San Diego',
    experience: 11,
    consultationFee: 195,
    consultationType: 'both',
    languages: ['English', 'Mandarin', 'Cantonese'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Jennifer',
    about: 'Dr. Jennifer Lee is a board-certified endocrinologist specializing in diabetes management, thyroid disorders, hormonal imbalances, and metabolic conditions. She takes a holistic approach to patient care.',
    education: 'MD from Yale University, Endocrinology Fellowship at UCSD',
    hospital: 'Scripps Health',
    rating: 4.7,
    reviewCount: 145,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '16:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. William Taylor',
    speciality: 'Pulmonologist',
    location: 'Atlanta',
    experience: 17,
    consultationFee: 210,
    consultationType: 'both',
    languages: ['English'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+William',
    about: 'Dr. William Taylor is an experienced pulmonologist treating respiratory conditions including asthma, COPD, lung infections, sleep apnea, and pulmonary fibrosis. He is known for his thorough diagnostic approach.',
    education: 'MD from Emory University, Pulmonology Fellowship at National Jewish Health',
    hospital: 'Emory University Hospital',
    rating: 4.6,
    reviewCount: 176,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '13:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Maria Garcia',
    speciality: 'Cardiologist',
    location: 'Dallas',
    experience: 18,
    consultationFee: 230,
    consultationType: 'both',
    languages: ['English', 'Spanish'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Maria',
    about: 'Dr. Maria Garcia is a leading interventional cardiologist with expertise in coronary interventions, structural heart disease, and cardiac imaging. She has published numerous research papers and is actively involved in clinical trials.',
    education: 'MD from UT Southwestern, Cardiology Fellowship at Texas Heart Institute',
    hospital: 'Baylor Scott & White Heart Hospital',
    rating: 4.9,
    reviewCount: 267,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '12:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Christopher Brown',
    speciality: 'Urologist',
    location: 'Philadelphia',
    experience: 14,
    consultationFee: 185,
    consultationType: 'offline',
    languages: ['English'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Chris',
    about: 'Dr. Christopher Brown is a board-certified urologist specializing in minimally invasive surgery, prostate health, kidney stones, and men\'s health issues. He is committed to providing personalized care.',
    education: 'MD from University of Pennsylvania, Urology Residency at Jefferson University Hospital',
    hospital: 'Penn Medicine',
    rating: 4.7,
    reviewCount: 154,
    availabilitySlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Nicole Adams',
    speciality: 'Dermatologist',
    location: 'New York',
    experience: 9,
    consultationFee: 160,
    consultationType: 'online',
    languages: ['English', 'French'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Nicole',
    about: 'Dr. Nicole Adams specializes in medical dermatology with a focus on acne, eczema, psoriasis, and skin cancer detection. She offers convenient online consultations for routine skin concerns.',
    education: 'MD from Cornell University, Dermatology Residency at NYU Langone',
    hospital: 'NYU Langone Dermatology Associates',
    rating: 4.5,
    reviewCount: 123,
    availabilitySlots: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true }
    ]
  },
  {
    name: 'Dr. Andrew Patel',
    speciality: 'Gastroenterologist',
    location: 'Chicago',
    experience: 12,
    consultationFee: 200,
    consultationType: 'both',
    languages: ['English', 'Hindi', 'Gujarati'],
    profileImage: 'https://via.placeholder.com/150x150?text=Dr+Andrew',
    about: 'Dr. Andrew Patel is a skilled gastroenterologist specializing in digestive disorders, liver diseases, inflammatory bowel disease, and endoscopic procedures. He emphasizes patient education and preventive care.',
    education: 'MD from University of Chicago, GI Fellowship at Northwestern Memorial Hospital',
    hospital: 'Northwestern Memorial Hospital',
    rating: 4.8,
    reviewCount: 189,
    availabilitySlots: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert seed data
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`Inserted ${createdDoctors.length} doctors`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
