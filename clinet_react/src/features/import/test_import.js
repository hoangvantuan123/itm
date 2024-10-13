import axios from 'axios'
import { HOST_API_SERVER_IMPORT } from '../../services'
import { accessToken } from '../../services/tokenService'

/**
 * Hàm để import dữ liệu lên server
 * @param {Object} data - Dữ liệu cần import
 * @returns {Promise<Object>} Kết quả của quá trình import
 */
export const TestImportData = async (data) => {
  try {
    // Lấy token xác thực
    const token = accessToken()

    // Gửi yêu cầu POST tới server
    const response = await axios.post(
      `${HOST_API_SERVER_IMPORT}test-import`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    // Kiểm tra phản hồi từ server
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
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    }
  }
}
