import { makeMentorJsonApiRequest, makeJsonFormDataApiRequest } from "./apiRequest";
const tagBaseUrl = import.meta.env.VITE_TAG_SERVICE_API_URL;
const postUrl = import.meta.env.VITE_POST_SERVICE_API_URL;

export const getTags = async () => {
  const endpoint = `${tagBaseUrl}all-tag-list`;
  try {
    const resposne = await makeMentorJsonApiRequest("GET", endpoint);
    return resposne;
  } catch (error) {
    throw error;
  }
};



export const createPost = async (formData) => {
  const endpoint = `${postUrl}create-post`;

  try {
    const response = await makeJsonFormDataApiRequest("POST", endpoint, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPost = async () => {
  const endpoint = `${postUrl}get-all-posts`;
  try {
    const resposne = await makeMentorJsonApiRequest("GET", endpoint);
    return resposne;
  } catch (error) {
    throw error;
  }
};