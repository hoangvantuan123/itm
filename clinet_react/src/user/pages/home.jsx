import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Space, Form, Button, Switch, Typography, Dropdown, message, Menu, Tabs, Row, Col, Drawer } from 'antd'
const { Search } = Input
import decodeJWT from '../../utils/decode-JWT'
import {
  BellOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  KeyOutlined,
  UserOutlined,
  ArrowRightOutlined, CloseOutlined
} from '@ant-design/icons';
import {
  LockOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
  FormatPainterOutlined,
  ReloadOutlined,
  StarFilled
} from '@ant-design/icons';
import { changePassword } from '../../features/auth/API/changePasswordAPI'
import Cookies from 'js-cookie'
import { PutUserTokenId } from '../../features/resUsers/putUserIdToken'
const { Title, Text } = Typography

const { TabPane } = Tabs
import 'moment/locale/vi'
import ShortcutDrawer from '../components/shortcuts'


const ArrowRightIcon = () => {
  return (
    <svg className="w-4 h-4 opacity-55" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home({ permissions }) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userId = userFromLocalStorage.id
  const employeeCode = userFromLocalStorage.login
  const { i18n, t } = useTranslation();
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const visibleMenus = permissions.filter(
    menu => menu?.pm_view && menu?.parent_path !== null
  );
  const [form] = Form.useForm()

  const [selectedLanguageLabel, setSelectedLanguageLabel] = useState('');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('');
  const [selectedThemeLabel, setSelectedThemeLabel] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutDrawerVisible, setLogoutDrawerVisible] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);
  const [open, setOpen] = useState(false);
  const [changePasswordView, setChangePasswordView] = useState(false);


  const storedShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];

  useEffect(() => {

    const validShortcuts = storedShortcuts.filter((shortcut) =>
      permissions.some((menu) => menu.key_name === shortcut.key_name && menu.pm_view)
    );

    setShortcuts(validShortcuts);
  }, [permissions, storedShortcuts]);


  const handleLogout = () => {
    setLogoutDrawerVisible(true);
  };

  const confirmLogout = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userInfo');
    navigate('/u/login');
    setLogoutDrawerVisible(false);
  };

  const cancelLogout = () => {
    setLogoutDrawerVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const languages = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'fr', label: 'Français' },
  ];
  const themes = [
    { key: 'light', label: 'Sáng' },
    { key: 'dark', label: 'Tối' },
  ];
  const onClose = () => {
    setVisible(false);
  };




  useEffect(() => {
    const storedLanguageKey = localStorage.getItem('language') || 'vi';
    const languageLabel = languages.find((lang) => lang.key === storedLanguageKey)?.label || 'English';
    setSelectedLanguageLabel(languageLabel);


    const storedThemeKey = localStorage.getItem('appTheme') || 'light';
    const themeLabel = themes.find((theme) => theme.key === storedThemeKey)?.label || 'Sáng';
    setSelectedThemeLabel(themeLabel);
  }, []);

  const handleLanguageChange = ({ key }) => {
    const languageLabel = languages.find((lang) => lang.key === key)?.label;
    setSelectedLanguageLabel(languageLabel);
    setSelectedLanguageKey(key);
    localStorage.setItem('language', key);

    setDrawerVisible(true);
  };

  const languageMenu = (
    <Menu onClick={handleLanguageChange} items={languages} />
  );


  const handleThemeChange = ({ key }) => {
    const themeLabel = themes.find((theme) => theme.key === key)?.label;
    setSelectedThemeLabel(themeLabel);
    localStorage.setItem('appTheme', key);

    setDrawerVisible(true);
  };
  const themeMenu = (
    <Menu onClick={handleThemeChange} items={themes} />
  );

  const onFinishLanguage = async () => {
    const data = {
      language: selectedLanguageKey,
    };

    try {
      const result = await PutUserTokenId(data);
      if (result.success) {
        message.success(t('Cập nhật thành công'));
        return true;
      } else {
        message.error(result.message || t('Lỗi khi cập nhật!'));
        return false;
      }
    } catch (error) {
      message.error(error.message || t('Lỗi khi cập nhật!'));
      return false;
    }
  };

  const handleReload = async () => {
    setDrawerVisible(false);
    await onFinishLanguage(); 
  };


  



  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const { new_password, confirm_password, old_password } = values

      if (new_password !== confirm_password) {
        message.error(t('personal_settings_key_menu_03.passwords_do_not_match'))
        return
      }


      const response = await changePassword(old_password, new_password)

      if (response.success) {
        message.success(response.message)
        form.resetFields()
        setChangePasswordView(false)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      console.error('Validate Failed:', error)
      message.error(t('personal_settings_key_menu_03.error_occurred'))
    }
  }
  return (
    <div className="w-full h-screen  bg-white">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="h-full pb-20 lg:pb-4">
        <div className="h-full p-3 overflow-auto scrollable-content">
          <Row gutter={[10, 10]} className="grid-container">
            <Col span={24} className="div1   flex items-center  justify-between ">
              <div></div>
              <div>
                <ShortcutDrawer open={open} setOpen={setOpen} visibleMenus={visibleMenus} />

              </div>
            </Col>

            <Col span={24} className="div2   flex flex-col ">
              <Title level={3}>{t('page_home.home')}</Title>

            </Col>

            <Col span={24} className="div3 mt-4 flex flex-col">
              <Text className="opacity-60 text-sm mb-2">{t('page_home.job')}</Text>
              <ul className="space-y-1 bg-slate-50 rounded-lg">
                <li>
                  <Link
                    to={`/u/phone/notifications`}
                    className="group flex items-center justify-between px-4 py-3 border-b-[0.5px] text-gray-500 hover:text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-300 p-2 px-3 rounded-md">
                        <BellOutlined className="text-white text-base" />
                      </div>
                      <span className="text-sm font-medium">{t('page_home.notifi')}</span>
                    </div>
                    <ArrowRightIcon />
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/u/phone/work`}
                    className="group flex items-center justify-between px-4 py-3 border-b-[0.5px] text-gray-500 hover:text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-300 p-2 px-3 rounded-md">
                        <ClockCircleOutlined className="text-white text-base" />
                      </div>
                      <span className="text-sm font-medium">{t('page_home.timeckeeping')}</span>
                    </div>
                    <ArrowRightIcon />
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/u/action=7/payroll`}
                    className="group flex items-center justify-between px-4 py-3 border-b-[0.5px] text-gray-500 hover:text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-400 p-2 px-3 rounded-md">
                        <DollarOutlined className="text-white text-base" />
                      </div>
                      <span className="text-sm font-medium">{t('page_home.monthly_salary')}</span>
                    </div>
                    <ArrowRightIcon />
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={showDrawer}
                    className="group flex items-center justify-between px-4 py-3 text-gray-500 hover:text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-300 p-2 px-3 rounded-md">
                        <UserOutlined className="text-white text-base" />
                      </div>
                      <span className="text-sm font-medium">{t('page_home.personalization')}</span>
                    </div>
                    <ArrowRightIcon />
                  </Link>
                </li>
              </ul>
            </Col>

            <Col span={24} className="div3 mt-4 flex flex-col">
              <Text className="opacity-60 text-sm mb-2">{t('page_home.shortcuts')}</Text>
              <ul className="space-y-1  rounded-lg  bg-slate-50">
                {shortcuts.length > 0 ? (
                  shortcuts.map((shortcut, index) => (
                    <li key={shortcut.key_name} className={`group flex items-center justify-between px-4 py-4 ${index !== shortcuts.length - 1 ? 'border-b-[0.5px]' : ''
                      } text-gray-500 hover:text-gray-700`}
                    >
                      <Link to={`${shortcut.parent_path}`} className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <StarFilled className="mr-2 text-base text-yellow-500" />
                          <span className="text-sm font-medium">{shortcut.menu_name}</span>
                        </div>
                        <ArrowRightIcon />
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-4 flex flex-col items-center  text-center justify-center text-gray-500">
                    {t('page_home.text_shortcuts')}
                    <button onClick={() => setOpen(true)} className="px-4 py-3 w-56 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      {t('page_home.get_started')}
                    </button>
                  </li>
                )}
              </ul>
            </Col>
            <Col span={24} className="div3 mt-4 flex flex-col">
              <Text className="opacity-60 text-sm mb-2">  {t('page_home.recently')}</Text>
              <ul className="space-y-1 rounded-lg bg-slate-50">
                <li className="px-4 py-4 flex flex-col  text-center text-gray-500">
                  {t('page_home.text_recently')}
                </li>
              </ul>
            </Col>


          </Row>


          <Drawer placement="bottom"  styles={{
            wrapper: {
              borderRadius: '16px 16px 0 0', 
               overflow: 'hidden' 
            }
          }} onClose={onClose} visible={visible} height="97%" headerStyle={{ display: 'none' }} closable={true} bodyStyle={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
          >
            <div className="flex items-end justify-end">
              <Button className="bg-slate-100 border-none rounded-full" onClick={onClose} icon={<CloseOutlined />}
              />
            </div>



            {/* Tài Khoản */}
            <Text className="opacity-60 text-sm mb-2 mt-5">{t('page_home.account')}</Text>
            <ul className="space-y-1  rounded-lg  bg-slate-50">
              <li>
                <Link className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50">
                  <div className="flex items-center">
                    <UserOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.account2')}</span>
                  </div>
                  <span className="text-sm">{employeeCode}</span>
                </Link>
              </li>

              <li>
                <Link className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50">
                  <div className="flex items-center">
                    <LockOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.account_security')}</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50">
                  <div className="flex items-center">
                    <SettingOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.access_rights')}</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link onClick={() => setChangePasswordView(true)} className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <LockOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.change_password')}</span>
                  </div>
                </Link>
              </li>
            </ul>

            {/* Ứng Dụng */}
            <Text className="opacity-60 text-sm mb-2 mt-5">{t('page_home.app')}</Text>
            <ul className="space-y-1  rounded-lg bg-slate-50">
              <li>
                <div className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <GlobalOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.language')}</span>
                  </div>
                  <Dropdown overlay={languageMenu} trigger={['click']}>
                    <span className="text-sm font-medium text-blue-500 hover:underline">
                      {selectedLanguageLabel}
                    </span>
                  </Dropdown>
                </div>
              </li>


              <li>
                <div className="group flex items-center justify-between px-4 py-4  hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FormatPainterOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.color_palette')}</span>
                  </div>
                  <Dropdown overlay={themeMenu} trigger={['click']}>
                    <span className="text-sm font-medium text-blue-500 hover:underline">
                      {selectedThemeLabel}
                    </span>
                  </Dropdown>
                </div>
              </li>
            </ul>

            {/* Thông Báo */}
            <Text className="opacity-60 text-sm mb-2 mt-5">{t('page_home.notification')}</Text>
            <ul className="space-y-1  rounded-lg bg-slate-50">
              <li>
                <Link className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50">
                  <div className="flex items-center">
                    <BellOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.notification_status')}</span>
                  </div>
                  <Switch defaultChecked onChange={(checked) => console.log('Trạng thái thông báo:', checked)} />
                </Link>
              </li>

              <li>
                <Link className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <AppstoreOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.place_of_notice')}</span>
                  </div>
                </Link>
              </li>
            </ul>

            <span className="mt-2 text-xs italic opacity-65">{t('page_home.note_text')}</span>

            {/* Về */}
            <Text className="opacity-60 text-sm mb-2 mt-5">{t('page_home.about')}</Text>
            <ul className="space-y-1  rounded-lg  bg-slate-50">
              <li>
                <Link className="group flex items-center justify-between px-4 py-4 border-b-[0.5px] hover:bg-gray-50">
                  <div className="flex items-center">
                    <InfoCircleOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.help')}</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <InfoCircleOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.terms_of_use')}</span>
                  </div>
                </Link>
              </li>
            </ul>

            {/* Đăng Xuất */}
            <ul className="space-y-1  mt-5 rounded-lg  bg-slate-50">
              <li onClick={handleLogout}>
                <Link className="group flex text-red-600 hover:text-red-600 items-center justify-between px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <LogoutOutlined className="mr-2 text-base" />
                    <span className="text-sm font-medium">{t('page_home.log_out')}</span>
                  </div>
                </Link>
              </li>
            </ul>
          </Drawer>
          <Drawer title="Thông báo" placement="bottom" onClose={() => setDrawerVisible(false)} open={drawerVisible} height="25%" headerStyle={{ display: 'none' }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
           styles={{
            wrapper: {
              borderRadius: '16px 16px 0 0', 
               overflow: 'hidden' 
            }
          }}
          >
            <p className="text-center text-gray-600">{t('page_home.note_language')}</p>
            <Button type="primary"  onClick={handleReload} className="mt-4">
              {t('page_home.load')}
            </Button>
          </Drawer>
          <Drawer placement="bottom"  styles={{
            wrapper: {
              borderRadius: '16px 16px 0 0', 
               overflow: 'hidden' 
            }
          }} onClose={cancelLogout} open={logoutDrawerVisible} height="30%" headerStyle={{ display: 'none' }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <p className="text-center text-gray-600">{t('page_home.confirm')}</p>
            <div className="flex  w-full flex-col justify-between mt-4 gap-4">
              <Button onClick={cancelLogout} size="large" type="default" className="w-full">
                {t('page_home.cancel')}
              </Button>
              <Button onClick={confirmLogout} size="large" type="primary" className="w-full">
                {t('page_home.log_out')}
              </Button>
            </div>
          </Drawer>
          <Drawer placement="bottom"  styles={{
            wrapper: {
              borderRadius: '16px 16px 0 0', 
               overflow: 'hidden' 
            }
          }} onClose={() => setChangePasswordView(false)} open={changePasswordView} headerStyle={{ display: 'none', padding: '2px' }}
          >
            <Form form={form} layout="vertical" name="change_password">
              <Form.Item
                label={t('personal_settings_key_menu_03.label_old_pass')}
                name="old_password"
                rules={[
                  {
                    required: true,
                    message: t(
                      'personal_settings_key_menu_03.please_input_old_password',
                    ),
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={t('personal_settings_key_menu_03.label_old_pass')}
                />
              </Form.Item>
              <Form.Item
                label={t('personal_settings_key_menu_03.label_new_pass')}
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: t(
                      'personal_settings_key_menu_03.please_input_new_password',
                    ),
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={t('personal_settings_key_menu_03.label_new_pass')}
                />
              </Form.Item>

              <Form.Item
                label={t('personal_settings_key_menu_03.label_succ_pass')}
                name="confirm_password"
                dependencies={['new_password']}
                rules={[
                  {
                    required: true,
                    message: t(
                      'personal_settings_key_menu_03.please_confirm_new_password',
                    ),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          t('personal_settings_key_menu_03.passwords_do_not_match'),
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={t('personal_settings_key_menu_03.label_succ_pass')}
                />
              </Form.Item>
            </Form>
            <div className="w-full flex gap-2"> <Button
              key="cancel"
              onClick={() => setChangePasswordView(false)}
              size="large"
              style={{ backgroundColor: '#f5f5f5', borderColor: '#d9d9d9' }}
              className="w-full"
            >
              {t('personal_settings_key_menu_03.cancel')}
            </Button>
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                size="large"
                className="w-full"
              >
                {t('personal_settings_key_menu_03.save')}
              </Button></div>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
