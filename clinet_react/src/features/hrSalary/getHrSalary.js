import axios from 'axios';
import { HOST_API_PUBLIC_HR } from '../../services';
import { accessToken } from '../../services/tokenService';

export const GetHrSalary = async (cid, monthYear) => {
  try {
    const token = accessToken();
    
    const url = monthYear 
      ? `${HOST_API_PUBLIC_HR}hr-salary/cid/${cid}?monthYear=${monthYear}`
      : `${HOST_API_PUBLIC_HR}hr-salary/cid/${cid}`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra khi lấy thông tin'
        : 'Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.',
    };
  }
};
