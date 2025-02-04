import axiosInstance from "../../utils/axios";

export const getMemberRecord = async ({type}) => {
    const response = await axiosInstance.get("/member/record", {
        params: {type: type},
        withCredentials: true
    })
    return response.data;
}
