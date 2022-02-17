/** @format */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

//images
import BackArrowIcon from '../../assets/common/back_arrow.svg'
import Logo from '../../assets/home/logo.png'
import Circle from '../../assets/language/circle.svg'
import ActiveCircle from '../../assets/language/circle_active.svg'

//component
import {
  FONT_ZAW_GYI,
  FONT_UNICODE,
  FONT_ENGLISH_US,
} from '../../constant/languageConfig'
import { goToSpecificPathName } from '../../util/goToSpecificPathName'
import { MY_ACCOUNT } from '../../constant/locationPathName'
import { useHistory } from 'react-router'
import { goBack } from '../../util/goToSpecificPathName'
import { GET_STORED_ACCESS_TOKEN } from '../../util/storage'

const LanguageArray = [
  {
    id: 1,
    label: 'ဤစာကိုျမင္ရသည္',
    desc: '(Zawgyi)',
    value: FONT_ZAW_GYI,
  },
  {
    id: 2,
    label: 'ဤစာကိုမြင်ရသည်',
    desc: '(Unicode)',
    value: FONT_UNICODE,
  },
  {
    id: 3,
    label: 'English',
    desc: '(English)',
    value: FONT_ENGLISH_US,
  },
]

export default function LanguageChanges() {
  const history = useHistory()
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang_value) => {
    i18n.changeLanguage(lang_value)
  }

  const clickOnConfirm = () => {
    history.goBack()
  }

  return (
    <div className="">
      <div className="w-11/12  h-auto mx-auto py-3">
        <div onClick={() => goBack(history)} className="cursor-pointer">
          <img src={BackArrowIcon} className="w-3 h-auto" alt="Back Arrow" />
        </div>
      </div>
      <div className="container w-11/12 h-auto max-w-screen-lg mx-auto py-14">
        <div
          className="grid grid-cols-1 gap-y-10
        md:grid-cols-2
        md:shadow-lg
        md:px-10
        md:py-12
        md:bg-gray-300
        md:bg-opacity-60
        md:backdrop-filter
        md:backdrop-blur-lg
        "
        >
          <div className="grid place-content-center space-y-8">
            <img src={Logo} className="w-3/6 h-auto mx-auto" alt="Logo" />
          </div>
          <div className="space-y-10">
            <div className="text-secondary text-center font-semibold space-y-1">
              <p> ဘာသာစကား ရွေးချယ်မည် </p>
              <p> (Please Select Language) </p>
            </div>
            <div className="space-y-5">
              {LanguageArray.map((lang) => (
                <div
                  key={lang.id}
                  className="flex justify-between bg-white bg-opacity-80 px-4 py-3"
                  onClick={() => changeLanguage(lang.value)}
                >
                  <div className="space-y-1">
                    <p className="text-primary font-medium">{lang.label}</p>
                    <p className="text-tertiary font-medium">{lang.desc}</p>
                  </div>
                  <img
                    src={i18n.language === lang.value ? ActiveCircle : Circle}
                    className="w-5 h-auto"
                    alt="Circle"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="primary-btn bg-custom-primary color px-10 py-2"
                onClick={() => clickOnConfirm()}
              >
                {t('ChooseLanguage.confirm')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
