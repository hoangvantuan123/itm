import { useState, useEffect, useCallback } from 'react';
import { Form, Table, Input, Drawer, Button, Row, Col, Card, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
const EducationLanguageTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const { t } = useTranslation();
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

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setLocalDataSource(dataSource);
    } else {
      setLocalDataSource([
        {
          id: 1,
          highest_education_level: null,
          school: null,
          major: null,
          school_year: null,
          year_ended: null,
          year_of_graduation: null,
          classification: null,
        }
      ]);
    }
  }, [dataSource]);

  useEffect(() => {
    form.setFieldsValue({ educations: localDataSource });
  }, [localDataSource, form]);

  const handleEducationChange = useCallback((id, field, value) => {
    setLocalDataSource(prevData =>
      prevData.map(education =>
        education.id === id ? { ...education, [field]: value } : education
      )
    );
  }, []);

  const handleCardClick = (type, record) => {
    setDrawerContent({ type, record });
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setDrawerContent(null);
  };

  const handleFieldChange = (field, value) => {
    setDrawerContent(prevContent => ({
      ...prevContent,
      record: {
        ...prevContent.record,
        [field]: value,
      },
    }));
  };

  const handleDrawerSave = () => {
    setLocalDataSource(prevData =>
      prevData.map(member =>
        member.id === drawerContent.record.id ? drawerContent.record : member
      )
    );
    handleDrawerClose();
  };

  const renderKanban = () => (
    <Row gutter={16}>
      {localDataSource.map(user => (
        <Col span={24} key={user.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('family', user)}>
            <p><strong>{ t('education_columns.highest_education_level')}:</strong> {user.highest_education_level}</p>
            <p><strong>{ t('education_columns.school')}:</strong> {user.school}</p>
            <p><strong>{ t('education_columns.major')}:</strong> {user.major}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const educationColumns = [
    {
      title:  t('education_columns.highest_education_level'),
      dataIndex: 'highest_education_level',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.id, 'highest_education_level', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:  t('education_columns.school'),
      dataIndex: 'school',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEducationChange(record.id, 'school', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:   t('education_columns.major'),
      dataIndex: 'major',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEducationChange(record.id, 'major', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:   t('education_columns.school_year'),
      dataIndex: 'school_year',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEducationChange(record.id, 'school_year', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:   t('education_columns.year_ended'),
      dataIndex: 'year_ended',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEducationChange(record.id, 'year_ended', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:   t('education_columns.year_of_graduation'),
      dataIndex: 'year_of_graduation',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.id, 'year_of_graduation', e.target.value )
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:  t('education_columns.classification'),
      dataIndex: 'classification',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.id, 'classification', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ];

  return (
    <>
      {isMobile ? (
        <Form.Item name="educations">{renderKanban()}</Form.Item>
      ) : (
        <Form.Item name="educations">
          <Table
            dataSource={localDataSource}
            columns={educationColumns}
            pagination={false}
            rowKey={(record) => record.id}
            bordered
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
            {  t('hr_recruitment_1_1.exit')}
            </Button>
            <Button   className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
            {  t('hr_recruitment_1_1.save')}
            </Button>
          </div>
        }
      >
        <>
          <div className="mb-4">
            <label>{  t('education_columns.highest_education_level')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.highest_education_level}
              onChange={(e) =>
                handleFieldChange('highest_education_level', e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.school')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.school}
              onChange={(e) => handleFieldChange('school', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.major')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.major}
              onChange={(e) => handleFieldChange('major', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.school_year')}</label>
            <Input
              size="large"  className="w-full"
              value={drawerContent?.record?.school_year }
              onChange={(e) => handleFieldChange('school_year', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.year_ended')}</label>
            <Input
              size="large"
              value={drawerContent?.record?.year_ended }
              onChange={(e) => handleFieldChange('year_ended', e.target.value)}
               className="w-full"
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.year_of_graduation')}</label>
            <Input
              size="large"  className="w-full"
              value={drawerContent?.record?.year_of_graduation}
              onChange={(e) =>
                handleFieldChange('year_of_graduation', e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label>{  t('education_columns.classification')}</label>
            <Input 
              size="large"
              value={drawerContent?.record?.classification}
              onChange={(e) =>
                handleFieldChange('classification', e.target.value)
              }
            />
          </div>
        </>
      </Drawer>
    </>
  );
};

export default EducationLanguageTable;
