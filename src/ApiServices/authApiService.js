import Cookies from "js-cookie";
import { makeJsonApiRequest, makeJsonFormDataApiRequest, makeMentorJsonApiRequest} from "./apiRequest";
import { removeToken } from "../utils/authHelpers";
const baseUrl = import.meta.env.VITE_API_URL;
const enumBaseUrl = import.meta.env.VITE_COURSE_API_URL;
const profileUrl = import.meta.env.VITE_PROFILE_API_URL;
import axios from "axios";


export const registerUser = async ({ fullName, email, password, course }) => {
  const endpoint = `${baseUrl}signup`;
  const jsonData = { fullName, email, password, course };

  try {
    const response = await makeJsonApiRequest("POST", endpoint, jsonData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}verify-email`, {
      params: { token },
    });
    return response.data;
  } catch (error) {
    console.log("🔥 Error in verifyEmail:", error.response?.data || error.message);
    throw error.response?.data || { status: "error", message: "Something went wrong" };
  }
};
export const loginUser = async (email, password) => {
    const endpoint = `${baseUrl}login`;
    const jsonData = { email, password };

    try {
        const response = await makeJsonApiRequest('POST', endpoint, jsonData);
        if (response && response.data && response.data.token ) {
            Cookies.set('token', response.data.token, { expires: 7 });
            Cookies.set('role' , response.data.role, { expires: 7 });
            Cookies.set('course' , response.data.course, { expires: 7 });

        }
        return response;
    } catch (error) {
      console.error(" Login error:", error);
        throw error;
    }
};

export const fetchCourseList = async () => {
  const endpoint = `${enumBaseUrl}courselist/names`;
  try {
    const { data } = await makeJsonApiRequest("GET", endpoint);

    if (Array.isArray(data) && data.length > 0) {
      return data;
    } else {
      throw new Error("No course data found");
    }
  } catch (error) {
    throw error;
  }
};


export const forgotPassword = async ({  email }) => {
  const endpoint = `${baseUrl}forgot-password`;
  const jsonData = { email };

  try {
    const response = await makeJsonApiRequest("POST", endpoint, jsonData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  const endpoint = `${profileUrl}profile/myself`;
  try {
    const resposne = await makeMentorJsonApiRequest("GET", endpoint);
    return resposne;
  } catch (error) {
    throw error;
  }
};

export const uploadAvatar = async (file) => {
  const endpoint = `${profileUrl}profile/upload-avatar`; 
  const formData = new FormData();
  formData.append("file", file); 

  try {
    const response = await makeJsonFormDataApiRequest("POST", endpoint, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
    removeToken();
};