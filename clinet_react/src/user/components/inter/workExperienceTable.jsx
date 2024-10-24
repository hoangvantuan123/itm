import { useEffect, useState, useCallback } from 'react'
import { Form, Table, Input, Drawer, Button, Row, Col, Card, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next'
const WorkExperienceTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const { t } = useTranslation()
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
      title: t('hr_recruitment_1_1.company_name'),
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
      title: t('hr_recruitment_1_1.position'),
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
      title:  t('hr_recruitment_1_1.start_date'),
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
      title: t('hr_recruitment_1_1.end_date'),
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
      title: t('hr_recruitment_1_1.tasks'),
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
      title: t('hr_recruitment_1_1.salary'),
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
            <p><strong>{t('hr_recruitment_1_1.company_name')}:</strong> {user.company_name}</p>
            <p><strong>{t('hr_recruitment_1_1.position')}:</strong> {user.position}</p>
            <p><strong>{t('hr_recruitment_1_1.salary')}:</strong> {user.salary}</p>
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
            {t('hr_recruitment_1_1.exit')}
            </Button>
            <Button   className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
            {t('hr_recruitment_1_1.save')}
            </Button>
          </div>
        }
        >
          <div className="mb-4">
            <label>{t('hr_recruitment_1_1.company_name')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.company_name || ''}
              onChange={(e) => handleFieldChange('company_name', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{t('hr_recruitment_1_1.position')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.position}
              onChange={(e) => handleFieldChange('position', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{t('experience_columns.start_date')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.start_date}
              onChange={(e) => handleFieldChange('start_date', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label>{t('experience_columns.end_date')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.end_date || ''}
              onChange={(e) => handleFieldChange('end_date', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{t('experience_columns.tasks')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.tasks || ''}
              onChange={(e) => handleFieldChange('tasks', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{t('experience_columns.salary')}</label>
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
