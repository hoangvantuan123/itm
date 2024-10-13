import { useEffect, useState, useCallback } from 'react'
import { Form, Table, Input, Drawer, Button, Row, Col, Card, InputNumber } from 'antd';

const WorkExperienceTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setLocalDataSource(dataSource)
    } else {
      setLocalDataSource([
        {
          id: 1,
          tasks: null,
          position: null,
          company_name: null,
          start_date: null,
          end_date: null,
          salary: null,
        },
        {
          id: 2,
          tasks: null,
          position: null,
          company_name: null,
          start_date: null,
          end_date: null,
          salary: null,
        },
      ])
    }
  }, [dataSource])

  useEffect(() => {
    form.setFieldsValue({ experiences: localDataSource })
  }, [localDataSource, form])
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleWorkExperienceChange = useCallback(
    (id, field, value) => {
      setLocalDataSource((prevData) => {
        const updatedData = prevData.map((experience) =>
          experience.id === id ? { ...experience, [field]: value } : experience,
        )

        form.setFieldsValue({ experiences: updatedData })

        return updatedData
      })
    },
    [form],
  )
  const handleCardClick = (type, record) => {
    setDrawerContent({ type, record });
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setDrawerContent(null);
  };

  const handleFieldChange = (field, value) => {
    setDrawerContent((prevContent) => ({
      ...prevContent,
      record: {
        ...prevContent.record,
        [field]: value,
      },
    }));
  };

  const handleDrawerSave = () => {
    setLocalDataSource((prevData) =>
      prevData.map((member) =>
        member.id === drawerContent.record.id ? drawerContent.record : member
      )
    );
    handleDrawerClose();
  };

  const experienceColumns = [
    {
      title: 'Công ty',
      dataIndex: 'company_name',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(
              record.id,
              'company_name',
              e.target.value,
            )
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'position', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Năm bắt đầu',
      dataIndex: 'start_date',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'start_date', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'end_date',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'end_date', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Công việc',
      dataIndex: 'tasks',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'tasks', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'salary', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ]
  const renderKanban = () => (
    <Row gutter={16}>
      {localDataSource.map((user) => (
        <Col span={24} key={user.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('experiences', user)}>
            <p><strong>Công ty:</strong> {user.company_name}</p>
            <p><strong>Chức vụ:</strong> {user.position}</p>
            <p><strong>Mức lương:</strong> {user.salary}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <>
        {isMobile ? (
          <Form.Item name="experiences">{renderKanban()}</Form.Item>
        ) : (
          <Form.Item name="experiences">
            <Table
              dataSource={localDataSource}
              columns={experienceColumns}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ x: true }}
              bordered
              style={{ margin: '0 auto' }}
              rowClassName="custom-row"
              size="small"
            />
          </Form.Item>
        )}

        <Drawer
          title=""
          placement="bottom"
          onClose={handleDrawerClose}
          visible={drawerVisible}
          height="80%"
          closable={false}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleDrawerClose} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button   className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
              Lưu
            </Button>
          </div>
        }
        >
          <div className="mb-4">
            <label>Công ty</label>
            <Input
              size="large"
              value={drawerContent?.record?.company_name || ''}
              onChange={(e) => handleFieldChange('company_name', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Chức vụ</label>
            <Input
              size="large"
              value={drawerContent?.record?.position}
              onChange={(e) => handleFieldChange('position', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Năm bắt đầu</label>
            <Input
              size="large"
              value={drawerContent?.record?.start_date}
              onChange={(e) => handleFieldChange('start_date', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label>Năm kết thúc</label>
            <Input
              size="large"
              value={drawerContent?.record?.end_date || ''}
              onChange={(e) => handleFieldChange('end_date', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Công việc</label>
            <Input
              size="large"
              value={drawerContent?.record?.tasks || ''}
              onChange={(e) => handleFieldChange('tasks', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Mức lương</label>
            <Input
              size="large"
              value={drawerContent?.record?.salary || ''}
              onChange={(e) => handleFieldChange('salary', e.target.value)}
            />
          </div>
        </Drawer>
      </>

    </>
  )
}

export default WorkExperienceTable
