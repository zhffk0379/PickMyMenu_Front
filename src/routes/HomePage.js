import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./HomePage.css"

const HomePage = () => {

  return (
    <div className={"home-container"}>
      <Link to={"/choice"} className={"recommendation-link"}>
        음식 추천
      </Link>
      <Link to={"/parent"} className={"recommendation-link"}>
        AI 추천
      </Link>
      <Link to={"/ranking"} className={"recommendation-link"}>
        순위
      </Link>
    </div>
  );
};

export default HomePage;