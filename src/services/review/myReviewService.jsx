import axiosInstance from "../../utils/axios";

export const getMyReviewList = async (page, size = 10, sort ) => {
    const response = await axiosInstance.get("/review/myReview", {
        params: {page: page, size:size, sort:"createdDate,desc"},
        withCredentials: true

    })
    return response.data;
}
