import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import {
    Row,
    Col,
    Typography,
    Button,
    Form,
    Input,
    Radio,
    message,
    Pagination,
    Select,
    DatePicker,
    Space,
    Dropdown,
    Menu,
    Tabs,
    Table,
    Spin,
    Layout
} from 'antd';
const { Title, Text } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { GetHrSalaryId } from '../../features/hrSalary/getHrSalaryId';
const { TabPane } = Tabs;
const { Content } = Layout
import 'moment/locale/vi';
import '../../static/css/scroll_container.css';

export default function DetailSalaryUser({ permissions }) {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataMore, setDataMore] = useState([]);
    const [form] = Form.useForm();
    const [formMore] = Form.useForm();
    const [formFilled, setFormFilled] = useState(false);
    const [status, setStatus] = useState(null);
    const [type, setType] = useState(null);

    const fetchDataUserId = async () => {
        setLoading(true);
        try {
            const response = await GetHrSalaryId(id);
            if (response.success) {
                if (response.data.status) {
                    setFormData(response.data.data);
                    setError(null);
                } else {
                    setError('Không có dữ liệu cho ID này.');
                    setFormData({});
                }
            } else {
                setError('Dữ liệu không khả dụng.');
                setFormData({});
            }
        } catch (error) {
            setError(error.message || 'Đã xảy ra lỗi');
            setFormData({});
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToBack = () => {
        navigate(`/u/action=20/data-salary`);
    };

    useEffect(() => {
        if (id) {
            fetchDataUserId();
        }
    }, [id]);

    const prepareTableData = () => {
        const tableData = [];
        const fields = Object.keys(formData);

        const keysToInclude = ['start', 'stop', 'day_off', 'overtime_normal_150', 'overtime_normal_200', 'overtime_normal_210', 'at_night_30', 'overtime_sunday_200', 'overtime_sunday_270', 'overtime_holiday_300', 'overtime_holiday_390', 'working_day', 'late_in', 'early_out'];

        // Đối tượng ánh xạ tên trường với tên hiển thị
        const displayNames = {
            start: 'Thời gian bắt đầu',
            stop: 'Thời gian kết thúc',
            day_off: 'Ngày nghỉ',
            overtime_normal_150: 'Làm thêm giờ 150%',
            overtime_normal_200: 'Làm thêm giờ 200%',
            overtime_normal_210: 'Làm thêm giờ 210%',
            at_night_30: 'Làm việc ban đêm 30%',
            overtime_sunday_200: 'Làm thêm Chủ nhật 200%',
            overtime_sunday_270: 'Làm thêm Chủ nhật 270%',
            overtime_holiday_300: 'Làm thêm ngày lễ 300%',
            overtime_holiday_390: 'Làm thêm ngày lễ 390%',
            working_day: 'Ngày làm việc',
            late_in: 'Đi muộn',
            early_out: 'Về sớm',
        };

        fields.forEach(field => {
            if (keysToInclude.includes(field)) {
                const row = { key: displayNames[field] };
                for (let day = 1; day <= 31; day++) {
                    row[day] = formData[field]?.[day] || '';
                }
                tableData.push(row);
            }
        });


        return tableData;
    };

    // Cập nhật columns
    const columns = [
        {
            title: 'Hạng mục',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
        },
        ...Array.from({ length: 31 }, (_, i) => ({
            title: `${i + 1}`,
            dataIndex: `${i + 1}`,
            key: `${i + 1}`,
        })),
    ];

    return (
        <div className="w-full h-screen bg-white p-3">
            <Helmet>
                <title>ITM - {t(formData?.cid)}</title>
            </Helmet>

            <nav aria-label="Breadcrumb" className="flex justify-between items-center mb-6">
                <ol className="flex items-center gap-1 text-sm text-gray-700">
                    <li onClick={handleNavigateToBack} className="cursor-pointer">
                        <span className=" text-black hover:text-indigo-950 opacity-80">
                            {t('hr_recruitment_1_1.cancel')}
                        </span>
                    </li>
                    <li className="rtl:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                    <li className="cursor-pointer">
                        <span className=" text-black opacity-80">#{formData?.cid}</span>
                    </li>
                </ol>
            </nav>

            <Layout>
                <Content className="flex-1 overflow-auto bg-white p-2">
                    <Row gutter={[16, 16]}>
                        <Col span={12} >2 </Col>
                        <Col span={12}  > 2</Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} ><Table
                            size="small"
                            columns={columns}
                            dataSource={prepareTableData()}
                            pagination={false}
                            bordered
                            className="cursor-pointer"
                            loading={loading}
                        /></Col>
                    </Row>

                </Content>
            </Layout>


        </div>
    );
}
