import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import TrainLocationForm from "./pages/TrainLocationForm/TrainLocationForm";
import TrainMap from "./pages/TrainMap/TrainMap";
import TrainHistory from "./pages/TrainHistory/TrainHistory";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Train Tracking System</h1>
        
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/location-form">Add Train Location</Link></li>
            <li><Link to="/train-map">View Train Map</Link></li>
            <li><Link to="/train-history">View Train History</Link></li>
          </ul>
        </nav>
        
        {/* Define Routes */}
        <Routes>
          <Route path="/location-form" element={<TrainLocationForm />} />
          <Route path="/train-map" element={<TrainMap />} />
          <Route path="/train-history" element={<TrainHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;