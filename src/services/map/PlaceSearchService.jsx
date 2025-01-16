import axiosInstance from "../../utils/axios";

export const placeSearchService = async (keyword, lat, lng) => {
  try {
    const response = await axiosInstance.get("/v1/map/placeSearch", {
      params: {
        query: keyword + " 전문점",
        x: lng,
        y: lat
      },
    })
    return response.data; // 검색 결과 반환
  } catch (error) {
    console.error("검색 API 호출 중 오류:", error);
    throw new Error("검색 결과를 가져올 수 없습니다.");
  }

};
