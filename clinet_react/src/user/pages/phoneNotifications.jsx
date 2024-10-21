import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Input,
  Space,
  Layout,
  List,
  Button,
  Drawer,
  Typography,
  message,
} from 'antd';
import {
  SearchOutlined,
  ClockCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import '../../static/css/scroll_container.css';
import '../../static/css/drawer_search.css';

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

export default function PhoneNotifications() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  const userNameLogin = userFromLocalStorage?.login || 'none';
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(() => {
    const data = [
      { key: '1', title: 'Thông báo về công việc', content: 'Bạn có một cuộc họp lúc 10:00 sáng ngày mai.', time: '2024-09-23 09:00' },
      { key: '2', title: 'Thông báo chấm công', content: 'Bạn đã chấm công thành công vào lúc 8:30 sáng.', time: '2024-09-23 08:30' },
      { key: '3', title: 'Tin tức mới', content: 'Hôm nay sẽ có một bản cập nhật phần mềm vào lúc 3:00 chiều.', time: '2024-09-23 15:00' },
      { key: '4', title: 'Thông báo nghỉ lễ', content: 'Công ty sẽ nghỉ lễ vào ngày 2 tháng 9.', time: '2024-09-02 00:00' },
      { key: '5', title: 'Thông báo khen thưởng', content: 'Bạn đã được khen thưởng cho hiệu suất làm việc xuất sắc.', time: '2024-09-22 10:00' },
      { key: '6', title: 'Thông báo về dự án', content: 'Dự án ABC đã hoàn thành giai đoạn đầu tiên.', time: '2024-09-21 14:00' },
      { key: '7', title: 'Thông báo khẩn cấp', content: 'Hệ thống sẽ bảo trì vào tối nay từ 10:00 đến 11:00.', time: '2024-09-23 22:00' },
    ];
    setNotifications(data);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Open Drawer and set the selected notification
  const openDrawer = (notification) => {
    setSelectedNotification(notification);
    setDrawerVisible(true);
  };

  // Close Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNotification(null);
  };

  return (
    <div className="w-full h-screen bg-white">
      <Helmet>
        <title>ITM - {t('page_notifications.notifications')}</title>
      </Helmet>
      <Layout className="h-full">
        <Layout className="h-screen overflow-auto bg-white">
          <Content className="p-3 pb-10">
            <div className="flex items-center justify-end">
              <Button className="mb-4 text-xl border-none p-2 bg-none shadow-none">
                <SearchOutlined />
              </Button>
            </div>

            <div className="mb-4">
              <Title level={4}>{t('Thông báo')}</Title>
            </div>

            <div className="pb-32">
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                  <List.Item
                    key={item.key}
                    onClick={() => openDrawer(item)}
                    className="border-b p-4 cursor-pointer transition "
                  >
                    <List.Item.Meta
                      avatar={<BellOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                      title={
                        <div className="flex justify-between w-full items-center">
                          <div className="flex items-center space-x-2">
                            <Text strong>{item.title}</Text>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Text type="secondary">{item.time}</Text>
                          </div>
                        </div>
                      }
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Content>
        </Layout>

        <Drawer
          title={selectedNotification?.title}
          placement="bottom"
          onClose={closeDrawer}
          open={drawerVisible}
          height="30%" headerStyle={{ display: 'none' }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text strong>Nội dung:</Text>
          <p>{selectedNotification?.content}</p>
          <div className="flex items-center mt-4 space-x-2">
            <ClockCircleOutlined style={{ fontSize: '16px', color: 'gray' }} />
            <Text type="secondary">{selectedNotification?.time}</Text>
          </div>
        </Drawer>
      </Layout>
    </div>
  );
}
