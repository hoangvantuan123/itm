import axios from 'axios'
import { HOST_API_PUBLIC_HR } from '../../services'
import { accessToken } from '../../services/tokenService'

export const GetHrInfoId = async (id) => {
  try {
    const token = accessToken()
    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-information/personnel/${id}`,
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
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra khi lấy thông tin'
        : 'Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.',
    }
  }
}
