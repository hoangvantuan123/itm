import { Form, Table, Radio } from 'antd'
import { useEffect, useState } from 'react'

const OfficeSkillsTable = ({ form, formData }) => {
  // Danh sách kỹ năng
  const initialOfficeSkills = [
    {
      key: 0,
      skill: 'Excel',
      level: formData.officeSkillsData.officeSkills?.[0]?.level || null,
    },
    {
      key: 1,
      skill: 'Word',
      level: formData.officeSkillsData.officeSkills?.[1]?.level || null,
    },
    {
      key: 2,
      skill: 'PowerPoint',
      level: formData.officeSkillsData.officeSkills?.[2]?.level || null,
    },
  ]

  const initialSoftwareSkills = [
    {
      key: 0,
      skill: 'AutoCAD',
      level: formData.officeSkillsData.softwareSkills?.[0]?.level || null,
    },
    {
      key: 1,
      skill: 'SolidWorks',
      level: formData.officeSkillsData.softwareSkills?.[1]?.level || null,
    },
    {
      key: 2,
      skill: 'ERP',
      level: formData.officeSkillsData.softwareSkills?.[2]?.level || null,
    },
    {
      key: 3,
      skill: 'MES',
      level: formData.officeSkillsData.softwareSkills?.[3]?.level || null,
    },
  ]

  const [officeSkills, setOfficeSkills] = useState(initialOfficeSkills)
  const [softwareSkills, setSoftwareSkills] = useState(initialSoftwareSkills)

  useEffect(() => {
    form.setFieldsValue({
      officeSkills: officeSkills,
      softwareSkills: softwareSkills,
    })
  }, [officeSkills, softwareSkills, form])

  const handleSkillsChange = (key, value, isOfficeSkill = true) => {
    const updatedSkills = (isOfficeSkill ? officeSkills : softwareSkills).map(
      (skill) => {
        if (skill.key === key) {
          return { ...skill, level: value }
        }
        return skill
      },
    )

    if (isOfficeSkill) {
      setOfficeSkills(updatedSkills)
      formData.officeSkillsData.officeSkills = updatedSkills
    } else {
      setSoftwareSkills(updatedSkills)
      formData.officeSkillsData.softwareSkills = updatedSkills
    }
  }

  // Hàm render cột Radio
  const renderRadioColumns = (isOfficeSkill = true) => [
    {
      title: 'Đánh giá',
      dataIndex: 'level',
      render: (_, record) => (
        <Radio.Group
          value={record.level}
          onChange={(e) =>
            handleSkillsChange(record.key, e.target.value, isOfficeSkill)
          }
        >
          <Radio value="good">Tốt</Radio>
          <Radio value="average">TB</Radio>
          <Radio value="poor">Kém</Radio>
        </Radio.Group>
      ),
    },
  ]

  const officeSkillsColumns = [
    {
      title: 'Kỹ năng văn phòng',
      dataIndex: 'skill',
      render: (text) => <span>{text}</span>,
    },
    ...renderRadioColumns(true),
  ]

  const softwareSkillsColumns = [
    {
      title: 'Kỹ năng phần mềm',
      dataIndex: 'skill',
      render: (text) => <span>{text}</span>,
    },
    ...renderRadioColumns(false),
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 mt-5">Kỹ năngn</h2>

      {/* Bảng kỹ năng văn phòng */}
      <h3 className="text-base font-semibold mb-4">Kỹ năng văn phòng</h3>
      <Form.Item name="officeSkills">
        <Table
          dataSource={officeSkills}
          columns={officeSkillsColumns}
          pagination={false}
          rowKey="key"
          scroll={{ x: true }}
          bordered
          size="small"
        />
      </Form.Item>

      {/* Bảng kỹ năng phần mềm */}
      <h3 className="text-xl font-semibold mb-4 mt-5">Kỹ năng phần mềm</h3>
      <Form.Item name="softwareSkills">
        <Table
          dataSource={softwareSkills}
          columns={softwareSkillsColumns}
          pagination={false}
          rowKey="key"
          scroll={{ x: true }}
          bordered
          size="small"
        />
      </Form.Item>
    </div>
  )
}

export default OfficeSkillsTable
