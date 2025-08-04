
import {  makeMentorJsonApiRequest} from "./apiRequest";
const AdminbaseUrl = import.meta.env.VITE_ADMIN_ADD_MENTOR_API_URL;

export const AddMentorData = async ({ fullName, email, password }) => {
  const endpoint = `${AdminbaseUrl}add-mentor`;
  const jsonData = { fullName, email, password };

  try {
    const response = await makeMentorJsonApiRequest("POST", endpoint, jsonData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchMentorList = async () => {
  const endpoint = `${AdminbaseUrl}show-mentor-list`;
  try {
    const resposne = await makeMentorJsonApiRequest("GET", endpoint);
    return resposne;
  } catch (error) {
    throw error;
  }
};


export const EditMentorData = async (id,{ fullName, email, password }) => {
  const endpoint = `${AdminbaseUrl}update-mentor/${id}`;
  const jsonData = { fullName, email, password };

  try {
    const response = await makeMentorJsonApiRequest("PUT", endpoint, jsonData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteMentorData = async (id) => {
  const endpoint = `${AdminbaseUrl}delete-mentor/${id}`;

  try {
    const response = await makeMentorJsonApiRequest("DELETE", endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};