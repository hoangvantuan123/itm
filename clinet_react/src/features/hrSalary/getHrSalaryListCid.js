import axios from 'axios'
import {
  HOST_API_PUBLIC_HR
} from '../../services'
import {
  accessToken, getEmployeeCode
} from '../../services/tokenService'

export const GetFilterHrSalaryListCid = async (
  page = 1,
  limit = 50,
  date,
  nameTags = [],
  cid = [],
  department = []
) => {
  try {
    const token = accessToken()
    const employeeCode = getEmployeeCode();
    const nameTagsString = nameTags.join(',')
    const departmentString = department.join(',')

    const response = await axios.get(
      `${HOST_API_PUBLIC_HR}hr-timekeeping/filter`, {
        params: {
          page,
          limit,
          date,
          nameTags: nameTagsString,
          cid: employeeCode,
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