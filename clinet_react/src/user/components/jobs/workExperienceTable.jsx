import { useState } from 'react'
import {
  Table,
  Input,
  Button,
  DatePicker,
  Card,
  Drawer,
  Row,
  Col,
  Form,
  InputNumber,
} from 'antd'
import moment from 'moment'

const WorkExperienceTable = ({
  isMobile,
  setWorkExperiences,
  workExperiences,
  setProjects,
  projects,
  initialWorkExperience,
  initialProject,
}) => {
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProjectMode, setIsProjectMode] = useState(false)

  const addWorkExperience = () => {
    setCurrentItem(initialWorkExperience)
    setIsEditMode(false)
    setIsProjectMode(false)
    setVisible(true)
  }

  const addProject = () => {
    setCurrentItem(initialProject)
    setIsEditMode(false)
    setIsProjectMode(true)
    setVisible(true)
  }

  const removeWorkExperience = (key) => {
    const updatedWorkExperiences = workExperiences.filter(
      (experience) => experience.key !== key,
    )
    setWorkExperiences(updatedWorkExperiences)
  }

  const removeProject = (key) => {
    const updatedProjects = projects.filter((project) => project.key !== key)
    setProjects(updatedProjects)
  }

  const showDrawer = (item, isProject = false) => {
    setCurrentItem(item)
    setIsEditMode(true)
    setIsProjectMode(isProject)
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
    setCurrentItem(null)
  }

  const saveItem = () => {
    if (isEditMode) {
      // Update item
      if (currentItem) {
        if (isProjectMode) {
          const updatedProjects = projects.map((project) =>
            project.key === currentItem.key ? currentItem : project,
          )
          setProjects(updatedProjects)
        } else {
          const updatedWorkExperiences = workExperiences.map((experience) =>
            experience.key === currentItem.key ? currentItem : experience,
          )
          setWorkExperiences(updatedWorkExperiences)
        }
      }
    } else {
      // Add new item
      const newItem = { ...currentItem, key: Date.now() }
      if (isProjectMode) {
        setProjects([...projects, newItem])
      } else {
        setWorkExperiences([...workExperiences, newItem])
      }
    }
    onClose()
  }

  return (
    <>
      <h3 className="text-base font-semibold mb-4">Kinh nghiệm làm việc</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {workExperiences.map((experience) => (
          <Card
            key={experience.key}
            size="small"
            title={experience.companyName || 'Công ty chưa có tên'}
            style={{ width: isMobile ? '100%' : '100%' }}
            onClick={() => showDrawer(experience)}
            extra={[
              <Button
                type="link"
                onClick={() => removeWorkExperience(experience.key)}
              >
                Xóa
              </Button>,
            ]}
          >
            <p>
              <strong>Chức vụ:</strong> {experience.position || 'N/A'}
            </p>
            <p>
              <strong>Năm vào:</strong>{' '}
              {experience.joinYear
                ? moment(experience.joinYear).format('YYYY')
                : 'N/A'}
            </p>
            <p>
              <strong>Năm thôi việc:</strong>{' '}
              {experience.leaveYear
                ? moment(experience.leaveYear).format('YYYY')
                : 'N/A'}
            </p>
          </Card>
        ))}
      </div>
      <Button type="dashed" onClick={addWorkExperience} className="mt-5 mb-5">
        Thêm công ty
      </Button>

      <h3 className="text-base font-semibold mb-4">Dự án</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {projects.map((project) => (
          <Card
            size="small"
            onClick={() => showDrawer(project, true)}
            key={project.key}
            title={project.projectName || 'Dự án chưa có tên'}
            style={{ width: isMobile ? '100%' : '100%' }}
            extra={[
              <Button type="link" onClick={() => removeProject(project.key)}>
                Xóa
              </Button>,
            ]}
          >
            <p>
              <strong>Ngày bắt đầu:</strong>{' '}
              {project.startDate
                ? moment(project.startDate).format('YYYY-MM-DD')
                : 'N/A'}
            </p>
            <p>
              <strong>Ngày kết thúc:</strong>{' '}
              {project.endDate
                ? moment(project.endDate).format('YYYY-MM-DD')
                : 'N/A'}
            </p>
          </Card>
        ))}
      </div>
      <Button type="dashed" onClick={addProject} className="mt-5 mb-5">
        Thêm dự án
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
              onClick={saveItem}
            >
              Lưu
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          {isProjectMode ? (
            <>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Tên dự án">
                    <Input
                      size="large"
                      placeholder="Tên dự án"
                      value={currentItem?.projectName}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          projectName: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Ngày bắt đầu">
                    <DatePicker
                      size="large"
                      className="w-full"
                      placeholder="Ngày bắt đầu"
                      value={
                        currentItem?.startDate
                          ? moment(currentItem.startDate)
                          : null
                      }
                      onChange={(date) =>
                        setCurrentItem({ ...currentItem, startDate: date })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Item label="Ngày kết thúc">
                    <DatePicker
                      size="large"
                      className="w-full"
                      placeholder="Ngày kết thúc"
                      value={
                        currentItem?.endDate
                          ? moment(currentItem.endDate)
                          : null
                      }
                      onChange={(date) =>
                        setCurrentItem({ ...currentItem, endDate: date })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Công việc phụ trách">
                    <Input
                      size="large"
                      placeholder="Công việc phụ trách"
                      value={currentItem?.task}
                      onChange={(e) =>
                        setCurrentItem({ ...currentItem, task: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Số năm">
                    <Input
                      size="large"
                      placeholder="Số năm"
                      value={currentItem?.duration}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          duration: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Khái quát dự án">
                    <Input.TextArea
                      size="large"
                      placeholder="Khái quát dự án"
                      value={currentItem?.summary}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          summary: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Tên công ty">
                    <Input
                      size="large"
                      value={currentItem?.companyName}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Chức vụ">
                    <Input
                      size="large"
                      value={currentItem?.position}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          position: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Quy mô LĐ">
                    <Input
                      size="large"
                      value={currentItem?.employeeScale}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          employeeScale: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Năm vào công ty">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1900}
                      max={new Date().getFullYear()}
                      value={currentItem?.joinYear || null}
                      onChange={(value) =>
                        setCurrentItem({ ...currentItem, joinYear: value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Item label="Năm thôi việc">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={currentItem?.joinYear || 1900} // Giới hạn năm thôi việc phải lớn hơn hoặc bằng năm vào công ty, hoặc 1900 nếu `joinYear` không có giá trị
                      max={new Date().getFullYear()} // Giới hạn năm tối đa là năm hiện tại
                      value={currentItem?.leaveYear || null} // Nếu `leaveYear` không có giá trị, đặt là `null`
                      onChange={(value) =>
                        setCurrentItem({ ...currentItem, leaveYear: value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Công việc phụ trách">
                    <Input.TextArea
                      size="large"
                      value={currentItem?.tasks}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          tasks: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Mức lương">
                    <Input
                      size="large"
                      value={currentItem?.salary}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          salary: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Lý do xin nghỉ">
                    <Input.TextArea
                      size="large"
                      value={currentItem?.reasonForLeaving}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          reasonForLeaving: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}

export default WorkExperienceTable
