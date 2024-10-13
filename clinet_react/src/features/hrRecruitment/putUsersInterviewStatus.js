import axios from 'axios'
import { HOST_API_PUBLIC_HR } from '../../services'

export const PutUsersInterviewStatus = async (
  personnelIds,
  interviewResult,
) => {
  try {
    const response = await axios.post(
      `${HOST_API_PUBLIC_HR}hr-information/personnel/interview/status`,
      { personnelIds, interviewResult },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    // Kiểm tra status code của response
    if (
      response.status === 200 ||
      response.status === 204 ||
      response.status === 201
    ) {
      // Thêm 201 vào điều kiện
      return {
        success: true,
        message: response.data.message || 'Operation successful',
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: `Unexpected status code: ${response.status}`,
      }
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
