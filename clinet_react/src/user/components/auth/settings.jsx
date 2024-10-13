import { useState } from 'react'
import { Modal, Avatar, Typography, Tabs } from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import KeyMenu01 from './menu-key/key-01'
import KeyMenu02 from './menu-key/key-02'
import KeyMenu03 from './menu-key/key-03'
import './static/css/tabUserSetting.css'

const { Text } = Typography
const { TabPane } = Tabs

export default function Setting({ userNameLogin }) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('1')

  const showModal = () => setIsModalOpen(true)
  const handleOk = () => setIsModalOpen(false)
  const handleCancel = () => setIsModalOpen(false)
  const handleTabChange = (key) => setSelectedTab(key)

  const renderContent = () => {
    switch (selectedTab) {
      case '1':
        return <KeyMenu01 />
      case '2':
        return <KeyMenu02 />
      case '3':
        return <KeyMenu03 />
      default:
        return null
    }
  }

  return (
    <div>
      <div
        onClick={showModal}
        className="flex items-center gap-2 cursor-pointer "
      >
        <Avatar shape="square" icon={<UserOutlined />} />
        <Text className="text-sm font-medium">{userNameLogin}</Text>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
        centered
        footer={null}
      >
        <div className="flex h-[80vh]">
          <Tabs
            defaultActiveKey="1"
            activeKey={selectedTab}
            onChange={handleTabChange}
            tabPosition="left"
          >
            <TabPane
              tab={
                <span className="flex items-center gap-3">
                  <UserOutlined /> {t('model_setting.account')}
                </span>
              }
              key="1"
            ></TabPane>
            <TabPane
              tab={
                <span className="flex items-center gap-3">
                  <SettingOutlined /> {t('model_setting.setting')}
                </span>
              }
              key="2"
            ></TabPane>
            <TabPane
              tab={
                <span className="flex items-center gap-3">
                  <SecurityScanOutlined /> {t('model_setting.account_security')}
                </span>
              }
              key="3"
            ></TabPane>
            <TabPane
              tab={
                <span className="flex items-center gap-3">
                  <InfoCircleOutlined /> {t('model_setting.job_information')}
                </span>
              }
              key="4"
            ></TabPane>
          </Tabs>

          <div style={{ padding: 20 }} className="flex-1 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </Modal>
    </div>
  )
}
