import React, { useState } from "react";
// import {placeSearchService} from "../../services/map/PlaceSearchService";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      // const items = await placeSearchService(keyword);
      setResults(items); // 검색 결과 저장
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            <p>{item.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
