import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

//components
import { Hook } from './hook'
import Box from '../../../../CommonComponent/AddressDropBox/box'
import AuthenticationLoading from '../../../../CommonComponent/Loading/auth_loading'
import { ErrorMessageBoxValidation } from '../../../../CommonComponent/error_box'
import ConfirmationBox from '../../../../CommonComponent/DialogBox/confirmation_box'
import { goBack } from '../../../../../util/goToSpecificPathName'

//images
import LocationPinIcon from '../../../../../assets/common/location_pin_icon.svg'

export default function AddNewAddress(props) {
  const [
    isRequiredTownship,
    isLoading,
    isSecondaryLoading,
    cityList,
    initialSelectedCity,
    selectedCity,
    isOpenCityBox,
    isOpenTownshipBox,
    townshipList,
    initialSelectedTownship,
    selectedTownship,
    notHaveTownship,
    address,
    landMark,
    isRequiredAddress,
    isRequiredCity,
    isShowConfirmBox,
    setIsShowConfirmBox,
    /**
     * action
     */
    openCityBox,
    closeCityBox,
    searchingCity,
    onClickCity,
    openTownshipBox,
    closeTownshipBox,
    searchingTownship,
    onClickTownship,
    onSubmit,
    onChangeAddress,
    clickingConfirmBtn,
    onChangeLandMark,
    clickedCancel,
  ] = Hook(props)

  const { t } = useTranslation()
  const history = useHistory()
  const goBackAccount = () => {
    history.goBack()
  }
  let confirmMessage = `${t('Authentication.change-address-confirm-msg-1')} ${t(
    'Authentication.city',
  )} - ${selectedCity?.name} ${
    !notHaveTownship
      ? `${t('Common.and')} ${t('Authentication.township')} - ${
          selectedTownship
            ? selectedTownship?.name
            : initialSelectedTownship?.name
        }`
      : ''
  } ${t('Authentication.change-address-confirm-msg-2')}`

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 pt-4">
        <div>
          <Box
            Loading={isLoading}
            AddressTypeName={t('Authentication.search-city')}
            List={cityList}
            InitialSelectedData={initialSelectedCity}
            SelectedData={selectedCity}
            IsOpenBox={isOpenCityBox}
            /**
             * action
             */
            OpenBox={openCityBox}
            CloseBox={closeCityBox}
            ClickingBoxItem={onClickCity}
            SearchingValue={searchingCity}
          />
          {isRequiredCity && (
            <ErrorMessageBoxValidation
              errorMessage={t('Authentication.add-city')}
            />
          )}
        </div>
        <div>
          <Box
            Loading={isLoading}
            AddressTypeName={t('Authentication.search-township')}
            List={townshipList}
            InitialSelectedData={initialSelectedTownship}
            SelectedData={selectedTownship}
            IsNotHaveTownship={notHaveTownship}
            IsOpenBox={isOpenTownshipBox}
            /**
             * action
             */
            OpenBox={openTownshipBox}
            CloseBox={closeTownshipBox}
            ClickingBoxItem={onClickTownship}
            SearchingValue={searchingTownship}
          />
        </div>
        {isRequiredTownship && (
          <ErrorMessageBoxValidation
            errorMessage={`${t('Authentication.error-message-en')} ${t(
              'Authentication.address',
            )} ${t('Authentication.error-message')}`}
          />
        )}
        <div>
          <textarea
            className="primary-font resize-y shadow-lg border w-full h-28 py-2 px-3"
            placeholder={t('Authentication.add-address')}
            onChange={(e) => onChangeAddress(e.target.value)}
            value={address}
          />
          {isRequiredAddress && (
            <ErrorMessageBoxValidation
              errorMessage={`${t('Authentication.error-message-en')} ${t(
                'Authentication.address',
              )} ${t('Authentication.error-message')}`}
            />
          )}
        </div>
        <div>
          <textarea
            className="primary-font resize-y shadow-lg border w-full h-28 py-2 px-3"
            placeholder="Landmark"
            onChange={(e) => onChangeLandMark(e.target.value)}
            value={landMark}
          />
        </div>
        <div className="mt-5">
          <div className="w-8/12 ml-auto pb-4">
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <button
                  className="secondary-btn tertiary-font py-2"
                  onClick={goBackAccount}
                >
                  {t('Common.not-do')}
                </button>
              </div>
              <div>
                <button
                  disabled={false}
                  className={`primary-btn tertiary-font py-2 ${
                    false && 'cursor-not-allowed opacity-50'
                  }`}
                  onClick={clickingConfirmBtn}
                >
                  {isSecondaryLoading ? <AuthenticationLoading /> : <p>Save</p>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationBox
        isOpenBox={isShowConfirmBox}
        Icon={LocationPinIcon}
        ConfirmationMessage={confirmMessage}
        /**
         * action
         */
        cancelBox={() => setIsShowConfirmBox(false)}
        confirmBox={onSubmit}
      />
    </>
  )
}
