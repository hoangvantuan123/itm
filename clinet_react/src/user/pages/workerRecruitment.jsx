import { useState, useEffect } from 'react'
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
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { PlusOutlined } from '@ant-design/icons'
import AddUserGroups from '../components/add/addUserGroups'
import { checkActionPermission } from '../../permissions'
import { GetHrInfoPageLimit } from '../../features/hrRecruitment/getHrInfoPageLimit'
import ImportAction from '../components/action/importAction'
import moment from 'moment'
import Search from '../components/search'
import FieldActionWorkerRecruitment from '../components/action/fieldActionWorkerRecruitment'
import { GetFilterHrInfoPageLimit } from '../../features/hrRecruitment/getFilterHrInfoPageLimit'
import ShowAction from '../components/action/showAction'
import CustomTag from '../components/candidateForm/customTag'
const { RangePicker } = DatePicker
const { Content } = Layout
const { Option } = Select

const columnConfig = [
  { key: 'full_name', label: 'Họ và tên' },
  { key: 'gender', label: 'Giới tính' },
  { key: 'birth_date', label: 'Ngày sinh' },
  { key: 'id_number', label: 'CCCD' },
  { key: 'phone_number', label: 'Số điện thoại' },
  { key: 'email', label: 'Email' },
  { key: 'create_date', label: 'Thời gian tạo' },
  { key: 'interview_result', label: 'Kết quả' },
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
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6.5H2"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 17.5H18"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 17.5H2"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default function WorkerRecruitmentPage({ permissions }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const today = moment()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(150)
  const [dateRange, setDateRange] = useState([today, today])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [nameTags, setNameTags] = useState([])
  const [phoneNumberTags, setPhoneNumberTags] = useState([])
  const [citizenshipIdTags, setCitizenshipIdTags] = useState([])
  const [isDrawerVisibleFilter, setIsDrawerVisibleFilter] = useState(false)
  const [actionUsers, setActionUsers] = useState(null)
  const [actionImport, setActionImport] = useState(null)
  const handleOnClickAction = () => {
    setActionUsers('actionHrInfoIds')
  }
  const handleOnClickActionImport = () => {
    setActionImport('hr_personnel')
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const initialVisibleColumns = columnConfig.reduce((acc, { key }) => {
    acc[key] = true
    return acc
  }, {})

  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns)

  const canCreate = checkActionPermission(
    permissions,
    'hr-recruitment-1-2',
    'create',
  )
  const canEdit = checkActionPermission(
    permissions,
    'hr-recruitment-1-2',
    'edit',
  )
  const canDelete = checkActionPermission(
    permissions,
    'hr-recruitment-1-2',
    'delete',
  )
  const canView = checkActionPermission(
    permissions,
    'hr-recruitment-1-2',
    'view',
  )

  const fetchData = async () => {
    setLoading(true)
    try {
      const [startDate, endDate] = dateRange.map((date) =>
        date ? date.format('YYYY-MM-DD') : null,
      )
      const response = await GetHrInfoPageLimit(page, limit, startDate, endDate)

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
  }
  const fetchDataFilter = async () => {
    setLoading(true)
    try {
      const [startDate, endDate] = dateRange.map((date) =>
        date ? date.format('YYYY-MM-DD') : null,
      )
      const response = await GetFilterHrInfoPageLimit(
        page,
        limit,
        startDate,
        endDate,
        nameTags,
        phoneNumberTags,
        citizenshipIdTags,
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
  }

  useEffect(() => {
    if (isDrawerVisibleFilter === false) {
      fetchData()
    }
  }, [page, limit, dateRange])

  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }

  const showDetailModal = (applicant) => {
    setSelectedApplicant(applicant)
    setIsDetailModalOpen(true)
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

  const handleNavigateToDetail = (id) => {
    navigate(`/u/action=18/worker-recruitment-data/detail/${id}`)
  }

  const columns = [
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
      title: t(label),
      dataIndex: key,
      key: key,
      render: (text, record) => {
        if (key === 'interview_result') {
          const result =
            record.interviews.length > 0
              ? record.interviews[0].interview_result
              : null
          return visibleColumns[key] ? <CustomTag status={result} /> : null
        }
        if (key === 'create_date') {
          return visibleColumns[key]
            ? moment(record.create_date).format('lll')
            : null
        }
        return visibleColumns[key] ? text : null
      },
      onCell: (record) => ({
        onClick: () => {
          showDetailModal(record)
          handleNavigateToDetail(record.id)
        },
      }),
      sorter: (a, b) => {
        const aValue = a[key]
        const bValue = b[key]
        if (key === 'create_date') {
          return moment(aValue).isBefore(moment(bValue)) ? -1 : 1
        } else if (key === 'tax_number' || key === 'phone_number') {
          return (Number(aValue) || 0) - (Number(bValue) || 0)
        } else {
          return (aValue || '').localeCompare(bValue || '')
        }
      },
    })),
  ]

  const renderDetailModal = () => (
    <Modal
      title={selectedApplicant?.full_name}
      visible={isDetailModalOpen}
      onCancel={closeDetailModal}
    ></Modal>
  )

  const renderColumnVisibilityDrawer = () => (
    <Drawer
      title={t('Chọn cột hiển thị')}
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
                setVisibleColumns({
                  ...visibleColumns,
                  [key]: e.target.checked,
                })
              }
            >
              {t(label)}
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
      loading={loading}
      /* scroll={{
      x: 'calc(100px + 100%)',
      y: 650,
    }} */
    />
  )

  const handleApplyFilter = async () => {
    setIsDrawerVisibleFilter(false)

    await fetchDataFilter()
  }
  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <Helmet>
        <title>ITM - {t('Phỏng vấn')}</title>
      </Helmet>

      <div className="p-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          {t('Danh sách dữ liệu')}
        </h1>
      </div>

      <div className="p-2 mb flex items-center justify-between">
        <span className="inline-flex overflow-hidden">
          <div className="flex items-center gap-2">
            <Select defaultValue="Table" className="w-28" size="large">
              <Option value="1">{t('Table')}</Option>
              <Option value="2">{t('Grid')}</Option>
              <Option value="3">{t('List')}</Option>
            </Select>
            {canCreate && (
              <ImportAction
                fetchData={fetchData}
                handleOnClickActionImport={handleOnClickActionImport}
                setActionImport={setActionImport}
                actionImport={actionImport}
              />
            )}
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              format="YYYY-MM-DD"
              className="cursor-pointer"
              size="large"
            />
            <FieldActionWorkerRecruitment
              dateRange={dateRange}
              setDateRange={setDateRange}
              handleApplyFilter={handleApplyFilter}
              setIsDrawerVisible={setIsDrawerVisibleFilter}
              isDrawerVisible={isDrawerVisibleFilter}
              nameTags={nameTags}
              setNameTags={setNameTags}
              phoneNumberTags={phoneNumberTags}
              setPhoneNumberTags={setPhoneNumberTags}
              citizenshipIdTags={citizenshipIdTags}
              setCitizenshipIdTags={setCitizenshipIdTags}
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
              />
            )}
          </div>
        </span>
      </div>

      <Layout className="flex-1 overflow-auto bg-white p-2">
        {renderTable()}
        {renderDetailModal()}
        {renderColumnVisibilityDrawer()}
      </Layout>
    </div>
  )
}
