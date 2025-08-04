import axios from "axios";
import Cookies from "js-cookie";

export const makeJsonApiRequest = async(
    method , endpoint , jsonData = null
) => {
    try{
       let header  = {};
       const storedToken = Cookies.get('token');

       if(storedToken){
        header = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
        
      };
    } else {
      header = {
        'Content-Type': 'application/json',
      };
    }

    const config = {
      method,
      url: endpoint,
      data: jsonData,
      header,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
   if (error.response && error.response.data) {
      throw error.response.data; 
    }

    throw { status: "error", message: error.message || "Unknown error" };
  }
}

export const makeJsonFormDataApiRequest = async ( method , endpoint , jsonData = null , token) => {
   try{
    let headers = {};
    const storedToken = Cookies.get('token');
    if (storedToken) {
      headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${storedToken}`,
      };
    } else {
      headers = {
        'Content-Type': 'multipart/form-data',
      };
    }

    const config = {
      method,
      url: endpoint,
      data: jsonData,
      headers,
    };

    const response = await axios(config);

    return response;
  } catch (error) {
    return error.response;
  }
}


export const makeBearerJsonApiRequest = async (
    method,
    endpoint,
    jsonData = null,
    token
  ) => {
    try {
      let headers = {};
      const storedToken = token || Cookies.get('token');
    
      if (storedToken) {
        headers = {
          'Content-Type': 'application/json',
          Authorization: ` ${storedToken}`,
        };
      } else {
        headers = {
          'Content-Type': 'application/json',
        };
      }
  
      const config = {
        method,
        url: endpoint,
        data: jsonData,
        headers,
      };
      const response = await axios(config);
      
      return response.data;
      
    } catch (error) {
      console.error('API Request Error:', error);
      return error.response ? error.response.data : { error: 'Request failed' };
    }
  };


  export const makeMentorJsonApiRequest = async (
  method,
  endpoint,
  jsonData = null
) => {
  try {
    let header = {};
    const storedToken = Cookies.get('token');

    if (storedToken) {
      header = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      };
    } else {
      header = {
        'Content-Type': 'application/json',
      };
    }

    const config = {
      method,
      url: endpoint,
      data: jsonData,
      headers: header, 
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { status: 'error', message: error.message || 'Unknown error' };
  }
};
