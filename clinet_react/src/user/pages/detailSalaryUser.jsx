import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Table, Layout, Row, Col, Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { GetHrSalaryId } from '../../features/hrSalary/getHrSalaryId';
import 'moment/locale/vi';
import '../../static/css/scroll_container.css';
import { debounce } from 'lodash'; 

const { Title } = Typography;
const { Content } = Layout;

const DetailSalaryUser = React.memo(({ permissions }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchDataUserId = async (userId) => {
        if (!userId) return; 
        setLoading(true);
        try {
            const response = await GetHrSalaryId(userId);
            if (response.success && response.data.status) {
                setFormData(response.data.data);
            } else {
                setFormData({});
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setFormData({});
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchData = useMemo(() => debounce(fetchDataUserId, 300), []);

    useEffect(() => {
        debouncedFetchData(id);
        return () => {
            debouncedFetchData.cancel(); 
        };
    }, [id]);

    const prepareTableData = useMemo(() => {
        const tableData = [];
        const keysToInclude = [
            'start', 'stop', 'day_off', 'overtime_normal_150', 'overtime_normal_200',
            'overtime_normal_210', 'at_night_30', 'overtime_sunday_200', 'overtime_sunday_270',
            'overtime_holiday_300', 'overtime_holiday_390', 'working_day', 'late_in', 'early_out'
        ];

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

        const formDataKeys = Object.keys(formData);
        formDataKeys.forEach(field => {
            if (keysToInclude.includes(field)) {
                const row = { key: displayNames[field] };
                for (let day = 1; day <= 31; day++) {
                    row[day] = formData[field]?.[day] || '';
                }
                tableData.push(row);
            }
        });

        return tableData;
    }, [formData]);

    const columns = useMemo(() => [
        {
            title: 'Hạng mục',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 200,
            className: 'table-column-header',
        },
        ...Array.from({ length: 31 }, (_, i) => ({
            title: `${i + 1}`,
            dataIndex: `${i + 1}`,
            key: `${i + 1}`,
            width: 50,
        })),
    ], []);

    const handleNavigateToBack = () => {
        navigate(`/u/action=20/data-salary`);
    };

    return (
        <div className="w-full h-screen overflow-auto bg-white p-3  pb-24">
            <Helmet>
                <title>ITM - {t(formData?.cid)}</title>
            </Helmet>
            <nav aria-label="Breadcrumb" className="flex justify-between items-center mb-2">
                <ol className="flex items-center gap-1 text-sm text-gray-700">
                    <li onClick={handleNavigateToBack} className="cursor-pointer">
                        <span className="text-black hover:text-indigo-950 opacity-80">
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
                        <span className="text-black opacity-80">#{formData?.cid}</span>
                    </li>
                </ol>
            </nav>

            <Layout>
                <Content className="overflow-auto bg-white p-3 ">
                    <Row gutter={[16, 16]} className="h-full">
                        <Col span={24}>
                            <Row className="mb-10">
                                <Col span={24}>
                                    <Title level={3}>BẢNG LƯƠNG: {formData?.monthly_salary}</Title>
                                    <div className="text-gray-600">
                                        <p><strong>Họ tên: </strong>{formData?.name || 'N/A'}</p>
                                        <p><strong>Mã nhân viên: </strong>{formData?.cid || 'N/A'}</p>
                                        <p><strong>Phòng ban: </strong>{formData?.department || 'N/A'}</p>
                                    </div>
                                </Col>

                          
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Title level={5}>WORKING STATUS / TÌNH TRẠNG LÀM VIỆC</Title>
                            <Table
                                size="small"
                                pagination={false}
                                bordered
                                columns={[
                                    { title: 'Hạng mục', dataIndex: 'key', key: 'key', width: '70%' },
                                    { title: 'Giá trị', dataIndex: 'value', key: 'value', align: 'center' },
                                ]}
                                dataSource={[
                                    { key: 'Official / Chính thức', value: '21,0' },
                                    { key: 'Probation / Thử việc', value: '0,0' },
                                    { key: 'Actual working day / Ngày làm việc thực tế', value: '21,0' },
                                    { key: 'Annual Leave / Nghỉ phép', value: '0,0' },
                                    { key: 'Leave with pay / Nghỉ hưởng lương', value: '0,0' },
                                    { key: 'Sub Total / Tổng ngày công', value: formData?.total || '0' },
                                ]}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={12}>
                            <Title level={5}>OVER TIME / LÀM THÊM GIỜ</Title>
                            <Table
                                size="small"
                                pagination={false}
                                bordered
                                columns={[
                                    { title: 'Hạng mục', dataIndex: 'key', key: 'key', width: '70%' },
                                    { title: 'Giá trị', dataIndex: 'value', key: 'value', align: 'center' },
                                ]}
                                dataSource={[
                                    { key: 'Normal (150%)', value: '13,75' },
                                    { key: 'Normal night (200%)', value: '0,00' },
                                    { key: 'Overtime night (210%)', value: '0,00' },
                                    { key: 'Night allowance (30%)', value: '0,00' },
                                    { key: 'Sunday (200%)', value: '0,00' },
                                    { key: 'Sunday night (270%)', value: '0,00' },
                                    { key: 'Holiday (300%)', value: '0,00' },
                                    { key: 'Holiday night (390%)', value: '0,00' },
                                ]}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={12}>
                            <Title level={5}>LATE IN, EARLY OUT / ĐI MUỘN, VỀ SỚM</Title>
                            <Table
                                size="small"
                                pagination={false}
                                bordered
                                columns={[
                                    { title: 'Hạng mục', dataIndex: 'key', key: 'key', width: '70%' },
                                    { title: 'Giá trị', dataIndex: 'value', key: 'value', align: 'center' },
                                ]}
                                dataSource={[
                                    { key: 'Total (hours) / Tổng số giờ', value: '0,0' },
                                    { key: 'Frequency (time) / Tần suất', value: '1,0' },
                                    { key: 'Total check-in / Tổng số lần không chấm giờ', value: '0,0' },
                                    { key: 'No data for check-in', value: '0,0' },
                                ]}
                            />
                        </Col>
                    </Row>

                    <div className="overflow-x-auto mt-4">
                        <Title level={5}>BẢNG CÔNG CHI TIẾT TỪNG NGÀY</Title>
                        <Table
                            size="small"
                            columns={columns}
                            dataSource={prepareTableData}
                            pagination={false}
                            bordered
                            loading={loading}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </Content>
            </Layout>
        </div>
    );
});

export default DetailSalaryUser;
