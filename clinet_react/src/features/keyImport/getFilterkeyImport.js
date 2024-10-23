import axios from 'axios'
import { HOST_API_SERVER_IMPORT } from '../../services'

import { accessToken } from '../../services/tokenService'

export const GetFilterKeyImport = async (
  page = 1,
  limit = 10,
  nameTags = []
) => {
  try {
    const token = accessToken()

    const nameTagsString = nameTags.join(',')

    const response = await axios.get(
      `${HOST_API_SERVER_IMPORT}default-mapping/filter`,
      {
        params: {
          page,
          limit,
          nameTags: nameTagsString,
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
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    }
  }
}
