import { useState, useEffect, useCallback } from 'react';
import { Form, Table, Input, DatePicker, Layout, Card, Row, Col, Drawer, Button } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const { Content } = Layout;

const FamilyInfoTable = ({ form, dataSource, children }) => {
  const [localDataSource, setLocalDataSource] = useState([]);
  const [childrenDataSource, setChildrenDataSource] = useState([]);
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
        { id: 1, relationship: 'Bố', full_name: null, phone_number: null },
        { id: 2, relationship: 'Mẹ', full_name: null, phone_number: null },
        { id: 3, relationship: 'Vợ', full_name: null, phone_number: null },
      ])
    }

    if (children && children.length > 0) {
      setChildrenDataSource(children);
    } else {
      setChildrenDataSource([
        {
          id: 1,
          children_name: null,
          children_birth_date: null,
          children_gender: null,
        },
        {
          id: 2,
          children_name: null,
          children_birth_date: null,
          children_gender: null,
        },
        {
          id: 3,
          children_name: null,
          children_birth_date: null,
          children_gender: null,
        },
      ])
    }
  }, [dataSource, children]);

  useEffect(() => {
    form.setFieldsValue({ families: localDataSource });
    form.setFieldsValue({ children: childrenDataSource });
  }, [localDataSource, childrenDataSource, form]);

  const handleFamilyMemberChange = useCallback((index, field, value) => {
    setLocalDataSource(prevData =>
      prevData.map((member, idx) =>
        idx === index ? { ...member, [field]: value } : member
      )
    );
  }, []);

  const handleChildrenChange = useCallback((index, field, value) => {
    setChildrenDataSource(prevData =>
      prevData.map((member, idx) =>
        idx === index ? { ...member, [field]: value } : member
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

  const handleDrawerSave = () => {
    if (drawerContent.type === 'family') {
      setLocalDataSource((prevData) =>
        prevData.map((member) =>
          member.id === drawerContent.record.id ? drawerContent.record : member
        )
      );
    } else if (drawerContent.type === 'children') {
      setChildrenDataSource((prevData) =>
        prevData.map((child) =>
          child.id === drawerContent.record.id ? drawerContent.record : child
        )
      );
    }
    handleDrawerClose();
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

  const columns = [
    {
      title: t('family_columns.relationship'),
      dataIndex: 'relationship',
      render: (text, record, index) => (
        <>
          {text}
        </>
      ),
    },
    {
      title: t('family_columns.full_name'),
      dataIndex: 'full_name',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleFamilyMemberChange(index, 'full_name', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
    {
      title: t('family_columns.phone_number'),
      dataIndex: 'phone_number',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleFamilyMemberChange(index, 'phone_number', e.target.value)
          }
          className="border-none w-full"
          type="tel"
          size="large"
          inputMode="numeric"
        />
      ),
    },
  ];
  const columnsChildren = [
    {
      title: t('children_columns.full_name'),
      dataIndex: 'children_name',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleChildrenChange(index, 'children_name', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
    {
      title: t('children_columns.children_birth_date'),
      dataIndex: 'children_birth_date',
      render: (text, record, index) => (
        <DatePicker
          value={text ? moment(text) : null}
          onChange={(date) =>
            handleChildrenChange(
              index,
              'children_birth_date',
              date ? date.format('YYYY-MM-DD') : null
            )
          }
          format="YYYY-MM-DD"
          className="border-none w-full"
        />
      ),
    },
    {
      title: t('children_columns.children_gender'),
      dataIndex: 'children_gender',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleChildrenChange(index, 'children_gender', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
  ];

  const renderKanban1 = () => (
    <Row gutter={16}>
      {localDataSource.map((user) => (
        <Col span={24} key={user.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('family', user)}>
          <p>
              <strong>{ t('family_columns.relationship')}:</strong> {user.relationship}
            </p>
            <p>
              <strong>{ t('family_columns.full_name')}:</strong> {user.full_name}
            </p>
            <p>
              <strong>{ t('family_columns.phone_number')}:</strong> {user.phone_number}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderKanban2 = () => (
    <Row gutter={16}>
      {childrenDataSource.map((user) => (
        <Col span={24} key={user.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('children', user)}>
          <p>
              <strong>{ t('children_columns.children_name')}:</strong> {user.children_name}
            </p>
            <p>
              <strong>{ t('children_columns.children_birth_date')}:</strong> {user.children_birth_date}
            </p>
            <p>
              <strong>{ t('children_columns.children_gender')}:</strong> {user.children_gender}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      {isMobile ? (
        <Form.Item name="families">{renderKanban1()}</Form.Item>
      ) : (
        <Form.Item name="families">
          <Table
            dataSource={localDataSource}
            columns={columns}
            pagination={false}
            rowKey="id"
            bordered
            scroll={{ x: true }}
            style={{ margin: '0 auto' }}
            rowClassName="custom-row"
            size="small"
          />
        </Form.Item>
      )}
      {isMobile ? (
        <>
            <h2 className="text-sm italic mb-4">{ t('hr_recruitment_1_1.title_note_14')}</h2>
          <Form.Item name="children">{renderKanban2()}</Form.Item>
        </>
      ) : (
        <>
          <Form.Item name="children">
          <h2 className="text-sm italic mb-4">{ t('hr_recruitment_1_1.title_note_14')}</h2>
            <Table
              dataSource={childrenDataSource}
              columns={columnsChildren}
              pagination={false}
              rowKey="id"
              bordered
              scroll={{ x: true }}
              style={{ margin: '0 auto' }}
              rowClassName="custom-row"
              size="small"
            />
          </Form.Item>
        </>
      )}

      <Drawer
        title={drawerContent?.type === 'family' ? '' : ''}
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
            <Button className=" border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
            { t('hr_recruitment_1_1.save')}
            </Button>
          </div>
        }
      >
       {drawerContent && (
          <>
            {drawerContent.type === 'family' ? (
              <>
                <div className="mb-4">
                  <label>   { t('family_columns.relationship')}</label>
                  <Input
                    size="large"
                    value={drawerContent.record.relationship}
                    disabled
                    onChange={(e) => handleFieldChange('relationship', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label> { t('family_columns.full_name')}</label>
                  <Input
                    size="large"
                    value={drawerContent.record.full_name}
                    onChange={(e) => handleFieldChange('full_name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label>{ t('family_columns.phone_number')}</label>
                  <Input
                    value={drawerContent.record.phone_number}
                    onChange={(e) => handleFieldChange('phone_number', e.target.value)}
                    type="tel"
                    size="large"
                    inputMode="numeric"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label>{ t('children_columns.children_name')}</label>
                  <Input
                    size="large"
                    value={drawerContent.record.children_name}
                    onChange={(e) => handleFieldChange('children_name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label>{ t('children_columns.children_birth_date')}</label>
                  <DatePicker
                    size="large"
                    value={drawerContent.record.children_birth_date ? moment(drawerContent.record.children_birth_date) : null}
                    onChange={(date) =>
                      handleFieldChange('children_birth_date', date ? date.format('YYYY-MM-DD') : null)
                    }
                    format="YYYY-MM-DD"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label>{ t('children_columns.children_gender')}</label>
                  <Input
                    size="large"
                    value={drawerContent.record.children_gender}
                    onChange={(e) => handleFieldChange('children_gender', e.target.value)}
                  />
                </div>
              </>
            )}
          </>
        )}

      </Drawer>
    </>
  );
};

export default FamilyInfoTable;
