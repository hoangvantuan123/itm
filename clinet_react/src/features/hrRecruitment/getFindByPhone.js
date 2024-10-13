import axios from 'axios'
import { HOST_API_PUBLIC_HR } from '../../services'
import { accessToken } from '../../services/tokenService'

/**
 * @param {string} phone_number - The phone number to search for.
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export const GetFindByPhone = async (phone_number) => {
  try {
    const token = accessToken()

    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-information/find-by-phone/${phone_number}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    // Handle errors and return appropriate messages
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra khi lấy thông tin' // Default message in Vietnamese
        : 'Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.',
    }
  }
}
