import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' // Import useEffect để xử lý responsive
import SidebarContent from './styled-components/toggle-sidebar'
import AuthUser from '../auth'
import { useTranslation } from 'react-i18next'
import {
  checkActionPermission,
  checkMenuPermission,
} from '../../../permissions'
const { Sider, Footer } = Layout
const { SubMenu } = Menu
const menuStyle = {
  borderInlineEnd: 'none',
}
import './static/css/scroll_container.css'

const HomeIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Home-2--Streamline-Solar-Ar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        d="M1.0605 12.2231C1.0605 9.7196 1.0605 8.4679 1.6284 7.4303C2.1964 6.3926 3.2341 5.7486 5.3094 4.4606L7.4973 3.1027C9.6911 1.7412 10.788 1.0605 12 1.0605C13.212 1.0605 14.3089 1.7412 16.5027 3.1027L18.6906 4.4606C20.766 5.7486 21.8036 6.3926 22.3715 7.4303C22.9395 8.4679 22.9395 9.7196 22.9395 12.2231V13.8871C22.9395 18.1544 22.9395 20.2881 21.6579 21.6138C20.3763 22.9395 18.3134 22.9395 14.1879 22.9395H9.8121C5.6865 22.9395 3.6238 22.9395 2.3421 21.6138C1.0605 20.2881 1.0605 18.1544 1.0605 13.8871V12.2231Z"
        stroke="#000000"
        strokeWidth="1.5"
      ></path>
      <path
        d="M12 15.2819V18.5637"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1.5"
      ></path>
    </svg>
  )
}
const ActiveHomeIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Home-2--Streamline-Solar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.531625 4.4296875C0.15 5.126875 0.15 5.967875 0.15 7.649875000000001V8.767875C0.15 11.6349375 0.15 13.0685625 1.0111249999999998 13.95925C1.8721875 14.850000000000001 3.258125 14.850000000000001 6.029999999999999 14.850000000000001H8.97C11.7418125 14.850000000000001 13.127812500000001 14.850000000000001 13.988875 13.95925C14.850000000000001 13.0685625 14.850000000000001 11.6349375 14.850000000000001 8.767875V7.649875000000001C14.850000000000001 5.967875 14.850000000000001 5.126875 14.468375 4.42975C14.086749999999999 3.7325625000000002 13.389625 3.299875 11.995249999999999 2.4345L10.52525 1.5221875000000002C9.0513125 0.607375 8.3143125 0.15 7.5 0.15C6.6856875 0.15 5.948687499999999 0.607375 4.47475 1.522125L3.00475 2.4345C1.6104375000000002 3.299875 0.91325 3.7325625000000002 0.531625 4.4296875ZM6.94875 11.91C6.94875 12.214437499999999 7.1955625 12.46125 7.5 12.46125S8.05125 12.214437499999999 8.05125 11.91V9.705C8.05125 9.4005625 7.8044375 9.15375 7.5 9.15375S6.94875 9.4005625 6.94875 9.705V11.91Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
    </svg>
  )
}

const UserIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="User-Circle--Streamline-Solar-Ar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        stroke="#000000"
        d="M8.7181 8.7181C8.7181 11.2445 11.453 12.8235 13.6409 11.5603C14.6563 10.9741 15.2819 9.8906 15.2819 8.7181C15.2819 6.1918 12.547 4.6128 10.3591 5.876C9.3437 6.4622 8.7181 7.5456 8.7181 8.7181"
        strokeWidth="1.5"
      ></path>
      <path
        stroke="#000000"
        d="M1.0605 12C1.0605 20.4213 10.1767 25.6845 17.4698 21.4739C20.8545 19.5198 22.9395 15.9083 22.9395 12C22.9395 3.5787 13.8233 -1.6845 6.5302 2.5261C3.1455 4.4802 1.0605 8.0917 1.0605 12"
        strokeWidth="1.5"
      ></path>
      <path
        d="M18.53 20.7516C18.356 17.5885 17.3875 15.2819 12 15.2819C6.6126 15.2819 5.6441 17.5885 5.47 20.7516"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1.5"
      ></path>
    </svg>
  )
}
const ActiveUserIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="User-Circle--Streamline-Solar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.850000000000001 7.5C14.850000000000001 11.55925 11.55925 14.850000000000001 7.5 14.850000000000001C3.4406874999999997 14.850000000000001 0.15 11.55925 0.15 7.5C0.15 3.4406874999999997 3.4406874999999997 0.15 7.5 0.15C11.55925 0.15 14.850000000000001 3.4406874999999997 14.850000000000001 7.5ZM9.705 5.295C9.705 6.512812500000001 8.717812499999999 7.5 7.5 7.5S5.295 6.512812500000001 5.295 5.295C5.295 4.0771875 6.282187500000001 3.09 7.5 3.09S9.705 4.0771875 9.705 5.295ZM7.5 13.747499999999999C8.811250000000001 13.747499999999999 10.028187500000001 13.343562499999999 11.0330625 12.65325C11.4769375 12.348375 11.6665625 11.7675625 11.408562499999999 11.2949375C10.873625 10.31525 9.7713125 9.705 7.4999375 9.705C5.228625 9.705 4.1263125 10.3151875 3.591375 11.2949375C3.3333125000000003 11.7675625 3.523 12.3483125 3.9668124999999996 12.653187500000001C4.97175 13.343499999999999 6.1886874999999995 13.747499999999999 7.5 13.747499999999999Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
    </svg>
  )
}

const SettingIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Settings--Streamline-Solar-Ar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        stroke="#000000"
        d="M8.7181 12C8.7181 14.5264 11.453 16.1054 13.6409 14.8422C14.6563 14.2559 15.2819 13.1725 15.2819 12C15.2819 9.4736 12.547 7.8946 10.3591 9.1578C9.3437 9.7441 8.7181 10.8275 8.7181 12"
        strokeWidth="1.5"
      ></path>
      <path
        d="M13.9313 1.227C13.5291 1.0605 13.0195 1.0605 12 1.0605C10.9805 1.0605 10.4709 1.0605 10.0687 1.227C9.5327 1.4491 9.1067 1.875 8.8847 2.4111C8.7833 2.6558 8.7436 2.9404 8.7281 3.3556C8.7053 3.9657 8.3924 4.5304 7.8637 4.8356C7.335 5.1409 6.6895 5.1295 6.1497 4.8442C5.7825 4.6501 5.5161 4.5421 5.2535 4.5075C4.6782 4.4318 4.0964 4.5877 3.636 4.9409C3.2908 5.2059 3.0359 5.6473 2.5262 6.5302C2.0165 7.413 1.7616 7.8544 1.7048 8.2859C1.6291 8.8612 1.785 9.4431 2.1382 9.9034C2.2994 10.1136 2.526 10.2901 2.8777 10.5111C3.3947 10.836 3.7274 11.3895 3.7274 12C3.7273 12.6105 3.3947 13.1639 2.8777 13.4886C2.526 13.7097 2.2993 13.8864 2.1381 14.0966C1.7848 14.5569 1.6289 15.1387 1.7047 15.714C1.7615 16.1454 2.0164 16.5869 2.5261 17.4698C3.0358 18.3526 3.2907 18.7941 3.6359 19.059C4.0963 19.4122 4.6781 19.5681 5.2534 19.4924C5.516 19.4578 5.7823 19.3498 6.1496 19.1558C6.6894 18.8705 7.3349 18.8591 7.8637 19.1643C8.3924 19.4696 8.7053 20.0343 8.7281 20.6445C8.7436 21.0596 8.7833 21.3442 8.8847 21.5889C9.1067 22.125 9.5327 22.551 10.0687 22.773C10.4709 22.9395 10.9806 22.9395 12 22.9395C13.0195 22.9395 13.5291 22.9395 13.9313 22.773C14.4673 22.551 14.8933 22.125 15.1153 21.5889C15.2167 21.3442 15.2564 21.0596 15.2719 20.6444C15.2947 20.0343 15.6075 19.4696 16.1362 19.1643C16.665 18.859 17.3105 18.8705 17.8504 19.1558C18.2176 19.3498 18.4839 19.4577 18.7464 19.4923C19.3217 19.5681 19.9036 19.4122 20.3639 19.059C20.7092 18.794 20.9641 18.3526 21.4738 17.4697C21.9835 16.5868 22.2384 16.1454 22.2952 15.714C22.3709 15.1387 22.215 14.5568 21.8618 14.0964C21.7005 13.8863 21.4739 13.7096 21.1222 13.4886C20.6053 13.1639 20.2726 12.6104 20.2726 11.9999S20.6053 10.8361 21.1222 10.5113C21.474 10.2903 21.7007 10.1137 21.8619 9.9034C22.2151 9.4431 22.371 8.8613 22.2953 8.286C22.2385 7.8545 21.9837 7.4131 21.4739 6.5302C20.9642 5.6474 20.7093 5.2059 20.3641 4.941C19.9037 4.5878 19.3218 4.4319 18.7465 4.5076C18.484 4.5422 18.2177 4.6501 17.8504 4.8442C17.3106 5.1295 16.6651 5.1409 16.1364 4.8357C15.6075 4.5304 15.2947 3.9656 15.2719 3.3555C15.2564 2.9404 15.2167 2.6558 15.1153 2.4111C14.8933 1.875 14.4673 1.4491 13.9313 1.227Z"
        stroke="#000000"
        strokeWidth="1.5"
      ></path>
    </svg>
  )
}
const WorkIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Case-Minimalistic--Streamline-Solar-Ar"
      className="w-5 h-5 opacity-65"
    >
      <path
        d="M8.867437500000001 3.0558125H6.1325625C5.2055 3.0558125 4.445125 3.0558125 3.8141874999999996 3.0930625000000003C2.690125 3.159375 1.976875 3.3438125000000003 1.4638125 3.856875C0.6628125 4.657875000000001 0.6628125 5.947125 0.6628125 8.5255625S0.6628125 12.3933125 1.4638125 13.1943125C2.264875 13.995375000000001 3.5540624999999997 13.995375000000001 6.1325625 13.995375000000001H8.867437500000001C11.445875000000001 13.995375000000001 12.7351875 13.995375000000001 13.536125000000002 13.1943125C14.337187499999999 12.3933125 14.337187499999999 11.104062500000001 14.337187499999999 8.5255625C14.337187499999999 5.947125 14.337187499999999 4.657875000000001 13.5361875 3.856875C13.023187499999999 3.3438125000000003 12.3098125 3.159375 11.185875000000001 3.0930625000000003C10.554875 3.0558125 9.794500000000001 3.0558125 8.867437500000001 3.0558125Z"
        stroke="#000000"
        strokeWidth="1"
      ></path>
      <path
        d="M3.8143124999999998 3.0930625000000003C4.3773125 3.0787500000000003 4.874 2.683125 5.0655625 2.1535C5.0714375 2.13725 5.077500000000001 2.119125 5.0895624999999995 2.082875L5.107125 2.03025C5.135999999999999 1.9436875 5.150375 1.9004375000000002 5.1658124999999995 1.8620625C5.362875000000001 1.371875 5.824625 1.0390625 6.351875 1.0071875C6.393187500000001 1.0046249999999999 6.438812499999999 1.0046249999999999 6.5300625 1.0046249999999999H8.47025C8.561499999999999 1.0046249999999999 8.6070625 1.0046249999999999 8.648375 1.007125C9.1756875 1.0390625 9.6374375 1.371875 9.8345 1.8620625C9.849875 1.9004375000000002 9.8643125 1.9436875 9.893125000000001 2.03025L9.91075 2.082875C9.92275 2.1190625 9.928812500000001 2.13725 9.93475 2.1535C10.126312500000001 2.683125 10.6229375 3.0787500000000003 11.186 3.0930625000000003"
        stroke="#000000"
        strokeWidth="1"
      ></path>
      <path
        d="M14.106000000000002 4.915375C12.0480625 6.2529375 11.019125 6.921749999999999 9.934375 7.2588125C8.348875 7.751375 6.651249999999999 7.751375 5.0656875 7.2588125C3.981 6.921749999999999 2.9520625000000003 6.2529375 0.8941250000000001 4.915375"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
      <path
        d="M4.765125 6.4744375V7.841875"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
      <path
        d="M10.234875 6.4744375V7.841875"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
    </svg>
  )
}
const ActiveWorkIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Case-Minimalistic--Streamline-Solar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        d="M0.269125 5.202875000000001C0.15 6.0141875 0.15 7.077 0.15 8.510625000000001C0.15 11.2824375 0.15 12.6684375 1.0111249999999998 13.5295C1.8721875 14.390625 3.258125 14.390625 6.029999999999999 14.390625H8.97C11.7418125 14.390625 13.127812500000001 14.390625 13.988875 13.5295C14.850000000000001 12.6684375 14.850000000000001 11.2824375 14.850000000000001 8.510625000000001C14.850000000000001 7.077187499999999 14.850000000000001 6.0143125 14.730875000000001 5.2030625C13.0575625 6.2906875 11.985062500000002 6.984375 10.9913125 7.4115625V7.7756875C10.9913125 8.080125 10.744499999999999 8.3269375 10.4400625 8.3269375C10.1396875 8.3269375 9.895375 8.086625 9.889 7.78775C8.3231875 8.2005625 6.676937499999999 8.2005625 5.1111875 7.78775C5.1048124999999995 8.086625 4.8605 8.3269375 4.5600625 8.3269375C4.255625 8.3269375 4.0088125 8.080125 4.0088125 7.7756875V7.4115C3.0150625 6.9843125 1.9425000000000001 6.2906249999999995 0.269125 5.202875000000001Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.4573125 0.609375H6.4423125C6.358875 0.609375 6.2939375 0.609375 6.2325 0.6130625C5.4530625 0.6603125 4.7705625000000005 1.1521875 4.4793125 1.8766875C4.45625 1.9341249999999999 4.4182500000000005 2.0481875 4.391125000000001 2.1295625L4.3883125 2.138125C4.3125 2.3438125000000003 4.1756874999999996 2.522 4.01725 2.6492500000000003C3.8500625 2.6546874999999996 3.6903750000000004 2.6616250000000004 3.53775 2.670625C2.3294375 2.7419375 1.562625 2.94025 1.0111249999999998 3.49175C0.8313125 3.6715625000000003 0.6890000000000001 3.87425 0.5764375 4.1076875C0.61875 4.1221875 0.66 4.142 0.6991875000000001 4.1675C2.2429375 5.1709375 3.2128125 5.798562499999999 4.01875 6.201124999999999C4.0675625 5.9466874999999995 4.291375 5.7544375 4.5600625 5.7544375C4.8645 5.7544375 5.1113125 6.001250000000001 5.1113125 6.3056875V6.64225C6.669062500000001 7.112375 8.331 7.112375 9.8888125 6.64225V6.3056875C9.8888125 6.001250000000001 10.135625 5.7544375 10.4400625 5.7544375C10.7088125 5.7544375 10.932625 5.94675 10.981375 6.2011875000000005C11.7873125 5.798562499999999 12.757249999999999 5.1709375 14.300999999999998 4.1675C14.340187499999999 4.1420625 14.381375 4.12225 14.423625 4.1078125C14.311 3.8743125000000003 14.168750000000001 3.6715625000000003 13.988875 3.49175C13.4374375 2.94025 12.670562499999999 2.7419375 11.4623125 2.670625C11.317375 2.662125 11.166125000000001 2.655375 11.0081875 2.6500624999999998C10.9981875 2.642 10.988187499999999 2.633625 10.9781875 2.625C10.80125 2.472125 10.6629375 2.2705625 10.5931875 2.0815L10.590875 2.0745625C10.564499999999999 1.9954375 10.544 1.9338125000000002 10.521 1.8766875C10.2298125 1.1521875 9.54725 0.6603125 8.767875 0.6130625C8.7064375 0.609375 8.6414375 0.609375 8.558 0.609375H6.4573125ZM9.5709375 2.4951875L9.567625 2.48725L9.5640625 2.4783749999999998L9.56075 2.469625L9.558 2.4623125000000003L9.556687499999999 2.458625L9.553625 2.449625L9.5508125 2.4413125L9.54925 2.4366874999999997L9.5471875 2.4305625L9.545562499999999 2.4254375L9.54425 2.42125C9.515375 2.3345 9.506499999999999 2.30875 9.498125 2.2879375C9.36575 1.958625 9.0555 1.7349999999999999 8.7011875 1.7135624999999999C8.6775 1.712125 8.6484375 1.711875 8.543062500000001 1.711875H6.4573125C6.3519375 1.711875 6.3228125 1.712125 6.299125 1.7135624999999999C5.9449375 1.7349999999999999 5.6346875 1.9585625000000002 5.5023124999999995 2.28775L5.500375 2.2929375L5.4945 2.309C5.489625 2.3226875 5.483687499999999 2.33975 5.4768125 2.3598125C5.464687499999999 2.395375 5.4510625 2.4361875 5.437250000000001 2.4776249999999997L5.435875 2.482L5.4342500000000005 2.4871875L5.43225 2.4933125L5.4306874999999994 2.497875L5.427875 2.5061875000000002L5.42475 2.5151875L5.4234375 2.518875L5.420812499999999 2.5261875L5.4174375 2.535L5.413812500000001 2.543875L5.41075 2.5511875L5.4103125 2.55225C5.400062500000001 2.5785625000000003 5.3891875 2.604875 5.3778125 2.6310624999999996C5.586250000000001 2.6306249999999998 5.8035000000000005 2.6306249999999998 6.029999999999999 2.6306249999999998H8.97C9.1989375 2.6306249999999998 9.4184375 2.6306249999999998 9.6289375 2.6311250000000004C9.608 2.5861875000000003 9.588625 2.5408125 9.5709375 2.4951875Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
    </svg>
  )
}
const NotificationIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Notification-Unread-Lines--Streamline-Solar-Ar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        d="M14.337187499999999 6.4744375V7.5C14.337187499999999 10.723062500000001 14.337187499999999 12.334624999999999 13.335875 13.335875C12.3346875 14.337187499999999 10.723062500000001 14.337187499999999 7.5 14.337187499999999C4.276875 14.337187499999999 2.665375 14.337187499999999 1.6640625 13.335875C0.6628125 12.3346875 0.6628125 10.723062500000001 0.6628125 7.5C0.6628125 4.276875 0.6628125 2.665375 1.6640625 1.6640625C2.665375 0.6628125 4.276875 0.6628125 7.5 0.6628125H8.5255625"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
      <path
        stroke="#000000"
        d="M10.234875 2.7139375C10.234875 4.2929375 11.944187500000002 5.279812499999999 13.311625 4.4903125C13.94625 4.1239375 14.337187499999999 3.44675 14.337187499999999 2.7139375C14.337187499999999 1.135 12.6279375 0.148125 11.2604375 0.9376249999999999C10.6258125 1.3039999999999998 10.234875 1.981125 10.234875 2.7139375"
        strokeWidth="1"
      ></path>
      <path
        d="M4.0813749999999995 8.867437500000001H10.234875"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
      <path
        d="M4.0813749999999995 11.2604375H8.1836875"
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth="1"
      ></path>
    </svg>
  )
}
const ActiveNotificationIcon = () => {
  return (
    <svg
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Notification-Unread-Lines--Streamline-Solar"
      className="w-5 h-5 opacity-65 "
    >
      <path
        d="M14.850000000000001 2.355C14.850000000000001 3.5728125 13.862812499999999 4.5600000000000005 12.645 4.5600000000000005S10.440000000000001 3.5728125 10.440000000000001 2.355S11.4271875 0.15 12.645 0.15S14.850000000000001 1.1371875 14.850000000000001 2.355Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.27375 8.97C3.27375 8.6655625 3.5205625 8.418750000000001 3.825 8.418750000000001H10.440000000000001C10.7444375 8.418750000000001 10.991249999999999 8.6655625 10.991249999999999 8.97S10.7444375 9.52125 10.440000000000001 9.52125H3.825C3.5205625 9.52125 3.27375 9.2744375 3.27375 8.97Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.226375 13.773625000000001C2.30275 14.850000000000001 4.0351875 14.850000000000001 7.5 14.850000000000001C10.9648125 14.850000000000001 12.69725 14.850000000000001 13.773625000000001 13.773625000000001C14.850000000000001 12.69725 14.850000000000001 10.9648125 14.850000000000001 7.5C14.850000000000001 6.471875000000001 14.850000000000001 5.596375 14.821875 4.8451875C14.240187500000001 5.354125 13.478625 5.6625000000000005 12.645 5.6625000000000005C10.818312500000001 5.6625000000000005 9.3375 4.1816875 9.3375 2.355C9.3375 1.5213750000000001 9.6459375 0.7598125 10.154812499999998 0.17812499999999998C9.403625 0.15 8.528125 0.15 7.5 0.15C4.0351875 0.15 2.30275 0.15 1.226375 1.226375C0.15 2.30275 0.15 4.0351875 0.15 7.5C0.15 10.9648125 0.15 12.69725 1.226375 13.773625000000001ZM3.27375 11.5425C3.27375 11.238062499999998 3.5205625 10.991249999999999 3.825 10.991249999999999H8.235C8.5394375 10.991249999999999 8.786249999999999 11.238062499999998 8.786249999999999 11.5425S8.5394375 12.09375 8.235 12.09375H3.825C3.5205625 12.09375 3.27375 11.846937500000001 3.27375 11.5425Z"
        fill="#1677ff"
        strokeWidth="1"
      ></path>
    </svg>
  )
}

const HrRecruitmentIcon = () => {
  return (
    <svg
      className="w-5 h-5 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.67 14.3L21.27 19.3C21.12 20.83 21 22 18.29 22H5.71001C3.00001 22 2.88001 20.83 2.73001 19.3L2.33001 14.3C2.25001 13.47 2.51001 12.7 2.98001 12.11C2.99001 12.1 2.99001 12.1 3.00001 12.09C3.55001 11.42 4.38001 11 5.31001 11H18.69C19.62 11 20.44 11.42 20.98 12.07C20.99 12.08 21 12.09 21 12.1C21.49 12.69 21.76 13.46 21.67 14.3Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M3.5 11.43V6.28003C3.5 2.88003 4.35 2.03003 7.75 2.03003H9.02C10.29 2.03003 10.58 2.41003 11.06 3.05003L12.33 4.75003C12.65 5.17003 12.84 5.43003 13.69 5.43003H16.24C19.64 5.43003 20.49 6.28003 20.49 9.68003V11.47"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.42993 17H14.5699"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
const Sidebar = ({ permissions }) => {
  const location = useLocation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem('current_action_phone'),
  )
  const [currentAction, setCurrentAction] = useState(
    sessionStorage.getItem('current_action'),
  )

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (location.pathname === '/u/login') {
    return null
  }
  const handleOnClickMenuItem = (e) => {
    sessionStorage.setItem('current_action', e.key)
    setCurrentAction(e.key)
  }

  const handleOnClickMenuItemPhone = (e) => {
    sessionStorage.setItem('current_action_phone', e)
    setActiveTab(e)
  }
  return (
    <>
      {!isMobile ? (
        <Sider
          width={250}
          theme="light"
          collapsed={collapsed}
          onCollapse={toggleSidebar}
          className="p-1 border-r-[1px] h-screen overflow-auto scroll-container"
        >
          <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} />
          <AuthUser collapsed={collapsed} />
          <Menu
            style={menuStyle}
            mode="inline"
            defaultSelectedKeys={[`${currentAction}`]}
            className="border-r-0"
            onClick={(e) => handleOnClickMenuItem(e)}
          >
            {checkMenuPermission(permissions, 'home', 'view') && (
              <Menu.Item key="home">
                <Link to="/u/home" className="flex items-center justify-start">
                  <span
                    className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                  >
                    <HomeIcon />
                  </span>
                  {!collapsed && (
                    <span className="ml-3">{t('side_bar.home')}</span>
                  )}
                </Link>
              </Menu.Item>
            )}
            {checkMenuPermission(permissions, 'notifications', 'view') && (
              <Menu.Item key="notifications">
                <Link
                  to="/u/notifications"
                  className="flex items-center justify-start"
                >
                  <span
                    className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                  >
                    <NotificationIcon />
                  </span>
                  {!collapsed && (
                    <span className="ml-3">{t('side_bar.notifications')}</span>
                  )}
                </Link>
              </Menu.Item>
            )}

            {checkMenuPermission(permissions, 'work', 'view') && (
              <SubMenu
                key="work"
                title={
                  <span className="flex items-center gap-3">
                    <span
                      className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                    >
                      <WorkIcon />
                    </span>
                    {!collapsed && <span>{t('side_bar.work')}</span>}
                  </span>
                }
              >
                {checkMenuPermission(permissions, 'work-1-1', 'view') && (
                  <Menu.Item key="work-1-1">
                    <Link
                      to="/u/action=6/time_tracking"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.time_tracking')}
                    </Link>
                  </Menu.Item>
                )}

                {checkMenuPermission(permissions, 'work-1-2', 'view') && (
                  <Menu.Item key="work-1-2">
                    <Link
                      to="/u/action=7/payroll"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.payroll')}
                    </Link>
                  </Menu.Item>
                )}
              </SubMenu>
            )}

            {checkMenuPermission(permissions, 'hr-recruitment', 'view') && (
              <SubMenu
                key="hr-recruitment"
                title={
                  <span className="flex items-center gap-3">
                    <span
                      className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                    >
                      <HrRecruitmentIcon />
                    </span>
                    {!collapsed && <span>{t('side_bar.recruitment')}</span>}
                  </span>
                }
              >
                {checkMenuPermission(
                  permissions,
                  'hr-recruitment-1-1',
                  'view',
                ) && (
                  <Menu.Item key="hr-recruitment-1-1">
                    <Link
                      to="/u/action=17/employee-interview-data"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.recruitment')}
                    </Link>
                  </Menu.Item>
                )}

                {checkMenuPermission(
                  permissions,
                  'hr-recruitment-1-3',
                  'view',
                ) && (
                  <Menu.Item key="hr-recruitment-1-3">
                    <Link
                      to="/u/action=20/data-employee"
                      className="flex items-center justify-start"
                    >
                        {t('side_bar.data_recruitment')}
                    </Link>
                  </Menu.Item>
                )}
              </SubMenu>
            )}

            {checkMenuPermission(permissions, 'setting', 'view') && (
              <SubMenu
                key="setting"
                title={
                  <span className="flex items-center gap-3">
                    <span
                      className={`icon-wrapper ${collapsed ? ' justify-center mt-2' : ''}`}
                    >
                      <SettingIcon />
                    </span>
                    {!collapsed && <span>{t('side_bar.setting')}</span>}
                  </span>
                }
              >
                {checkMenuPermission(permissions, 'setting-1-1', 'view') && (
                  <Menu.Item key="setting-1-1">
                    <Link
                      to="/u/action=1/general_settings"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.general_settings')}
                    </Link>
                  </Menu.Item>
                )}

                {checkMenuPermission(permissions, 'setting-1-2', 'view') && (
                  <Menu.Item key="setting-1-2">
                    <Link
                      to="/u/action=2/users"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.users')}
                    </Link>
                  </Menu.Item>
                )}

                {checkMenuPermission(permissions, 'setting-1-3', 'view') && (
                  <Menu.Item key="setting-1-3">
                    <Link
                      to="/u/action=3/groups_users"
                      className="flex items-center justify-start"
                    >
                      {t('side_bar.groups_users')}
                    </Link>
                  </Menu.Item>
                )}

                {checkMenuPermission(permissions, 'setting-2-1', 'view') && (
                  <SubMenu
                    key="setting-2-1"
                    title={
                      <span className="flex items-center gap-3">
                        {' '}
                        {t('side_bar.technique')}
                      </span>
                    }
                  >
                    {checkMenuPermission(
                      permissions,
                      'setting-2-1-1',
                      'view',
                    ) && (
                      <Menu.Item key="setting-2-1-1">
                        <Link
                          to="/u/action=4/technique_access"
                          className="flex items-center justify-start"
                        >
                          {t('side_bar.technique_access')}
                        </Link>
                      </Menu.Item>
                    )}

                    {checkMenuPermission(
                      permissions,
                      'setting-2-1-2',
                      'view',
                    ) && (
                      <Menu.Item key="setting-2-1-2">
                        <Link
                          to="/u/action=5/technique_menu"
                          className="flex items-center justify-start"
                        >
                          {t('side_bar.technique_menu')}
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}

                {checkMenuPermission(permissions, 'setting-3-1', 'view') && (
                  <SubMenu
                    key="setting-3-1"
                    title={
                      <span className="flex items-center gap-3">
                        {' '}
                        {t('Mô hình')}
                      </span>
                    }
                  >
                    {checkMenuPermission(
                      permissions,
                      'setting-3-1-1',
                      'view',
                    ) && (
                      <Menu.Item key="setting-3-1-1">
                        <Link
                          to="/a/action=8/personnel"
                          className="flex items-center justify-start"
                        >
                          {t('Nhân viên')}
                        </Link>
                      </Menu.Item>
                    )}

                    {checkMenuPermission(
                      permissions,
                      'setting-3-1-2',
                      'view',
                    ) && (
                      <Menu.Item key="setting-3-1-2">
                        <Link
                          to="/a/action=9/working_time"
                          className="flex items-center justify-start"
                        >
                          {t('Thời gian làm việc')}
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}
              </SubMenu>
            )}
          </Menu>
        </Sider>
      ) : (
        <Footer className="fixed bottom-0 z-50 w-full bg-white border-t-[1px] border-b-0 pt-3 pb-6 p-0">
          <div className="flex justify-around w-full space-x-4">
            {/* Home Tab */}
            <div className="flex-1 text-center">
              <Link
                to="/u/home"
                className="flex flex-col items-center"
                onClick={() => handleOnClickMenuItemPhone('home')}
              >
                {activeTab === 'home' ? <ActiveHomeIcon /> : <HomeIcon />}
                <span
                  className={`mt-2 text-xs ${
                    activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {t('footer_app.home')}
                </span>
              </Link>
            </div>

            <div className="flex-1 text-center">
              <Link
                to="/u/phone/work"
                className="flex flex-col items-center"
                onClick={() => handleOnClickMenuItemPhone('work')}
              >
                {activeTab === 'work' ? <ActiveWorkIcon /> : <WorkIcon />}
                <span
                  className={`mt-2 text-xs ${
                    activeTab === 'work' ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {t('side_bar.work')}
                </span>
              </Link>
            </div>

            <div className="flex-1 text-center">
              <Link
                to="/u/phone/notifications"
                className="flex flex-col items-center"
                onClick={() => handleOnClickMenuItemPhone('notifications')}
              >
                {activeTab === 'notifications' ? (
                  <ActiveNotificationIcon />
                ) : (
                  <NotificationIcon />
                )}
                <span
                  className={`mt-2 text-xs ${
                    activeTab === 'notifications'
                      ? 'text-blue-500'
                      : 'text-gray-500'
                  }`}
                >
                  {t('side_bar.notifications')}
                </span>
              </Link>
            </div>

            <div className="flex-1 text-center">
              <Link
                to={`u/profile/${userNameLogin}`}
                className="flex flex-col items-center"
                onClick={() => handleOnClickMenuItemPhone('profile')}
              >
                {activeTab === 'profile' ? <ActiveUserIcon /> : <UserIcon />}
                <span
                  className={`mt-2 text-xs ${
                    activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {t('footer_app.profile')}
                </span>
              </Link>
            </div>
          </div>
        </Footer>
      )}
    </>
  )
}

export default Sidebar
