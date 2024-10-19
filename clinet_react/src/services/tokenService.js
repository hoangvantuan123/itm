import Cookies from 'js-cookie'

export const accessToken = () => {
  return Cookies.get('accessToken')
}

export const getEmployeeCode = () => {
  const userInfo = localStorage.getItem('userInfo');
  
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo.employeeCode || null;
  }
  
  return null; 
};
