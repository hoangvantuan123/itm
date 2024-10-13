// api.js
import axios from 'axios';
import {
    HOST_API_SERVER_IMPORT
} from '../../services';

export const ExportDataAPI = async (table, filter, startDate, endDate, fileType, ids ) => {
    try {
        const response = await axios.get(`${HOST_API_SERVER_IMPORT}export/data`, {
            params: {
                table,
                filter: JSON.stringify(filter),
                startDate,
                endDate,
                fileType,
                ids: ids,
            },
            responseType: 'blob',
        });

        return response;
    } catch (error) {
        throw new Error('Error exporting data: ' + error.message);
    }
};