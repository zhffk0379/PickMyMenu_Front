import React, { useState, useEffect } from "react";
import { loadNaverMapScript } from "../../utils/loadNaverMapScript";
import MapComponent from "./MapComponent";
import SearchInput from "./SearchInput";
import {searchPlaces} from "../../utils/searchPlaces";

const NaverMap = ({ center, zoom }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadNaverMapScript(process.env.REACT_APP_NAVER_MAP_CLIENT_ID);
        setScriptLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadScript();
  }, []);

  const handleSearch = async (keyword) => {
    try {
      const result = await searchPlaces(keyword);
      setPlaces(result);
    } catch (e){
      console.error(e.message)
    }
  }

  if (!scriptLoaded) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <div>
      <SearchInput onSearch={handleSearch}/>
      <MapComponent center={center} zoom={zoom} places={places}/>
    </div>
  );
};

export default NaverMap;
