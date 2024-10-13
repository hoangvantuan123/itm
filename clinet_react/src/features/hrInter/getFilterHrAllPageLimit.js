import axios from 'axios'
import { HOST_API_PUBLIC_HR } from '../../services'
import { accessToken } from '../../services/tokenService'

export const GetFilterHrInterPageLimit = async (
  page = 1,
  limit = 10,
  startDate,
  endDate,
  nameTags = [],
  phoneNumberTags = [],
  citizenshipIdTags = [],
  cid = [],
  syn,
  interViewDateFilter,
  applicantType = [],
  applicantStatus = [],
) => {
  try {
    const token = accessToken()

    const nameTagsString = nameTags.join(',')
    const phoneNumberTagsString = phoneNumberTags.join(',')
    const citizenshipIdTagsString = citizenshipIdTags.join(',')
    const applicantTypeTagString = applicantType.join(',')
    const applicantStatusString = applicantStatus.join(',')
    const citString = cid.join(',')

    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-inter-data/filter`,
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
          interViewDateFilter,
          applicantType: applicantTypeTagString,
          applicantStatus: applicantStatusString,
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
