import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, MapPage} from './routes';
import Group1Page from "./components/survey/Group1Page";
import Group2Page from "./components/survey/Group2Page";
import Group3Page from "./components/survey/Group3Page";
import RandomParent from "./components/survey/RandomParent";
import RandomChild from "./components/survey/RandomChild";
import Layout from "./components/layout/Layout";
import SurveyResult from "./components/survey/SurveyResult";
import Ranking from "./routes/Ranking";
import ChoicePage from "./routes/ChoicePage";
import Restaurant from "./components/restaurant/Restaurant";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
          <Route path="/map" element={<MapPage />} /> {/* 지도 페이지 */}

          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/group1" element={<Group1Page />} />
          <Route path="/group2" element={<Group2Page />} />
          <Route path="/group3" element={<Group3Page />} />
          <Route path="/parent" element={<RandomParent />} />
          <Route path="/children" element={<RandomChild />} />
          <Route path="/result" element={<SurveyResult />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
