import { useState, useEffect, useCallback } from 'react';
import { Form, Table, Input, Drawer, Button, Row, Col, Card, InputNumber } from 'antd';

const EducationLanguageTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

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
            <p><strong>Trình độ:</strong> {user.highest_education_level}</p>
            <p><strong>Trường:</strong> {user.school}</p>
            <p><strong>Chuyên ngành:</strong> {user.major}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const educationColumns = [
    {
      title: 'Trình độ',
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
      title: 'Trường',
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
      title: 'Chuyên ngành',
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
      title: 'Năm học',
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
      title: 'Năm bắt đầu',
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
      title: 'Năm tốt nghiệp',
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
      title: 'Xếp loại',
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
              Hủy
            </Button>
            <Button   className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
              Lưu
            </Button>
          </div>
        }
      >
        <>
          <div className="mb-4">
            <label>Trình độ</label>
            <Input
              size="large"
              value={drawerContent?.record?.highest_education_level}
              onChange={(e) =>
                handleFieldChange('highest_education_level', e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label>Trường học</label>
            <Input
              size="large"
              value={drawerContent?.record?.school}
              onChange={(e) => handleFieldChange('school', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Chuyên nghành</label>
            <Input
              size="large"
              value={drawerContent?.record?.major}
              onChange={(e) => handleFieldChange('major', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Năm học</label>
            <Input
              size="large"  className="w-full"
              value={drawerContent?.record?.school_year }
              onChange={(e) => handleFieldChange('school_year', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Năm bắt đầu</label>
            <Input
              size="large"
              value={drawerContent?.record?.year_ended }
              onChange={(e) => handleFieldChange('year_ended', e.target.value)}
               className="w-full"
            />
          </div>
          <div className="mb-4">
            <label>Năm tốt nghiệp</label>
            <Input
              size="large"  className="w-full"
              value={drawerContent?.record?.year_of_graduation}
              onChange={(e) =>
                handleFieldChange('year_of_graduation', e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label>Xếp loại</label>
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
