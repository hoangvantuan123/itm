/* EmployeeRecruitment */
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BG from '../../assets/ItmLogo.png'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

export default function Payroll({ permissions, isMobile }) {
    const { t } = useTranslation()
    const navigate = useNavigate()


    return (
        <div className="w-full h-screen flex flex-col bg-white">
            <Helmet>
                <title>ITM - {t('hr_payroll.payroll')}</title>
            </Helmet>

            <div className="grid h-screen place-content-center bg-white px-4">
                <div className="text-center">
                    <img src={BG} className=" w-full  opacity-20 h-auto mb-10" />
                </div>
            </div>
        </div>
    )
}
