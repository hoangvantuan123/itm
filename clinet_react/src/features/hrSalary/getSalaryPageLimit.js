import axios from 'axios'
import {
  HOST_API_PUBLIC_HR
} from '../../services'
import {
  accessToken
} from '../../services/tokenService'

export const GetHrSalaryPageLimit = async (
  page = 1,
  limit = 10
) => {
  try {
    const token = accessToken()
    const response = await axios.get(`${HOST_API_PUBLIC_HR}hr-timekeeping/list`, {
      params: {
        page,
        limit
      },
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
      message: error.response ?
        error.response.data.message || 'Có lỗi xảy ra' :
        'Không thể kết nối tới server',
    }
  }
}