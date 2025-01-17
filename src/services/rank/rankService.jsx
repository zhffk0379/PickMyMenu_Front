import axiosInstance from "../../utils/axios";

export const getRank = async ({type}) => {
  const response = await axiosInstance.get("v1/rank/menu",{
    params:{type: type}
  })
  return response.data;
}