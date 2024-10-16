import { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from '../components/sildebar-frame/sidebar'
import Home from '../pages/home'
import Login from '../auth/login'
import Register from '../auth/register'
import Profile from '../pages/profile'
import Setting from '../pages/settingAdmin'
import GeneralSettings from '../pages/generalSettings'
import Notifications from '../pages/notifications'
import WorkTimeTracking from '../pages/workTimeTracking'
import GroupsUsersSettings from '../pages/groupsUserSettings'
import UsersSettings from '../pages/usersSettings'
import Default from '../pages/default'
import TimeTracking from '../pages/TimeTracking'
import TechniqueMenu from '../pages/techniqueMenu'
import Unauthorized from '../pages/unauthorized'
import Spinner from '../pages/load'
import ErrorServer from '../pages/errorServer'
import Cookies from 'js-cookie'
import PhoneWork from '../pages/phoneWork'
import Personnel from '../pages/personnel'
import PhoneNotifications from '../pages/phoneNotifications'
import PassFormPage from '../pages/passFormPage'
import MultiStepFormPage from '../pages/multiStepFormPage'
import WorkerDeclarationPassForm from '../pages/workerDeclarationPassForm'
import WorkerDeclarationMultiStepForm from '../pages/workerDeclarationMultiStepForm'
import EmployeeRecruitment from '../pages/employeeRecruitment'
import WorkerRecruitmentPage from '../pages/workerRecruitment'
import SuccessNotification from '../pages/successNotification'
import { useTranslation } from 'react-i18next'
import { RefreshToken } from '../../features/auth/API/refreshToken'
import { GetUserPermissions } from '../../features/auth/API/getPermissions'
import { checkActionPermission } from '../../permissions'
import DetailUserHrRecruitment from '../pages/detailUserHrRecruitment'
import DetailUserHrInterview from '../pages/detailUserHrInterview'
import EmployeeDataiView from '../pages/employeeData'
import DetailUserHrAllDataTrue from '../pages/detailUserHrAllDataTrue'
import DetailUserHrAllDataFalse from '../pages/detailUserHrAllDataFalse'
import ClosePage from '../pages/closePage'
import DownloadView from '../pages/download'
import HrSalary from '../pages/salary'
import DetailSalaryUser from '../pages/detailSalaryUser'
import Payroll from '../pages/payroll'
const { Content } = Layout

const UserRouter = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userPermissions, setUserPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const skippedRoutes = [
    '/public/apply/form/1',
    '/public/apply/information/phone',
    '/public/apply/inter/phone',
    '/public/apply/form/2',
    '/public/apply/form/1',
    '/public/apply/thong-bao',
    '/public/apply/form/new',
    '/public/close',
    '/downloads',
    '/downloads/ITM-1.0.0.dmg',
    '/downloads/ITM.exe',
  ]

  const checkLoginStatus = () => {
    const token = Cookies.get('accessToken')
    const userInfo = localStorage.getItem('userInfo')

    if (token && userInfo) {
      setIsLoggedIn(true)
    } else {
      Cookies.remove('accessToken')
      localStorage.removeItem('userInfo')
      navigate('/u/login')
    }
  }

  useEffect(() => {
    if (
      !skippedRoutes.includes(location.pathname) &&
      !location.pathname.startsWith('/public/') &&
      !location.pathname.startsWith('/downloads/')
    ) {
      checkLoginStatus()
    }
  }, [location.pathname])

  const fetchPermissions = async () => {
    setLoading(true)
    setShowSpinner(false)
    try {
      const response = await GetUserPermissions()
      if (response.success) {
        setUserPermissions(response.data)
        setError(null)
      } else {
        setError(response.message)
        Cookies.remove('accessToken')
        localStorage.removeItem('userInfo')
        navigate('/u/login')
      }
    } catch (error) {
      setError(error.message || 'Đã xảy ra lỗi')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchPermissions()
    }
  }, [isLoggedIn])

  if (loading) return <Spinner />
  if (error) return <ErrorServer />

  return (
    <Routes>
      <Route
        path="/public/apply/information/phone"
        element={<WorkerDeclarationPassForm />}
      />

      <Route
        path="/downloads"
        element={<DownloadView />}
      />
      <Route
        path="/public/close"
        element={<ClosePage />}
      />
      <Route path="/public/apply/inter/phone" element={<PassFormPage />} />

      <Route
        path="/public/apply/form/2/:router"
        element={<WorkerDeclarationMultiStepForm />}
      />
      <Route
        path="/public/apply/form/1/:router"
        element={<MultiStepFormPage />}
      />
      <Route path="/public/apply/thong-bao" element={<SuccessNotification />} />

      {/* Router riêng tư */}
      <Route path="u/login" element={<Login />} />
      {isLoggedIn && (
        <Route
          path="/*"
          element={
            <Layout style={{ minHeight: '100vh' }}>
              <Sidebar permissions={userPermissions} />
              <Layout>
                <Content>
                  <Routes>
                    <Route
                      path="u/home"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'home',
                          'view',
                        ) ? (
                          <Home />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path={`u/profile/${JSON.parse(localStorage.getItem('userInfo'))?.login || 'none'}`}
                      element={<Profile permissions={userPermissions} />}
                    />
                    <Route
                      path="u/action=1/general_settings"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting',
                          'view',
                        ) ? (
                          <GeneralSettings permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/notifications"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'notifications',
                          'view',
                        ) ? (
                          <Notifications />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/phone/notifications"
                      element={<PhoneNotifications />}
                    />
                    <Route
                      path="u/action=2/users"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting-1-2',
                          'view',
                        ) ? (
                          <UsersSettings permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/action=3/groups_users"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting-1-3',
                          'view',
                        ) ? (
                          <GroupsUsersSettings permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route path={`u/phone/work`} element={<PhoneWork />} />
                    <Route
                      path="u/action=6/time_tracking"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'work-1-1',
                          'view',
                        ) ? (
                          <TimeTracking />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/action=7/payroll"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'work-1-2',
                          'view',
                        ) ? (
                          <Payroll  permissions={userPermissions} isMobile={isMobile}/>
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/action=4/technique_access"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting-2-1-1',
                          'view',
                        ) ? (
                          <Default />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="u/action=5/technique_menu"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting-2-1-2',
                          'view',
                        ) ? (
                          <TechniqueMenu permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="/a/action=8/personnel"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'setting-2-1-2',
                          'view',
                        ) ? (
                          <Personnel />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="/u/action=17/employee-interview-data"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'hr-recruitment-1-1',
                          'view',
                        ) ? (
                          <EmployeeRecruitment permissions={userPermissions} isMobile={isMobile} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="/u/action=17/employee-interview-data/detail/:id"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'hr-recruitment-1-1',
                          'view',
                        ) ? (
                          <DetailUserHrRecruitment
                            permissions={userPermissions}
                            isMobile={isMobile}
                          />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />

                    <Route
                      path="/u/action=20/data-employee/detail/type=true/:id"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'hr-recruitment-1-3',
                          'view',
                        ) ? (
                          <DetailUserHrAllDataTrue permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />

                    <Route
                      path="/u/action=20/data-employee"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'hr-recruitment-1-3',
                          'view',
                        ) ? (
                          <EmployeeDataiView permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />


                    <Route
                      path="/u/action=20/data-salary"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'salary',
                          'view',
                        ) ? (
                          <HrSalary isMobile={isMobile} permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                    <Route
                      path="/u/action=20/data-salary/detail/:id"
                      element={
                        checkActionPermission(
                          userPermissions,
                          'salary',
                          'view',
                        ) ? (
                          <DetailSalaryUser permissions={userPermissions} />
                        ) : (
                          <Unauthorized />
                        )
                      }
                    />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          }
        />
      )}
    </Routes>
  )
}

const App = () => (
  <Router>
    <UserRouter />
  </Router>
)

export default App
