import axios from 'axios'
import { HOST_API_SERVER_P } from '../../services'
import { accessToken } from '../../services/tokenService'

export const GetAllDepartments = async () => {
  try {
    const token = accessToken()
    const response = await axios.get(`${HOST_API_SERVER_P}/hr_department/all`, {
      params: {},
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      success: true,
      data: response.data,
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
