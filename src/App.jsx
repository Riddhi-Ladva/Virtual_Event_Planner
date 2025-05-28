import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/Home';
import Signup from './client/Signup';
import Login from './client/Login';
import CityFinder from './client/CityFinder';
import VenuePage from './client/SelectVenue';
import SelectDecoration from './client/SelectDecoration';
import MultiCuisineMenu from './client/MultiCuisineMenu';
import Reviewplan from './client/Reviewplan';
import View from './client/view';
import PaymentPage from './client/Payment';
import ProfilePage from './client/Profile';
import Navbar from './client/Navbar';
import Footer from './client/Footer';
import ConfirmationPage from './client/ConfirmationPage';

import ProtectedRoute from './client/ProtectedRoute'; // ✅ Import
import ReviewModal from './client/Review';
import ExitIntentReviewPopup from './client/ExitIntentReviewPopup'
import OtherServices from './client/Otherservice';

const App = () => {
  
  return (
    <><Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CityFinder" element={<ProtectedRoute><CityFinder /></ProtectedRoute>} />

        {/* ✅ Protected Routes */}
        <Route path="/SelectVenue" element={<ProtectedRoute><VenuePage /></ProtectedRoute>} />
        <Route path="/SelectDecoration" element={<ProtectedRoute><SelectDecoration /></ProtectedRoute>} />
        <Route path="/MultiCuisineMenu" element={<ProtectedRoute><MultiCuisineMenu /></ProtectedRoute>} />
        <Route path="/ReviewPlan" element={<ProtectedRoute><Reviewplan /></ProtectedRoute>} />
        <Route path="/view" element={<ProtectedRoute><View /></ProtectedRoute>} />
        <Route path="/Payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/Profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/confirmation" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewModal /></ProtectedRoute>} />
                <Route path="/otherservice" element={<ProtectedRoute><OtherServices /></ProtectedRoute>} />

        

        {/* Optional: Navbar/Footer routes for direct access (usually not needed) */}
        <Route path="/Navbar" element={<ProtectedRoute>{<Navbar />} </ProtectedRoute>}/>
        
        <Route path="/Footer" element={<ProtectedRoute>{<Footer />} </ProtectedRoute>}/>

      </Routes>

    </Router><><ExitIntentReviewPopup /></></>
  );
};

export default App;
