// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './Login';
// import HomePage from './HomePage';
// import Register from './Register';
// import ProtectedRoute from './ProtectedRoute';
// import AddChild from './addChild';
// import WeeklyFeedback from './WeeklyFeedback';
// import ChildInfo from './childInfo';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<div className="container"> <Login /> </div>} />
//         <Route path="/Login" element={<div className="container"> <Login /> </div>} />
//         <Route path="/Register" element={<div className="container"> <Register /> </div>} />
//         <Route path="/HomePage" element={<ProtectedRoute element={<HomePage />} />} />
//         <Route path="/addChild" element={<ProtectedRoute element={<AddChild />} />} />
//         <Route path="/WeeklyFeedback" element={<ProtectedRoute element={<WeeklyFeedback />} />} />
//         <Route path="/childInfo/:id" element={<ProtectedRoute element={<ChildInfo />} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from './Login';
import HomePage from './HomePage';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import AddChild from './addChild';
import WeeklyFeedback from './WeeklyFeedback';
import PeriodicFeedback from './PeriodicFeedback';
import ChildInfo from './childInfo';
import Footer from './Footer';
import Expert from './Experts';
import ResourceLibrary from './ResourceLibrary';
import Attendence from './attendence';

const AppContent = () => {
  const location = useLocation();

  const shouldShowFooter = () => {
    return !['/', '/Login', '/Register'].includes(location.pathname);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<div className="container"><Login /></div>} />
        <Route path="/Login" element={<div className="container"><Login /></div>} />
        <Route path="/Register" element={<div className="container"><Register /></div>} />
        <Route path="/HomePage" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/attendence" element={<ProtectedRoute element={<Attendence />} />} />
        <Route path="/addChild" element={<ProtectedRoute element={<AddChild />} />} />
        <Route path="/WeeklyFeedback" element={<ProtectedRoute element={<WeeklyFeedback />} />} />
        <Route path="/childInfo/:id" element={<ProtectedRoute element={<ChildInfo />} />} />
        <Route path="/Experts" element={<ProtectedRoute element={<Expert />} />} />
        <Route path="/ResourceLibrary" element={<ProtectedRoute element={<ResourceLibrary />} />} />
        <Route path="/PeriodicFeedback" element={<ProtectedRoute element={<PeriodicFeedback />} />} />
      </Routes>
      {shouldShowFooter() && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
