import axios from 'axios'
import { HOST_API_SERVER_P } from '../../../services'
import { accessToken } from '../../../services/tokenService'

export const GetUserPermissions = async () => {
  try {
    const token = accessToken()
    const response = await axios.get(
      `${HOST_API_SERVER_P}/details/7e7c585f91ff5c2b64e75c2cfdb650e60d5f81f87b3fdd24144dfd82dc7a6d42`,
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
    const errorMessage = error.response
      ? error.response.data.message || 'Có lỗi xảy ra'
      : 'Không thể kết nối tới server'

    return {
      success: false,
      message: errorMessage,
    }
  }
}
