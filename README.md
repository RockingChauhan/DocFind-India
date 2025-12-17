# DocFind - Doctor Discovery & Appointment Booking Platform

A full-stack web application for finding doctors and booking appointments, built with React.js (Vite), Node.js, Express.js, and MongoDB.

## Features

- **Homepage**: Hero section with search functionality
- **Doctor Search**: Filter by speciality, location, consultation type, price range, and languages
- **Doctor Profiles**: Detailed doctor information with availability slots
- **Appointment Booking**: Book online or in-person consultations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- React.js with Vite
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator for input validation

## Project Structure

```
taskProject/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── doctorController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   ├── server.js
│   ├── seed.js                # Database seeder
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── DoctorCard.jsx
    │   │   ├── BookingModal.jsx
    │   │   ├── FilterSidebar.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── Loading.jsx
    │   │   └── EmptyState.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── SearchPage.jsx
    │   │   └── DoctorProfilePage.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── doctorService.js
    │   │   └── appointmentService.js
    │   ├── hooks/
    │   │   ├── useDoctors.js
    │   │   └── useAppointment.js
    │   ├── routes/
    │   │   └── AppRoutes.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## Prerequisites

- Node.js v16 or higher
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd taskProject
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/doctor_booking

# Seed the database with sample doctors
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctor_booking
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors (supports filtering, sorting, pagination)
- `GET /api/doctors/:id` - Get single doctor by ID
- `GET /api/doctors/specialities/list` - Get all available specialities
- `GET /api/doctors/locations/list` - Get all available locations
- `GET /api/doctors/languages/list` - Get all available languages

#### Query Parameters for GET /api/doctors
| Parameter | Type | Description |
|-----------|------|-------------|
| speciality | string | Filter by speciality |
| location | string | Filter by location |
| consultationType | string | Filter by type (online/offline/both) |
| minPrice | number | Minimum consultation fee |
| maxPrice | number | Maximum consultation fee |
| languages | string | Comma-separated list of languages |
| sortBy | string | Field to sort by (e.g., consultationFee, experience) |
| sortOrder | string | Sort order (asc/desc) |
| page | number | Page number for pagination |
| limit | number | Results per page |

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/doctor/:doctorId` - Get appointments by doctor
- `GET /api/appointments/booked-slots/:doctorId?date=YYYY-MM-DD` - Get booked slots
- `PATCH /api/appointments/:id/status` - Update appointment status

## Database Models

### Doctor Schema
```javascript
{
  name: String,
  speciality: String,
  location: String,
  experience: Number,
  consultationFee: Number,
  consultationType: 'online' | 'offline' | 'both',
  languages: [String],
  availabilitySlots: [{
    day: String,
    startTime: String,
    endTime: String,
    isAvailable: Boolean
  }],
  profileImage: String,
  about: String,
  education: String,
  hospital: String,
  rating: Number,
  reviewCount: Number
}
```

### Appointment Schema
```javascript
{
  doctorId: ObjectId,
  patientName: String,
  patientEmail: String,
  patientPhone: String,
  date: Date,
  time: String,
  consultationType: 'online' | 'offline',
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  notes: String
}
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Overview

### Homepage
- Hero section with search bar
- Popular specialities cards
- Feature highlights
- Call-to-action sections

### Search Page
- Left sidebar with filters (speciality, consultation type, languages, price range)
- Grid/List view toggle
- Sort by price or experience
- Responsive design with collapsible mobile filters

### Doctor Profile Page
- Detailed doctor information
- About section
- Languages spoken
- Weekly availability schedule
- Booking card with consultation fee
- Book appointment button

### Booking Modal
- Patient information form
- Date picker (next 30 days)
- Time slot selection with booked slots disabled
- Consultation type selection
- Form validation
- Success confirmation

## Notes

- All doctor images are placeholder images from `https://via.placeholder.com/`
- The seed data includes 16 doctors across various specialities
- Appointments are validated to prevent double-booking
- The frontend uses Vite's proxy to forward API requests during development

## License

ISC
