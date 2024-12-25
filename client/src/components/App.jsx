import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import HomePage from './HomePage';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<div className="container"> <Login /> </div>} />
        <Route path="/Login" element={<div className="container"> <Login /> </div>} />
        <Route path="/Register" element={<div className="container"> <Register /> </div>} />
        <Route path="/HomePage" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
