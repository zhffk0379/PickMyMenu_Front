import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // AuthContext 임포트
import { HomePage, MapPage } from './routes';
import { Join, Login, MyPage, PasswordVerify, Edit, Delete } from './components/member';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/layout/Layout";
import SurveyResult from "./components/survey/SurveyResult";
import Ranking from "./routes/Ranking";
import ChoicePage from "./routes/ChoicePage";
import Restaurant from "./components/restaurant/Restaurant";
import RestaurantInfo from "./components/restaurant/RestaurantInfo";
import Review from "./components/review/Review";
import MyRestaurantInfo from "./components/member/MyRestaurantInfo";
import MyInfo from "./components/member/MyInfo";
import MyReview from "./components/review/MyReview";
import TodayPickPage from "./routes/TodayPickPage";

function App() {
  return (
    <AuthProvider> {/* AuthProvider로 감싸서 인증 상태 관리 */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
            <Route path="/map" element={<MapPage />} /> {/* 지도 페이지 */}
            <Route path="/myRestaurantInfo" element={<MyRestaurantInfo />} /> {/* 지도 페이지 */}
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/myinfo" element={<MyInfo />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/passwordverify" element={<PasswordVerify />} />
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/restaurantInfo" element={<RestaurantInfo />} />
            <Route path="/result" element={<SurveyResult />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/review" element={<Review />} />
            <Route path="/myReview" element={<MyReview />} />
            <Route path="/todayPick" element={<TodayPickPage />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer /> {/* ToastContainer 추가 */}
    </AuthProvider>
  );
}

export default App;
