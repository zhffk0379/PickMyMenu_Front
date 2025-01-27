import axiosInstance from "../../utils/axios";

export const getMyReviewList = async (page, size=10, sort=undefined) => {
  console.log(page);
  const response = await axiosInstance.get("/review/myReview", {
    params: {page, size, sort},
    withCredentials: true

})
  return response.data;
}
