import axios from 'axios'
import { HOST_API_SERVER_P } from '../../../services'

export const RefreshToken = async (token) => {
  try {
    const response = await axios.post(
      `${HOST_API_SERVER_P}/refresh-token`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.data.success) {
      localStorage.setItem('token_1h', response.data.data.token)
      return {
        success: true,
        token: response.data.data.token,
      }
    } else {
      return {
        success: false,
        message: response.data.error || 'Có lỗi xảy ra',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.response
        ? error.response.data.error || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    }
  }
}
