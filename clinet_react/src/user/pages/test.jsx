import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Kết nối với server NestJS

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]); // Danh sách thông báo
  const [clientCount, setClientCount] = useState(0); // Tổng số kết nối

  useEffect(() => {
    // Lắng nghe sự kiện 'newNotification' từ server và cập nhật thông báo
    socket.on('newNotification', (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    // Gửi yêu cầu lấy thông báo từ server
    socket.emit('getNotifications', '123'); // Thay '123' bằng userId của bạn

    // Nhận thông báo từ Redis và cập nhật danh sách
    socket.on('notifications', (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    // Lắng nghe sự kiện 'clientCount' để cập nhật tổng số kết nối
    socket.on('clientCount', (data) => {
      setClientCount(data.total); // Cập nhật tổng số kết nối
    });

    // Yêu cầu số lượng kết nối hiện tại khi component khởi tạo
    socket.emit('getClientCount');

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      socket.off('newNotification');
      socket.off('notifications');
      socket.off('clientCount');
    };
  }, []);

  const sendNotification = () => {
    socket.emit('sendNotification', { userId: '123', message: 'Hello from React!' });
  };

  return (
    <div>
      <h1>Notifications</h1>
      <p>Connected Clients: {clientCount}</p> {/* Hiển thị tổng số kết nối */}
      <button onClick={sendNotification}>Send Notification</button>
      <ul>
        {notifications.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
