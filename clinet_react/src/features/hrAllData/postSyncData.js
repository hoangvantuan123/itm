import axios from 'axios'
import { accessToken } from '../../services/tokenService'
import { HOST_API_PUBLIC_HR } from '../../services'

export const PostSyncData = async (ids) => {
  try {
    const token = accessToken() // Lấy token từ dịch vụ

    const response = await axios.post(
      `${HOST_API_PUBLIC_HR}hr-all-data/synchronize`,
      {
        ids,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    // Kiểm tra mã trạng thái phản hồi
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: response.data.message || 'Operation successful',
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: `Unexpected status code: ${response.status}`,
      }
    }
  } catch (error) {
    // Xử lý lỗi
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    }
  }
}
