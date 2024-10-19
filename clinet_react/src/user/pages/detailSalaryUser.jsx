
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Table, Layout, Row, Col, Card, Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { GetHrSalaryId } from '../../features/hrSalary/getHrSalaryId';
import 'moment/locale/vi';
import '../../static/css/scroll_container.css';
import { debounce } from 'lodash';
import Spinner from './load'
const { Title } = Typography;
const { Content } = Layout;

const DetailSalaryUser = React.memo(({ permissions }) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
    const CID = userFromLocalStorage.employeeCode || 0
    const { t } = useTranslation();
    const { month_year } = useParams();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);


    const fetchDataUserId = async (userId, month_year) => {
        if (!userId && !month_year) {
            setHasError(true);
            return;
        }
        setLoading(true);
        try {
            const response = await GetHrSalaryId(userId, month_year);
            if (response.success && response.data.status) {
                setFormData(response.data.data);
            } else {
                setFormData({});
                setHasError(true);
            }
        } catch (error) {
            setFormData({});
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchData = useMemo(() => debounce(fetchDataUserId, 300), []);

    useEffect(() => {
        debouncedFetchData(id, month_year);
        return () => {
            debouncedFetchData.cancel();
        };
    }, [id, month_year]);
    const prepareTableData = useMemo(() => {
        if (!formData) return [];
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
                    const dayKey = String(day).padStart(2, '0'); // Ensure day is two digits
                    row[dayKey] = formData[field]?.[dayKey] || ''; // Use the padded dayKey
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
        ...Array.from({ length: 31 }, (_, i) => {
            const day = String(i + 1).padStart(2, '0'); 
            return {
                title: day,  
                dataIndex: day,
                key: day, 
                width: 50,
            };
        }),
    ], []);

    const handleNavigateToBack = () => {
        navigate(`/u/action=20/data-salary`);
    };
    return (
        <div className="w-full h-screen overflow-auto bg-white p-3  pb-24">
            <Helmet>
                <title>ITM - {t(formData?.empid)}</title>
            </Helmet>

            {loading ? (
                <Spinner />
            ) : hasError ? (
                <div>

                    <div className="grid h-screen place-content-center bg-white px-4">
                        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
                        <button onClick={handleNavigateToBack} className="mt-5">Quay lại</button>
                    </div>

                </div>
            ) : (
                <>

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
                                <span className="text-black opacity-80">#{formData?.empid}</span>
                            </li>
                        </ol>
                    </nav>

                    <Layout>
                        <Content className="overflow-auto bg-white p-3 ">
                            <Row gutter={[16, 16]} className="h-full">
                                <Col span={24}>
                                    <Row className="mb-10">
                                        <Col span={24}>
                                            <Title level={3}> {t('hr_payroll.de_salary')}: {formData?.date}</Title>
                                            <div className="text-gray-600">
                                                <p><strong> {t('hr_payroll.name_user')}: </strong>{formData?.empname || 'N/A'}</p>
                                                <p><strong>{t('hr_payroll.cid_name')}: </strong>{formData?.empid || 'N/A'}</p>
                                                <p><strong>{t('hr_payroll.department')}: </strong>{formData?.department_name || 'N/A'}</p>
                                            </div>
                                        </Col>


                                    </Row>
                                </Col>
                            </Row>
                            <div className="overflow-x-auto mt-4">
                                <Title level={5}>{t('hr_payroll.detailed_work_table')}</Title>
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

                </>
            )}

        </div>
    );
});

export default DetailSalaryUser;

