import { useState, useEffect } from 'react'
import {
  Form,
  Table,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Drawer,
  Card,
  Col,
  Row,
} from 'antd'

const FamilyInfoTable = ({ isMobile, familyMembers, setFamilyMembers }) => {
  const [visible, setVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [newMember, setNewMember] = useState({
    relationship: 'Anh/Em/Con',
    name_family: '',
    birthYear: '',
    workplace: '',
    job: '',
    phoneNumber: '',
    livingTogether: false,
  })

  const showDrawer = (member = null) => {
    setSelectedMember(member)
    if (member) {
      setNewMember(member) // Thiết lập thông tin thành viên đang chỉnh sửa
    } else {
      setNewMember({
        relationship: 'Anh/Em/Con',
        name_family: '',
        birthYear: '',
        workplace: '',
        job: '',
        phoneNumber: '',
        livingTogether: false,
      })
    }
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewMember((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddOrUpdateMember = () => {
    if (selectedMember) {
      // Cập nhật thông tin thành viên đã chọn
      setFamilyMembers((prev) =>
        prev.map((member) =>
          member.key === selectedMember.key ? { ...newMember } : member,
        ),
      )
    } else {
      // Thêm thông tin thành viên mới
      setFamilyMembers((prev) => [...prev, { key: prev.length, ...newMember }])
    }
    setNewMember({
      relationship: 'Anh/Em/Con',
      name_family: '',
      birthYear: '',
      workplace: '',
      job: '',
      phoneNumber: '',
      livingTogether: false,
    })
    onClose()
  }

  const renderCard = (member) => (
    <Card
      key={member.key}
      title={member.relationship}
      style={{ marginBottom: '16px' }}
      onClick={() => showDrawer(member)}
    >
      <p>
        <strong>Họ tên:</strong> {member.name_family}
      </p>
      <p>
        <strong>Năm sinh:</strong> {member.birthYear}
      </p>
      <p>
        <strong>Nơi làm việc:</strong> {member.workplace}
      </p>
      <p>
        <strong>Công việc:</strong> {member.job}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {member.phoneNumber}
      </p>
      <p>
        <strong>Sống chung:</strong>{' '}
        <Checkbox checked={member.livingTogether} disabled>
          {' '}
          Đang sống chung{' '}
        </Checkbox>
      </p>
    </Card>
  )

  const columns = [
    {
      title: 'Quan hệ',
      dataIndex: 'relationship',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name_family',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Năm sinh',
      dataIndex: 'birthYear',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Nơi làm việc',
      dataIndex: 'workplace',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Công việc',
      dataIndex: 'job',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Sống chung',
      dataIndex: 'livingTogether',
      render: (text) => <Checkbox checked={text} disabled />,
    },
  ]

  // Hàm xử lý sự kiện click vào hàng trong bảng
  const handleRowClick = (record) => {
    showDrawer(record)
  }

  return (
    <>
      <h2 className="text-base font-semibold mb-4">Thông tin gia đình</h2>

      {/* Render Table cho Desktop */}
      {!isMobile && (
        <Table
          dataSource={familyMembers}
          columns={columns}
          pagination={false}
          rowKey="key"
          bordered
          scroll={{ x: true }}
          style={{ margin: '0 auto' }}
          rowClassName="custom-row"
          size="small"
          onRow={(record) => ({
            onClick: () => handleRowClick(record), // Bấm vào hàng để mở Drawer
          })}
        />
      )}

      {/* Render Cards cho Mobile */}
      {isMobile && <div>{familyMembers.map(renderCard)}</div>}

      <Button
        onClick={() => showDrawer()}
        type="dashed"
        size="large"
        disabled={
          familyMembers.filter((member) => member.relationship === 'Anh/Em/Con')
            .length >= 3
        }
        style={{ marginTop: '16px' }}
        className="w-full"
      >
        Thêm hàng
      </Button>

      <Drawer
        title={null}
        height={750}
        onClose={onClose}
        visible={visible}
        placement="bottom"
        closable={false}
        footer={
          <div className="flex items-center justify-between">
            <Button key="cancel" onClick={onClose} size="large">
              Thoát
            </Button>
            <Button
              key="submit"
              type="primary"
              size="large"
              className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
              onClick={handleAddOrUpdateMember}
            >
              {selectedMember ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Họ tên">
            <Input
              name="name_family"
              size="large"
              value={newMember.name_family}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Năm sinh">
            <InputNumber
              name="birthYear"
              size="large"
              inputMode="numeric"
              className="w-full"
              value={newMember.birthYear}
              onChange={(value) =>
                setNewMember((prev) => ({ ...prev, birthYear: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Nơi làm việc">
            <Input
              size="large"
              name="workplace"
              value={newMember.workplace}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Công việc">
            <Input
              size="large"
              name="job"
              value={newMember.job}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              size="large"
              name="phoneNumber"
              value={newMember.phoneNumber}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Sống chung" className=" flex items-center gap-3">
            <Checkbox
              name="livingTogether"
              checked={newMember.livingTogether}
              onChange={handleInputChange}
            >
              Đang sống chung
            </Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default FamilyInfoTable
