import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./HomePage.css"

const HomePage = () => {

    return (
      <div className={"home-container"}>
        <Link to={"/group1"} className={"recommendation-link"}>
          음식 추천
        </Link>
        <Link to={"/test"} className={"recommendation-link"}>
          순위
        </Link>
      </div>
    );
};

export default HomePage;