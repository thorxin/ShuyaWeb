import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import { Hook } from './hook'
import DefaultAuthContainer from '../../WrapperComponents/default_auth_container'
import Box from '../../CommonComponent/AddressDropBox/box'
import AuthenticationLoading from '../../CommonComponent/Loading/auth_loading'
import { ErrorMessageBoxValidation } from '../../CommonComponent/error_box'
import ConfirmationBox from '../../CommonComponent/DialogBox/confirmation_box'

//images
import LocationPinIcon from '../../../assets/common/location_pin_icon.svg'

export default function ChangeAddress(props) {
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
    isRequiredAddress,
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
    delete_address,
  ] = Hook(props)

  const { t } = useTranslation()

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
      <DefaultAuthContainer>
        <div>
          <p className="sub-heading-font text-center">
            {t('Authentication.change-address')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-4">
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
              className="primary-font resize-y shadow-lg border w-full h-36 py-2 px-3"
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
          <div className="mt-5">
            <button onClick={clickingConfirmBtn} className="auth-btn">
              {isSecondaryLoading ? (
                <AuthenticationLoading />
              ) : (
                <p>{t('Authentication.confirm')}</p>
              )}
            </button>
          </div>
        </div>
      </DefaultAuthContainer>
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
