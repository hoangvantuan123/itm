import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Table, Layout, Row, Col, Card, Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { GetHrSalaryCidId } from '../../features/hrSalary/getHrSalaryCidID';
import 'moment/locale/vi';
import '../../static/css/scroll_container.css';
import { debounce } from 'lodash';
import Spinner from './load'
const { Title } = Typography;
const { Content } = Layout;

const DetailPayrollUser = React.memo(({ permissions }) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
    const CID = userFromLocalStorage.employeeCode || 0
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const fetchDataUserId = async (userId) => {
        if (!userId) {
            setHasError(true); 
            return;
        }
        setLoading(true);
        try {
            const response = await GetHrSalaryCidId(userId, CID);
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
        debouncedFetchData(id);
        return () => {
            debouncedFetchData.cancel();
        };
    }, [id]);
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
        navigate(`/u/action=7/payroll`);
    };

    return (
        <div className="w-full h-screen overflow-auto bg-white p-3  pb-24">
            <Helmet>
                <title>ITM - {t(formData?.cid)}</title>
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
                                            <Title level={3}> {t('hr_payroll.de_salary')}: {formData?.monthly_salary}</Title>
                                            <div className="text-gray-600">
                                                <p><strong> {t('hr_payroll.name_user')}: </strong>{formData?.name || 'N/A'}</p>
                                                <p><strong>{t('hr_payroll.cid_name')}: </strong>{formData?.cid || 'N/A'}</p>
                                                <p><strong>{t('hr_payroll.department')}: </strong>{formData?.department || 'N/A'}</p>
                                            </div>
                                        </Col>


                                    </Row>
                                </Col>

                                <Col span={24}>
                                    <Title level={5}>{t('hr_payroll.working_status')}</Title>
                                    <Table
                                        size="small"
                                        pagination={false}
                                        bordered
                                        columns={[
                                            { title: t('hr_payroll.category'), dataIndex: 'key', key: 'key', width: '70%' },
                                            { title: t('hr_payroll.value'), dataIndex: 'value', key: 'value', align: 'center' },
                                        ]}
                                        dataSource={[
                                            { key: t('hr_payroll.official'), value: formData?.offcical || '0' },
                                            { key: t('hr_payroll.trial'), value: formData?.probation || '0' },
                                            { key: t('hr_payroll.actual_working_days'), value: formData?.so_ngay_di_lam_thuc_te || '0' },
                                            { key: t('hr_payroll.annual_leave'), value: formData?.annual_leave || '0' },
                                            { key: t('hr_payroll.leave_with_pay'), value: formData?.paid_leave || '0' },
                                            { key: t('hr_payroll.sub_total'), value: formData?.sub_total || '0' },
                                            { key: t('hr_payroll.working_hour'), value: formData?.working_hour || '0' },
                                            { key: t('hr_payroll.non_permisson_unpaid'), value: formData?.non_permisson_unpaid || '0' },
                                            { key: t('hr_payroll.normal_unpaid'), value: formData?.normal_unpaid || '0' },
                                            { key: t('hr_payroll.sub_total_normal'), value: formData?.sub_total_normal || '0' },
                                        ]}
                                    />
                                </Col>

                                <Col xs={24} sm={24} md={12}>
                                    <Title level={5}>{t('hr_payroll.over_time')}</Title>
                                    <Table
                                        size="small"
                                        pagination={false}
                                        bordered
                                        columns={[
                                            { title: t('hr_payroll.category'), dataIndex: 'key', key: 'key', width: '70%' },
                                            { title: t('hr_payroll.value'), dataIndex: 'value', key: 'value', align: 'center' },
                                        ]}
                                        dataSource={[
                                            { key: 'Normal (150%)', value: formData?.normal_150 || '0' },
                                            { key: 'Normal night (200%)', value: formData?.normal_200 || '0' },
                                            { key: 'Overtime night (210%)', value: formData?.normal_210 || '0' },
                                            { key: 'Night allowance (30%)', value: formData?.night_30 || '0' },
                                            { key: t('hr_payroll.psg_night'), value: formData?.psg_night || '0' },
                                            { key: 'Sunday (200%)', value: formData?.sunday_200 || '0' },
                                            { key: 'Sunday night (270%)', value: formData?.sunday_270 || '0' },
                                            { key: 'Holiday (300%)', value: formData?.holiday_300 || '0' },
                                            { key: 'Holiday night (390%)', value: formData?.holiday_390 || '0' },
                                        ]}
                                    />
                                </Col>

                                <Col xs={24} sm={24} md={12}>
                                    <Title level={5}>{t('hr_payroll.late_in_early_out')}</Title>
                                    <Table
                                        size="small"
                                        pagination={false}
                                        bordered
                                        columns={[
                                            { title: t('hr_payroll.category'), dataIndex: 'key', key: 'key', width: '70%' },
                                            { title: t('hr_payroll.value'), dataIndex: 'value', key: 'value', align: 'center' },
                                        ]}
                                        dataSource={[
                                            { key: t('hr_payroll.total_time'), value: formData?.total_time || '0' },
                                            { key: t('hr_payroll.frequency'), value: formData?.frequency || '0' },
                                            { key: t('hr_payroll.total_check_in_or_check_out'), value: formData?.total_check_in_or_check_out || '0' },
                                            { key: t('hr_payroll.no_data_check_for_check_in'), value: formData?.no_data_check_for_check_in || '0' },
                                        ]}
                                    />
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

export default DetailPayrollUser;
