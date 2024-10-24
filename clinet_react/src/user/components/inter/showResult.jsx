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
            message.warning(`${t('api_status.show_result')}`)
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
                message.success(`${t('api_status.update_success')}`)
                setStateNote(note)
                handleClose()
                fetchDataUserId()
            } else {
                message.error(`${t('api_status.update_error')}: ${response.message}`)
            }
        } catch (error) {
            message.error(`${t('api_status.error')}`)
        }
    }
    return (
        <Modal
            title={t('hr_recruitment_1_1.interview_results')}
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
                    <Title level={5}>{t('hr_recruitment_1_1.interviewers')}</Title>
                    <Input size="large" value={interviewers} rows={6} onChange={handleInterviewers} allowClear />
                </Col>
                <Col span={12}>
                    <Title level={5}>{t('hr_recruitment_1_1.result_interviewers')}</Title>
                    <Radio.Group value={result} onChange={handleResult}>
                    <Radio value="Đạt">{t('hr_recruitment_1_1.obtain')}</Radio>
                    <Radio value="Không Đạt">{t('hr_recruitment_1_1.not_achieved')}</Radio>
                    </Radio.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col span={24}>
                    <Title level={5}>{t('hr_recruitment_1_1.note')}</Title>
                    <TextArea value={note} rows={6} onChange={handleNote} allowClear />
                </Col>
            </Row>
        </Modal>
    );
}
