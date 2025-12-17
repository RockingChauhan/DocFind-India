import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/doctors/:id" element={<DoctorProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
