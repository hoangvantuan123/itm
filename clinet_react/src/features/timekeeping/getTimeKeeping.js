import axios from 'axios';
import { HOST_API_PUBLIC_HR } from '../../services';
import { accessToken , getEmployeeCode} from '../../services/tokenService';
export const GetTimekeepingUser = async (monthYear) => {
  try {
    const token = accessToken();  
    const employeeCode = getEmployeeCode();
    const url = `${HOST_API_PUBLIC_HR}hr-timekeeping?cid=${employeeCode}&month_year=${monthYear}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Có lỗi xảy ra khi lấy thông tin';

    return {
      success: false,
      message: error.message.includes('Network Error')
        ? 'Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.'
        : errorMessage,
    };
  }
};
