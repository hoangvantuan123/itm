/* EmployeeRecruitment */
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Layout,
    Table,
    Button,
    Select,
    Modal,
    Checkbox,
    Drawer,
    Row,
    Col,
    DatePicker,
    Card,
    Pagination,
    Spin
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { PlusOutlined } from '@ant-design/icons'
import { checkActionPermission } from '../../permissions'
import ImportAction from '../components/action/importAction'
import moment from 'moment-timezone'

import { GetHrSalary } from '../../features/hrSalary/getHrSalary'
import { GetFilterHrSalary } from '../../features/hrSalary/getFilterHrSalary'
import ShowAction from '../components/action/showAction'
import FieldActionInter from '../components/action/fieldActionInter'
import AddHrInter from '../components/add/addHrInter'
import CustomTagInter from '../components/tags/customTagInter'
import CustomTagSyn from '../components/tags/customTagSyn'
import SynActionHrInter from '../components/action/synActionHrInter'
import { MailOutlined, PhoneOutlined, UserOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

import FieldActionSalary from '../components/action/fieldActionHrSalary'
const { RangePicker } = DatePicker
const { Content } = Layout
const { Option } = Select

const columnConfig = [
    { key: 'cid', label: 'cid' },
    { key: 'name', label: 'name' },
    { key: 'department', label: 'department' },
    { key: 'monthly_salary', label: 'monthly_salary' },
    { key: 'total', label: 'total' },
    { key: 'normal_150', label: 'normal_150' },
    { key: 'normal_200', label: 'normal_200' },
    { key: 'normal_210', label: 'normal_210' },
    { key: 'night_30', label: 'night_30' },
    { key: 'sunday_200', label: 'sunday_200' },
    { key: 'sunday_270', label: 'sunday_270' },
    { key: 'holiday_300', label: 'holiday_300' },
    { key: 'holiday_390', label: 'holiday_390' },
    { key: 'total_late_in', label: 'total_late_in' },
    { key: 'total_early_out', label: 'total_early_out' },
    { key: 'total_late_in_early_out', label: 'total_late_in_early_out' },
    { key: 'tong_ngay_nghi', label: 'tong_ngay_nghi' },
    { key: 'paid_leave', label: 'paid_leave' },
    { key: 'nghi_co_phep_khong_luong', label: 'nghi_co_phep_khong_luong' },
    { key: 'phep_thang_nay', label: 'phep_thang_nay' },
    { key: 'ton_phep_thang_nay', label: 'ton_phep_thang_nay' },
    { key: 'so_ngay_di_lam_trong_thang', label: 'so_ngay_di_lam_trong_thang' },
    { key: 'so_ngay_di_lam_thuc_te', label: 'so_ngay_di_lam_thuc_te' },
    { key: 'muon_phep', label: 'muon_phep' },

]

const CloumnIcon = () => {
    return (
        <svg
            className="w-4 h-4 opacity-65"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 6.5H16"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 6.5H2"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 17.5H18"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 17.5H2"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default function Payroll({ permissions, isMobile }) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const today = moment().startOf('day')

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [selectedApplicant, setSelectedApplicant] = useState(null)
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(50)
    const [dateRange, setDateRange] = useState(null)

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [nameTags, setNameTags] = useState([])
    const [cid, setCid] = useState([])
    const [isDrawerVisibleFilter, setIsDrawerVisibleFilter] = useState(false)
    const [actionUsers, setActionUsers] = useState(null)
    const [actionImport, setActionImport] = useState(null)
    const [syn, setSyn] = useState(null)
    const [isModalOpenAddHr, setIsModalOpenAddHr] = useState(false)
    const [table] = useState('hr_payroll')
    const [department, setDepartment] = useState([])

    const handleOnClickAction = () => {
        setActionUsers('actionHrSalary')
    }
    const handleOnClickActionImport = () => {
        setActionImport('hr_payroll')
    }
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const initialVisibleColumns = columnConfig.reduce((acc, { key }) => {
        acc[key] = true
        return acc
    }, {})

    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns)
    const handleColumnVisibilityChange = (key, isVisible) => {
        const updatedColumns = { ...visibleColumns, [key]: isVisible }
        setVisibleColumns(updatedColumns)
        localStorage.setItem('visible_columns_payrolll', JSON.stringify(updatedColumns))
    }
    useEffect(() => {
        const storedColumns = localStorage.getItem('visible_columns_payrolll')
        if (storedColumns) {
            setVisibleColumns(JSON.parse(storedColumns))
        }
    }, [])

    const canCreate = checkActionPermission(
        permissions,
        'salary',
        'create',
    )
    const canEdit = checkActionPermission(
        permissions,
        'salary',
        'edit',
    )
    const canDelete = checkActionPermission(
        permissions,
        'salary',
        'delete',
    )
    const canView = checkActionPermission(
        permissions,
        'salary',
        'view',
    )

    const fetchData = async () => {
        setLoading(true)
        try {
            const cid = "VM31122002"
            const date = dateRange ? dateRange.format('MM/YYYY') : null;
            const response = await GetHrSalary(
                page,
                limit,
                cid,
                date
            )

            if (response.success) {
                setData(response.data.data)
                setTotal(response.data.total)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            setData([])
        } finally {
            setLoading(false)
        }
    };



    useEffect(() => {
        if (!isDrawerVisibleFilter) {
            fetchData()
        }

    }, [page, limit, dateRange])

    const handleTableChange = (pagination) => {
        setPage(pagination.current)
        setLimit(pagination.pageSize)
    }



    const closeDetailModal = () => {
        setIsDetailModalOpen(false)
        setSelectedApplicant(null)
    }

    const handleCheckboxChange = (id) => {
        setSelectedRowKeys((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((key) => key !== id)
                : [...prevSelected, id],
        )
    }

    const handleSelectAll = (e) => {
        const checked = e.target.checked
        if (checked) {
            const allKeys = data.map((item) => item.applicantId)
            setSelectedRowKeys(allKeys)
        } else {
            setSelectedRowKeys([])
        }
    }

    const handleNavigateToDetail = (record) => {
        navigate(`/u/action=7/payroll/detail/${record.id}`)
    }

    const columns = useMemo(() => [
        {
            title: (
                <Checkbox
                    onChange={handleSelectAll}
                    checked={selectedRowKeys.length === data.length}
                />
            ),
            dataIndex: 'checkbox',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.applicantId)}
                    onChange={() => handleCheckboxChange(record.applicantId)}
                />
            ),
        },
        ...columnConfig.map(({ key, label }) => ({
            title: t(`hr_payroll.${label}`),
            dataIndex: key,
            key: key,
            render: (text, record) => {


                if (key === 'synchronize' && visibleColumns[key]) {
                    return <CustomTagSyn status={record.synchronize} />;
                }

                return visibleColumns[key] ? text : null;
            },
            onCell: (record) => ({
                onClick: () => handleNavigateToDetail(record),
            }),
            sorter: (a, b) => {
                const aValue = a[key];
                const bValue = b[key];

                if (key === 'synchronize') {
                    return a[key] === b[key] ? 0 : a[key] ? -1 : 1
                }

            },
        })),
    ], [visibleColumns, selectedRowKeys, t]);

    const renderDetailModal = () => (
        <Modal
            title={selectedApplicant?.full_name}
            visible={isDetailModalOpen}
            onCancel={closeDetailModal}
        ></Modal>
    )

    const renderColumnVisibilityDrawer = () => (
        <Drawer
            title={t('hr_payroll.select_display_column')}
            placement="right"
            closable
            onClose={() => setIsDrawerVisible(false)}
            visible={isDrawerVisible}
        >
            <Row gutter={16}>
                {columnConfig.map(({ key, label }) => (
                    <Col span={24} key={key} className="mt-3">
                        <Checkbox
                            checked={visibleColumns[key]}
                            onChange={(e) =>
                                handleColumnVisibilityChange(key, e.target.checked)
                            }
                        >
                            {t(`hr_payroll.${label}`)}
                        </Checkbox>
                    </Col>
                ))}
            </Row>
        </Drawer>
    )
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    }

    const renderTable = () => (
        <Table
            rowSelection={rowSelection}
            columns={columns.filter((column) => visibleColumns[column.key])}
            dataSource={data}
            size="small"
            bordered
            rowKey="id"
            className="cursor-pointer"
            pagination={{
                current: page,
                pageSize: limit,
                total: total,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: (page, pageSize) =>
                    handleTableChange({ current: page, pageSize }),
            }}
            onChange={(pagination) => handleTableChange(pagination)}
            loading={loading}
        />
    )

    const handleApplyFilter = async () => {
        setIsDrawerVisibleFilter(false)

        await fetchData()
    }

    const handleDateChange = (dates) => {
        if (dates) {
            setDateRange(dates)
        } else {
            setDateRange(null)
        }
    }

    const openModalAddUser = () => {
        setIsModalOpenAddHr(true)
    }

    const closeModalAddHr = () => {
        setIsModalOpenAddHr(false)
    }


    const renderKanban = () => {
        return (
            <div className="pb-20">
                <Row gutter={16}>
                    {data.map((item) => (
                        <Col span={24} key={item?.id} style={{ marginBottom: 16 }}>
                            <Card
                                size="small"
                                title={item?.cid}
                                onClick={() => handleNavigateToDetail(item)}
                                extra={<CustomTagSyn status={item?.synchronize} />}
                            >
                                <p>
                                    <UserOutlined style={{ marginRight: 8 }} />
                                    {item?.name}
                                </p>
                                <p>
                                    {item?.department}
                                </p>
                                <p>
                                    {item?.monthly_salary}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {loading && (
                    <div className="grid  place-content-center">
                        <Spin />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full h-screen flex flex-col bg-white">
            <Helmet>
                <title>ITM - {t('hr_payroll.payroll')}</title>
            </Helmet>

            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {t('hr_payroll.payroll')}
                </h1>

            </div>
            {isMobile ? (<><div className="p-2  flex items-center justify-between">  <div className="flex items-center gap-2">           <FieldActionSalary
                dateRange={dateRange}
                setDateRange={setDateRange}
                handleApplyFilter={handleApplyFilter}
                setIsDrawerVisible={setIsDrawerVisibleFilter}
                isDrawerVisible={isDrawerVisibleFilter}
                nameTags={nameTags}
                setNameTags={setNameTags}
                setCid={setCid}
                cid={cid}
                setSyn={setSyn}
                syn={syn}
                setDepartment={setDepartment}
                department={department}

            /></div>



            </div>   <Pagination
                    simple={{
                        readOnly: true,
                    }}
                    current={page}
                    pageSize={limit}
                    total={total}
                    showSizeChanger
                    onChange={(page, pageSize) =>
                        handleTableChange({ current: page, pageSize })

                    }
                    className="mb-2 mt-2  right-0 flex items-end justify-end"
                /> </>) : (<> <div className="p-2  flex items-center justify-between">
                    <span className="inline-flex overflow-hidden">
                        <div className="flex items-center gap-2">
                            <Select defaultValue="Table" className="w-28" size="large">
                                <Option value="1">{t('Table')}</Option>
                                <Option value="2">{t('Grid')}</Option>
                                <Option value="3">{t('List')}</Option>
                            </Select>
                            <DatePicker size="large" value={dateRange}
                                onChange={handleDateChange} renderExtraFooter={() => 'extra footer'} picker="month" />

                            <FieldActionSalary
                                dateRange={dateRange}
                                setDateRange={setDateRange}
                                handleApplyFilter={handleApplyFilter}
                                setIsDrawerVisible={setIsDrawerVisibleFilter}
                                isDrawerVisible={isDrawerVisibleFilter}
                                nameTags={nameTags}
                                setNameTags={setNameTags}
                                setCid={setCid}
                                cid={cid}
                                setSyn={setSyn}
                                syn={syn}
                                setDepartment={setDepartment}
                                department={department}

                            />

                            <Button
                                size="large"
                                className="bg-white"
                                onClick={() => setIsDrawerVisible(true)}
                            >
                                <CloumnIcon />
                            </Button>
                            {selectedRowKeys != null && selectedRowKeys.length > 0 && canEdit && (
                                <SynActionHrInter
                                    fetchData={fetchData}
                                    selectedRowKeys={selectedRowKeys}
                                />
                            )}
                            {selectedRowKeys != null && selectedRowKeys.length > 0 && (
                                <ShowAction
                                    handleOnClickAction={handleOnClickAction}
                                    actionUsers={actionUsers}
                                    setActionUsers={setActionUsers}
                                    setSelectedRowKeys={setSelectedRowKeys}
                                    selectedRowKeys={selectedRowKeys}
                                    fetchDataUser={fetchData}
                                    canDelete={canDelete}
                                    table={table}
                                />
                            )}
                        </div>
                    </span>

                </div></>)}


            <AddHrInter
                isOpen={isModalOpenAddHr}
                onClose={closeModalAddHr}
                fetchData={fetchData}
            />
            <Layout>
                <Content className="flex-1 overflow-auto bg-white p-2">
                    {isMobile ? (
                        renderKanban()
                    ) : (
                        <div>
                            {renderTable()}
                            {renderDetailModal()}
                            {renderColumnVisibilityDrawer()}
                        </div>
                    )}
                </Content>
            </Layout>

        </div>
    )
}
