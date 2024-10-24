import { useState, useEffect, useCallback } from 'react';
import { Form, Table, Input, Drawer, Button, Row, Col, Card, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
const LanguageTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setLocalDataSource(dataSource);
    } else {
      setLocalDataSource([
        { id: 1, language: null, certificate_type: null, score: null, level: null },
        { id: 2, language: null, certificate_type: null, score: null, level: null },
        { id: 3, language: null, certificate_type: null, score: null, level: null },
      ]);
    }
  }, [dataSource]);

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
    form.setFieldsValue({ languages: localDataSource });
  }, [localDataSource, form]);

  const handleLanguageChange = useCallback((id, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((language) =>
        language.id === id ? { ...language, [field]: value } : language,
      ),
    );
  }, []);

  const languageColumns = [
    {
      title: t('language_columns.language'),
      dataIndex: 'language',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleLanguageChange(record.id, 'language', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('language_columns.certificate_type'),
      dataIndex: 'certificate_type',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleLanguageChange(record.id, 'certificate_type', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('language_columns.score'),
      dataIndex: 'score',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleLanguageChange(record.id, 'score', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('language_columns.level'),
      dataIndex: 'level',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleLanguageChange(record.id, 'level', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ];

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

  const renderKanban = () => (
    <Row gutter={16}>
      {localDataSource.map((user) => (
        <Col span={24} key={user.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('languages', user)}>
            <p><strong>{ t('language_columns.language')}:</strong> {user.language}</p>
            <p><strong>{ t('language_columns.certificate_type')}:</strong> {user.certificate_type}</p>
            <p><strong>{ t('language_columns.score')}:</strong> {user.score}</p>
            <p><strong>{ t('language_columns.level')}:</strong> {user.level}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      {isMobile ? (
        <Form.Item name="languages">{renderKanban()}</Form.Item>
      ) : (
        <Form.Item name="languages">
          <Table
            dataSource={localDataSource}
            columns={languageColumns}
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
              { t('hr_recruitment_1_1.exit')}
            </Button>
            <Button   className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
            { t('hr_recruitment_1_1.save')}
            </Button>
          </div>
        }
      >
        <div className="mb-4">
          <label> { t('language_columns.language')}</label>
          <Input
            size="large"
            value={drawerContent?.record?.language || ''}
            onChange={(e) => handleFieldChange('language', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label> { t('language_columns.certificate_type')}</label>
          <Input
            size="large"
            value={drawerContent?.record?.certificate_type}
            onChange={(e) => handleFieldChange('certificate_type', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label> { t('language_columns.score')}</label>
          <Input
            size="large"
            value={drawerContent?.record?.score }
            onChange={(e) => handleFieldChange('score', e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label> { t('language_columns.level')}</label>
          <Input
            size="large"
            value={drawerContent?.record?.level || ''}
            onChange={(e) => handleFieldChange('level', e.target.value)}
          />
        </div>
      </Drawer>
    </>
  );
};

export default LanguageTable;
