import Cookies from 'js-cookie';
export const storeToken = (token) => {
  Cookies.set('token', token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
  Cookies.remove('role');
  Cookies.remove('course');
  // Cookies.remove('permissions');
  // Cookies.remove('avatar'); 
};

// export const isAuthenticated = () => {
//   const token = getToken();
//   return token != null;
// };
