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
import { checkActionPermission } from '../../permissions'
import moment from 'moment-timezone'
import { GetFilterKeyImport } from '../../features/keyImport/getFilterkeyImport'
import { MailOutlined, PhoneOutlined, UserOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import FieldActionDefaultMapping from '../components/action/fieldActionDefaultMapping'
import AddDefaultMapping from '../components/add/addDefaultMapping'
import ImportAction from '../components/action/importAction'
import ShowAction from '../components/action/showAction'
import { PlusOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
const { Content } = Layout
const { Option } = Select

const columnConfig = [
    { key: 'original_name', label: 'original_name' },
    { key: 'mapped_name', label: 'mapped_name' },


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

export default function KeyImport({ permissions, isMobile }) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const today = moment().startOf('day')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [selectedApplicant, setSelectedApplicant] = useState(null)
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(100)
    const [dateRange, setDateRange] = useState(null)

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [nameTags, setNameTags] = useState([])
    const [cid, setCid] = useState([])
    const [isDrawerVisibleFilter, setIsDrawerVisibleFilter] = useState(false)
    const [actionUsers, setActionUsers] = useState(null)
    const [actionImport, setActionImport] = useState(null)
    const [syn, setSyn] = useState(null)
    const [isModalOpenAddHr, setIsModalOpenAddHr] = useState(false)
    const [department, setDepartment] = useState([])
    const [table] = useState('default_mappings')
    const handleOnClickAction = () => {
        setActionUsers('actionDefaultMappings')
    }
    const handleOnClickActionImport = () => {
        setActionImport('default_mappings')
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
        localStorage.setItem('visibleColumns3', JSON.stringify(updatedColumns))
    }
    useEffect(() => {
        const storedColumns = localStorage.getItem('visibleColumns3')
        if (storedColumns) {
            setVisibleColumns(JSON.parse(storedColumns))
        }
    }, [])

    const canCreate = checkActionPermission(
        permissions,
        'setting-2-1-3',
        'create',
    )
    const canEdit = checkActionPermission(
        permissions,
        'setting-2-1-3',
        'edit',
    )
    const canDelete = checkActionPermission(
        permissions,
        'setting-2-1-3',
        'delete',
    )
    const canView = checkActionPermission(
        permissions,
        'setting-2-1-3',
        'view',
    )




    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await GetFilterKeyImport(
                page,
                limit,
                nameTags
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
        fetchData();
    }, [page, limit, dateRange, nameTags, cid, department]);



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
            title: t(`key_import.${label}`),
            dataIndex: key,
            key: key,
            render: (text, record) => {

                return visibleColumns[key] ? text : null;
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
                            {t(`key_import.${label}`)}
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
                showTotal: (total) => `${t('column_table.total')} ${total} ${t('column_table.item')}`,
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


    const handleDateChange = async (dates) => {
        setDateRange(dates);
    };

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
                                title={<>{item?.empid} -  {item?.date}</>}
                            >
                                <p>
                                    <UserOutlined style={{ marginRight: 8 }} />
                                    {item?.empname}
                                </p>
                                <p>
                                    {item?.department_name}
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
                <title>ITM - {t('key_import.recruitment')}</title>
            </Helmet>

            <div className="p-2 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {t('key_import.data')}
                </h1>

            </div>


            {isMobile ? (<>





                <div className="p-2  flex items-end justify-end">

                    <Pagination
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
                    />



                </div>

            </>) : (<> <div className="p-2  flex items-center justify-between">
                <span className="inline-flex overflow-hidden">
                    <div className="flex items-center gap-2">

                        {canCreate && <Button
                            type="primary"
                            onClick={openModalAddUser}
                            icon={<PlusOutlined />}
                            className=" rounded-lg h-full border-gray-200 bg-indigo-600 hover:bg-none text-white shadow-sm text-sm"
                            size="large"
                        >
                            {t('page.add')}
                        </Button>}
                        {canCreate && (
                            <ImportAction
                                fetchData={fetchData}
                                handleOnClickActionImport={handleOnClickActionImport}
                                setActionImport={setActionImport}
                                actionImport={actionImport}
                                isMobile={isMobile}
                            />
                        )}
                        <FieldActionDefaultMapping
                            handleApplyFilter={handleApplyFilter}
                            setIsDrawerVisible={setIsDrawerVisibleFilter}
                            isDrawerVisible={isDrawerVisibleFilter}
                            nameTags={nameTags}
                            setNameTags={setNameTags}

                        />
                        <Button
                            size="large"
                            className="bg-white"
                            onClick={() => setIsDrawerVisible(true)}
                        >
                            <CloumnIcon />
                        </Button>
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

            <AddDefaultMapping
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
