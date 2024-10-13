import axios from 'axios'
import { HOST_API_SERVER_P } from '../../services'
import { accessToken } from '../../services/tokenService'

export const PutMenuID = async (id, data) => {
  try {
    const token = accessToken()
    const response = await axios.put(`${HOST_API_SERVER_P}/menu/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    // Kiểm tra status code
    if (response.status === 200 || response.status === 204) {
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
    // Xử lý lỗi tốt hơn
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    }
  }
}
