import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Button, message } from 'antd'
import { PostSyncData } from '../../../features/hrInter/postSyncData'

const { Title } = Typography

const SynIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SynActionHrInter({
  fetchData,
  isOpen,
  selectedRowKeys,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleConfirm = async () => {
    setLoading(true)
    const result = await PostSyncData(selectedRowKeys)
    setLoading(false)

    if (result.success) {
      fetchData()
      setIsModalVisible(false)
      message.success(
        `${result.message} ${selectedRowKeys.length} ${t('records_synced')}`,
      )
    } else {
      message.error(t('sync_failed') + ': ' + result.message)
    }
  }

  return (
    <>
      <button onClick={showModal} className="border-[1.3px] border-[#d9d9d9] rounded-lg p-[0.6rem] w-auto flex items-center space-x-2 bg-white hover:bg-gray-100">
        <SynIcon />
        <span className="text-gray-500">{t('field_action.syn')}</span>
      </button>

      <Modal
        title={t('field_action.syn_title')}
        visible={isModalVisible}
        onOk={handleConfirm}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ backgroundColor: '#f5f5f5', borderColor: '#d9d9d9' }}
          >
            {t('field_action.cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleConfirm}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            {t('field_action.submit')}
          </Button>,
        ]}
      >
        <p>
          {t('field_action.syn_content_html')}
          ?
        </p>
      </Modal>
    </>
  )
}
