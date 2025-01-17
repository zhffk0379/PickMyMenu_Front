import axiosInstance from "../../utils/axios";

export const getRankMenu = async ({type}) => {
  const response = await axiosInstance.get("v1/rank/menu", {
    params: {type: type}
  })
  return response.data;
}

export const getRankSurvey = async ({type}) => {
  const response = await axiosInstance.get("v1/rank/survey", {
    params: {type: type}
  });
  return response.data;
}