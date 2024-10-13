import axios from 'axios'
import { HOST_API_PUBLIC_HR } from '../../services'
import { accessToken } from '../../services/tokenService'

export const GetFilterHrAllPageLimit = async (
  page = 1,
  limit = 10,
  startDate,
  endDate,
  nameTags = [],
  phoneNumberTags = [],
  citizenshipIdTags = [],
  cid = [],
  syn,
) => {
  try {
    const token = accessToken()

    const nameTagsString = nameTags.join(',')
    const phoneNumberTagsString = phoneNumberTags.join(',')
    const citizenshipIdTagsString = citizenshipIdTags.join(',')
    const citString = cid.join(',')

    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-all-data/filter`,
      {
        params: {
          page,
          limit,
          startDate,
          endDate,
          nameTags: nameTagsString,
          phoneNumberTags: phoneNumberTagsString,
          citizenshipIdTags: citizenshipIdTagsString,
          cid: citString,
          syn,
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
