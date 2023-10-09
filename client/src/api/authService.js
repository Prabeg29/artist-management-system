import axios from "axios";
import * as dayjs from "dayjs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8848/api",
});

export const signUp = async data => {
    try {
        const response = await axiosInstance.post(
            "/auth/signup", 
            { ...data, dob: dayjs(data.dob).format("YYYY-MM-DD") }
        );

        return response;
    } catch (error) {
        throw error;
    }
};
