import axios from 'axios'
import {
  HOST_API_PUBLIC_HR
} from '../../services'
import {
  accessToken
} from '../../services/tokenService'

export const GetFilterHrSalary = async (
  page = 1,
  limit = 50,
  date,
  nameTags = [],
  cid = [],
  syn,
  department = []
) => {
  try {
    const token = accessToken()

    const nameTagsString = nameTags.join(',')
    const citString = cid.join(',')
    const departmentString = department.join(',')

    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-salary/filter`, {
        params: {
          page,
          limit,
          date,
          nameTags: nameTagsString,
          cid: citString,
          syn,
          department: departmentString
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