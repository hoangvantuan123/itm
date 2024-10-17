import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Modal, Typography, Button, Row, Col, Tag, message, Select, Radio } from 'antd';
import { PutUserInter } from '../../../features/hrInter/putUserInter';
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;
export default function ShowResult({
    isOpen,
    onClose,
    note,
    setNote,
    id,
    stateNote,
    setStateNote,
    fetchDataUserId
}) {
    const [interviewers, setInterviewers] = useState("");
    const [result, setResult] = useState('');
    const { t } = useTranslation();
    const [applicantType, setApplicantType] = useState(null)
    const handleClose = () => {
        if (note && note.trim().length > 0) {
            onClose();
        } else {
            message.warning(t('Vui lòng nhập ghi chú trước khi đóng!'));
        }
    };

    const handtApplicantType = (e) => {
        setApplicantType(e)
    }
    const handleInterviewers = (e) => {
        setInterviewers(e.target.value);
    }

    const handleResult = (e) => {
        setResult(e.target.value);
    }

    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const handleChange = async () => {
        const submissionData = {
            note: note,
            applicant_type: applicantType,
            interviewer_user: interviewers,
            interview_results: result
        }
        try {
            const response = await PutUserInter(id, submissionData)
            if (response.success) {
                message.success('Cập nhật thành công!')
                setStateNote(note)
                handleClose()
                fetchDataUserId()
            } else {
                message.error(`Cập nhật thất bại: ${response.message}`)
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi trong quá trình cập nhật.')
        }
    }
    return (
        <Modal
            title={t('Kết quả phỏng vấn')}
            open={isOpen}
            width={900}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleChange}
                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    {t('Lưu')}
                </Button>,
            ]}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Title level={5}>{t('Người phỏng vấn')}</Title>
                    <Input size="large" value={interviewers} rows={6} onChange={handleInterviewers} allowClear />
                </Col>
                <Col span={12}>
                    <Title level={5}>{t('Kết quả phỏng vấn')}</Title>
                    <Radio.Group value={result} onChange={handleResult}>
                        <Radio value="Đạt">ĐẠT</Radio>
                        <Radio value="Không Đạt">KHÔNG ĐẠT</Radio>
                    </Radio.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col span={24}>
                    <Title level={5}>{t('Ghi chú')}</Title>
                    <TextArea value={note} rows={6} onChange={handleNote} allowClear />
                </Col>
            </Row>
        </Modal>
    );
}
