import axios from 'axios'
import {
  HOST_API_SERVER_P
} from '../../services'
import {
  accessToken
} from '../../services/tokenService'

export const GetFilterUsers = async (
  page = 1,
  limit = 50,
  startDate,
  endDate,
  nameTags = [],
  cid = []
) => {
  try {
    const token = accessToken()

    const nameTagsString = nameTags.join(',')
    const citString = cid.join(',')

    const response = await axios.get(
      `${HOST_API_SERVER_P}/filter`, {
        params: {
          page,
          limit,
          startDate,
          endDate,
          nameTags: nameTagsString,
          employeeCodeTags: citString,
        },
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
      message: error.response ?
        error.response.data.message || 'Có lỗi xảy ra' : 'Không thể kết nối tới server',
    }
  }
}