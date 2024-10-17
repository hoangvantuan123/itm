import { useState } from 'react';
import { Table, Input, Row, Col, Typography, Statistic, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const { Title } = Typography;

export default function TableView({ salaryData }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and transform salary data
  const filteredData = salaryData.flatMap((item) =>
    item.records.map((record) => ({
      date: item.date,
      id: record.id,
      cid: record.cid,
      check_in: moment(record.check_in).format('HH:mm'),
      create_date: moment(record.create_date).format('DD/MM/YYYY HH:mm'),
      write_date: moment(record.write_date).format('DD/MM/YYYY HH:mm'),
      working_hours: 8.5, // Placeholder for actual working hours
    })),
  )
  .filter((item) => item.date.includes(searchTerm))
  .sort((a, b) => moment(b.date) - moment(a.date));

  // Calculate totals
  const totalWorkingHours = filteredData.reduce((total, record) => total + record.working_hours, 0);
  const totalLateDays = filteredData.filter((record) =>
    moment(record.check_in, 'HH:mm').isAfter(moment('08:00', 'HH:mm'))
  ).length;
  const totalAbsentDays = filteredData.filter(record => !record.check_in).length;

  // Table columns
  const columns = [
    {
      title: t('Date'),
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
      render: date => <span style={{ fontWeight: 'bold' }}>{date}</span>,
    },
    {
      title: t('Check In'),
      dataIndex: 'check_in',
      key: 'check_in',
      render: (text, record) => (
        <span style={{ color: moment(record.check_in, 'HH:mm').isBefore(moment('08:00', 'HH:mm')) ? 'green' : 'red' }}>
          {text}
        </span>
      ),
    },
    {
      title: t('Working Hours'),
      dataIndex: 'working_hours',
      key: 'working_hours',
      render: (hours) => <span>{hours.toFixed(1)} h</span>,
    },
  ];

  // Chart data
  const chartData = {
    labels: filteredData.map(item => item.date),
    datasets: [{
      label: t('Working Hours'),
      data: filteredData.map(item => item.working_hours),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-screen overflow-auto flex flex-col p-3" style={{ height: 'calc(100vh - 20px)' }}>
      <Title level={4} className="text-center mb-4">{t('Attendance Overview')}</Title>
      <Row gutter={[16, 16]} style={{ flex: 1 }}>
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Row gutter={[16, 16]} justify="space-around" align="middle">
            {[
              { title: t('Total Working Hours'), value: totalWorkingHours.toFixed(1), suffix: 'h', color: '#3f8600', icon: <ClockCircleOutlined />, bgColor: '#e6f7ff', borderColor: '#91d5ff' },
              { title: t('Total Late Days'), value: totalLateDays, color: '#ff4d4f', icon: <UserOutlined />, bgColor: '#fff1f0', borderColor: '#ffccc7' },
              { title: t('Total Days'), value: filteredData.length, color: '#3f8600', bgColor: '#f6ffed', borderColor: '#b7eb8f' }
            ].map((stat, index) => (
              <Col key={index} xs={12} sm={8}>
                <Card bordered={false} style={{ backgroundColor: stat.bgColor, borderColor: stat.borderColor, textAlign: 'center' }}>
                  <Statistic 
                    title={stat.title} 
                    value={stat.value} 
                    prefix={stat.icon} 
                    suffix={stat.suffix} 
                    valueStyle={{ color: stat.color }} 
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Bar data={chartData} options={options} />
        </Col>
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Row style={{ marginBottom: 16 }}>
            <Col span={24}>
              <Input
                placeholder={t('Search by date')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '4px', marginBottom: '16px' }}
              />
            </Col>
          </Row>
          <Table
            size="small"
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            locale={{ emptyText: t('No Data') }}
            scroll={{ x: true }}
            bordered
            rowClassName={(record, index) => index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            className="cursor-pointer"
            style={{ height: 'calc(100vh - 300px)', overflowY: 'scroll' }}
          />
        </Col>
      </Row>
    </div>
  );
}
