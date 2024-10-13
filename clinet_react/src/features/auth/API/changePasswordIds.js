import axios from 'axios'
import { HOST_API_SERVER_P } from '../../../services'
import { accessToken } from '../../../services/tokenService'
export const changePasswordIds = async (userIds, newPassword) => {
  try {
    const token = accessToken()
    const response = await axios.put(
      `${HOST_API_SERVER_P}/bulk-update-password`,
      {
        userIds: userIds,
        newPassword: newPassword,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      return { success: true, message: response.data.message }
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : 'Có lỗi xảy ra',
    }
  }
}
