import axios from 'axios'
import {
    HOST_API_SERVER_IMPORT
} from '../../services'

import {
    accessToken
} from '../../services/tokenService'

export const GetAllKeyImport = async () => {
    try {
        const token = accessToken()
        const response = await axios.get(
            `${HOST_API_SERVER_IMPORT}default-mapping/all`, {
                params: {

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