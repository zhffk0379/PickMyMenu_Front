import axiosInstance from "../../utils/axios";

export const getReviewList = async (page, size=10, sort=undefined) => {
  const response = await axiosInstance.get("/review", {
    params: {page, size, sort}
  })
  return response.data;
}
