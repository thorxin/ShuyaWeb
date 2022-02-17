import React, { useState } from 'react'
// lib
import { useTranslation } from 'react-i18next'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
//images
import LeftArrowImage from '../../assets/productSearch/left_arrow_image.png'
// hook
import { Hook } from './hook'
import Box from '../CommonComponent/AddressDropBox/box'
import { ErrorMessageBoxValidation } from '../CommonComponent/error_box'
import { DEFAULT_TOWNSHIP } from '../../constant/defaultTownship'
import AuthenticationLoading from '../CommonComponent/Loading/auth_loading'
import Loading from '../CommonComponent/Loading/main_loading'
import AddNewAddress from '../../containers/Order/container.addnewaddress'
import {
  HOME_LABEL,
  OTHER_LABEL,
  WORK_LABEL,
} from '../../constant/deliveryLabelConfig'
import { LabelIcon } from './label_icon'

export default function DeliveryAddresChange(props) {
  const [
    selectedVal,
    setSelectedVal,
    originVal,
    /**
     * action
     */
    goBack,
    changedSelectedDeliveryAddress,
    delete_address,
  ] = Hook(props)
  const { t } = useTranslation()
  const {
    deliveryAddress = [],
    isTeritaryLoading = false,
    isSecondaryLoading = false,
  } = props
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const checkEditSaveDisabled = parseInt(originVal) === parseInt(selectedVal)
  const [labelFilter, setLabelFilter] = useState(HOME_LABEL)
  if (isTeritaryLoading) return <Loading />

  return (
    <>
      <div className="md:bg-gray-200 w-full h-auto min-h-screen md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto space-y-5 mb-20 md:mb-0 md:pt-20">
          <div className="w-full md:w-6/12 2xl:w-6/12 h-auto mx-auto">
            <div className="md:mb-4 mb-2">
              <div
                className="flex items-center space-x-3 cursor-pointer mt-4 ml-4 md:ml-auto"
                onClick={() => {
                  if (openAddAddress) {
                    setOpenAddAddress(false)
                  } else {
                    goBack()
                  }
                }}
              >
                <div className="w-4 h-auto">
                  <img
                    src={LeftArrowImage}
                    className="w-full h-full"
                    alt="Left Arrow"
                  />
                </div>
                <p className="primary-font text-color-default">
                  {t('Common.back')}
                </p>
              </div>
            </div>
            <div className="bg-white h-auto min-h-screen md:min-h-full">
              <div className="flex flex-col justify-between mx-4 md:mx-8 py-3">
                <p className="truncate h-auto sub-heading-font-h3 text-color-default">
                  {openAddAddress ? 'Add New Address' : 'Select Address'}
                </p>
                {!openAddAddress ? (
                  <>
                    <div className="flex flex-col gap-y-7 pt-4">
                      {deliveryAddress.map((data) => (
                        <label
                          key={data.id}
                          htmlFor={data.id}
                          className="flex cursor-pointer justify-between"
                        >
                          <div className="flex gap-2.5">
                            {/* Icon  */}
                            <LabelIcon labelName={data.labelName} />
                            <div className="flex flex-col">
                              <p className="uppercase h-auto tertiary-font font-semibold text-color-default">
                                {data.labelName}
                              </p>
                              <p className="text-base font-semibold break-words">
                                {data.address},
                                {data.townshipName !== DEFAULT_TOWNSHIP && (
                                  <span>{data.townshipName},</span>
                                )}{' '}
                                {data.cityName}
                              </p>
                              {data.landmark && (
                                <div className="flex items-center gap-1.5">
                                  <svg
                                    height="14px"
                                    width="14px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="gray"
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                                  </svg>
                                  <span className="font-semibold text-color-secondary text-sm">
                                    {data.landmark}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            className="w-3.5 h-3.5"
                            checked={data.id === parseInt(selectedVal)}
                            value={data.id}
                            onChange={(e) => setSelectedVal(e.target.value)}
                            type="radio"
                            name="deliveryAddress"
                            id={data.id}
                          />
                        </label>
                      ))}
                    </div>
                    <span className="text-color-secondary font-semibold pt-7 text-sm">
                      or
                    </span>
                    <button
                      onClick={() => setOpenAddAddress(true)}
                      className=" text-color-link text-sm items-center flex font-bold mt-2 gap-2"
                    >
                      {/* Add Svg  */}
                      <svg
                        className="text-color-link"
                        xmlns="http://www.w3.org/2000/svg"
                        height="17px"
                        viewBox="0 0 24 24"
                        width="17px"
                        fill="currentColor"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                      </svg>
                      Add New Address
                    </button>
                    <div className="w-8/12 ml-auto pt-7 pb-4">
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <button
                            className="secondary-btn tertiary-font py-2"
                            onClick={() => setSelectedVal(originVal)}
                          >
                            {t('Common.not-do')}
                          </button>
                        </div>
                        <div>
                          <button
                            disabled={checkEditSaveDisabled}
                            className={`primary-btn tertiary-font py-2 ${
                              checkEditSaveDisabled &&
                              'cursor-not-allowed opacity-50'
                            }`}
                            onClick={changedSelectedDeliveryAddress}
                          >
                            {isSecondaryLoading ? (
                              <AuthenticationLoading />
                            ) : (
                              <p>Save</p>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-x-2.5 pt-4">
                      <button
                        onClick={() => setLabelFilter(HOME_LABEL)}
                        className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                          labelFilter === HOME_LABEL
                            ? 'bg-custom-primary text-color-white '
                            : 'bg-gray-200'
                        }`}
                      >
                        Home
                      </button>
                      <button
                        onClick={() => setLabelFilter(WORK_LABEL)}
                        className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                          labelFilter === WORK_LABEL
                            ? 'bg-custom-primary text-color-white '
                            : 'bg-gray-200'
                        }`}
                      >
                        Work
                      </button>
                      <button
                        onClick={() => setLabelFilter(OTHER_LABEL)}
                        className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                          labelFilter === OTHER_LABEL
                            ? 'bg-custom-primary text-color-white '
                            : 'bg-gray-200'
                        }`}
                      >
                        Other
                      </button>
                    </div>
                    <AddNewAddress
                      setLabelFilter={setLabelFilter}
                      labelFilter={labelFilter}
                      setOpenAddAddress={setOpenAddAddress}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="bg-gray-200 h-4"></div>
          </div>
        </div>
      </div>
      <FooterWeb />
      <FooterMobile />
    </>
  )
}
