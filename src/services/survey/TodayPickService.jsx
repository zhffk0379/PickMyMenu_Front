import axiosInstance from "../../utils/axios";

export const getTodayPick = async () => {
  try{
    const response = await axiosInstance.get("/gemini/todayPick", {
      withCredentials: true,
    });
    return response;
  }catch (error){
    console.error("검색 API 호출 중 오류:", error);
    throw new Error("검색 결과를 가져올 수 없습니다.");
  }
}

