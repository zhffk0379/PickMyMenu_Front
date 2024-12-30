import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, MapPage} from './routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
        <Route path="/map" element={<MapPage />} /> {/* 지도 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
