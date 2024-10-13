import { useState, useEffect, useCallback } from 'react';
import { Form, Table, Input, Drawer, Button, Row, Col, Card, Select } from 'antd';

const { Option } = Select;

const SkillTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setLocalDataSource(dataSource);
    } else {
        setLocalDataSource([
            { id: 1, skill: 'Excel', level: null },
            { id: 2, skill: 'Word', level: null },
            { id: 3, skill: 'PowerPoint', level: null },
            { id: 4, skill: 'Autocad', level: null },
            { id: 5, skill: 'SolidWorks', level: null },
            { id: 6, skill: 'ERP', level: null },
            { id: 7, skill: 'MES', level: null },
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
    form.setFieldsValue({ skills: localDataSource });
  }, [localDataSource, form]);

  const handleSkill = useCallback((id, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  }, []);

  const columns = [
    {
      title: 'Loại kỹ năng',
      dataIndex: 'skill',
      render: (text, record) => (
        <Input
          value={text}
          disabled
          onChange={(e) => handleSkill(record.id, 'skill', e.target.value)}
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      render: (text, record) => (
        <Radio.Group
        value={text} 
        onChange={(e) => handleSkill(record.id, 'level', e.target.value)}
      >
        <Radio value="Tốt">Tốt</Radio>
        <Radio value="TB">Trung Bình</Radio>
        <Radio value="Kém">Kém</Radio>
      </Radio.Group>
      ),
    }
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
      {localDataSource.map((skill) => (
        <Col span={12} key={skill.id} style={{ marginBottom: 16 }}>
          <Card onClick={() => handleCardClick('skill', skill)}>
            <p><strong>Kỹ năng:</strong> {skill.skill}</p>
            <p><strong>Level:</strong> {skill.level}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      {isMobile ? (
        <Form.Item name="skills">{renderKanban()}</Form.Item>
      ) : (
        <Form.Item name="skills">
          <Table
            dataSource={localDataSource}
            columns={columns} // Đảm bảo sử dụng columns đã cập nhật
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
            <Button className="border-gray-200 bg-indigo-600 text-white shadow-sm text-sm" onClick={handleDrawerSave}>
              Lưu
            </Button>
          </div>
        }
      >
        <div className="mb-4">
          <label>Kỹ năng</label>
          <Input
            size="large"
            disabled
            value={drawerContent?.record?.skill || ''}
            onChange={(e) => handleFieldChange('skill', e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Level</label>
          <Select
            size="large"
            value={drawerContent?.record?.level}
            onChange={(value) => handleFieldChange('level', value)}
            className="w-full"
          >
            <Option value="Tốt">Tốt</Option>
            <Option value="TB">Trung Bình</Option>
            <Option value="Kém">Kém</Option>
          </Select>
        </div>
      </Drawer>
    </>
  );
};

export default SkillTable;
