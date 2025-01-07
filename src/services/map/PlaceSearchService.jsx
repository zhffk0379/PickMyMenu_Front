import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const placeSearchService = async (keyword, lat, lng) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/map/placeSearch`, {
      params: {
        query: keyword + " 전문점",
        x: lng,
        y: lat
      },
    });

    return response.data; // 검색 결과 반환
  } catch (error) {
    console.error("검색 API 호출 중 오류:", error.message);
    throw new Error("검색 결과를 가져올 수 없습니다.");
  }
};
