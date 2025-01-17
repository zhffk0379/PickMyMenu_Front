import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // AuthContext 임포트
import { HomePage, MapPage } from './routes';
import { Join, Login, MyPage, PasswordVerify, Edit, Delete } from './components/member';
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
import RestaurantInfo from "./components/restaurant/RestaurantInfo";

function App() {
  return (
    <AuthProvider> {/* AuthProvider로 감싸서 인증 상태 관리 */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
            <Route path="/map" element={<MapPage />} /> {/* 지도 페이지 */}

            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/passwordverify" element={<PasswordVerify />} />
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/restaurantInfo" element={<RestaurantInfo />} />
            <Route path="/result" element={<SurveyResult />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/restaurant" element={<Restaurant />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
