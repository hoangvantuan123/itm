import axios from 'axios';
import { HOST_API_PUBLIC_HR } from '../../services';
import { accessToken } from '../../services/tokenService';

export const GetHrSalary = async (page = 1, limit = 50, cid, monthYear) => {
  try {
    const token = accessToken();

    const queryParams = new URLSearchParams({ page, limit });
    if (monthYear) queryParams.append('monthYear', monthYear);

    const url = `${HOST_API_PUBLIC_HR}hr-salary/cid/${cid}?${queryParams.toString()}`;

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
