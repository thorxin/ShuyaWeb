/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router';

//components
import { Hook } from './hook';
import {
  ErrorMessageBoxValidation,
  ErrorBox,
} from '../../CommonComponent/error_box';
import AuthLoading from '../../CommonComponent/Loading/auth_loading';
import {
  goBack,
  goToSpecificPathName,
} from '../../../util/goToSpecificPathName';

//images
import BackArrowIcon from '../../../assets/common/back_arrow.svg';
import Logo from '../../../assets/home/app_logo.svg';
import AppLogo from '../../../assets/home/app_logo.png';
import ResendIcon from '../../../assets/Authentication/Verification/resend_icon.svg';
import ResendLoading from '../../../assets/Authentication/Loading/resend_loading.gif';
import SuccessBox from '../../CommonComponent/DialogBox/success_box';
import SuccessTipIcon from '../../../assets/common/success_tip_icon.svg';

import ToastBox from "../../CommonComponent/DialogBox/toast_box";
import { REGISTRATION_CHANGE_ADDRESS } from '../../../constant/locationPathName';

export default function AccountVerification(props) {
  const [
    isLoading,
    errorMessage,
    isResendLoading,
    resendMessage,
    OTP,
    isError,
    isOpenSuccessBox,
    setIsOpenSuccessBox,
    /**
     * action
     */
    setOTP,
    verifyConfirm,
    sendCodeAgain,
    goToRegisterAddress,
  ] = Hook(props);

  const { t } = useTranslation();
  const history = useHistory();

  return (
    <section>
      {/* <div className='md:bg-registration-web-image bg-cover bg-center md:min-h-screen md:w-full'> */}
      <div className=''>
        <ErrorBox message={errorMessage} />
        <div className='ml-5 pt-5'>
          <div onClick={() => goBack(history)} className='cursor-pointer'>
            <img src={BackArrowIcon} className='w-3 h-auto' alt='Back Arrow' />
          </div>
        </div>
        <div className=' h-screen flex flex-wrap content-center md:w-8/12 md:mx-auto'>
          <div className='default-margin-layout'>
            <div className='flex justify-center pb-5 -mt-10'>
              {/* <div>
                <img src={Logo} className='w-28 h-auto' alt='Logo' />
              </div> */}
              {/* <div>
                <img
                  src={AppLogo}
                  className="w-28 md:w-32 h-auto"
                  alt="AppLogo"
                />
              </div> */}
            </div>
            <div className='pt-2 pb-6 md:py-2'>
              <div className='flex justify-center -mt-10'>
                <p className='text-2xl custom-font-style'>
                  Enter <span className=' text-color-main'>OTP</span>
                </p>
              </div>
              <div className='mb-8'>
                <p className='secondary-font text-center'>
                  {t('Verification.code-has-been-sent')}
                </p>
                <p className='secondary-font text-center'>
                  {t('Verification.enter-the-code')}
                </p>
              </div>

              {/* OTP Input Part */}
              <div className='default-margin-layout my-8'>
                <OtpInput
                  isInputNum={true}
                  shouldAutoFocus={true}
                  value={OTP}
                  onChange={setOTP}
                  numInputs={6}
                  containerStyle={'justify-evenly'}
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    fontSize: '1rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.20)',
                    margin: 'auto',
                  }}
                />
                <div className={`${isError ? 'block' : 'hidden'} `}>
                  <ErrorMessageBoxValidation
                    errorMessage={`${t('Authentication.error-message-en')}${t(
                      'Authentication.require-code'
                    )}${t('Authentication.error-message')}
                    `}
                  />
                </div>
              </div>
              {/* End OTP Input Part */}

              <div className='md:w-8/12 w-11/12 mx-auto my-8'>
                <button
                  onClick={() => verifyConfirm(OTP)}
                  className='auth-btn custom-font-regular text-md w-full rounded-md bg-custom-primary'
                >
                  {isLoading ? (
                    <AuthLoading />
                  ) : (
                    <p> {t('Verification.confirm')} </p>
                  )}
                </button>
              </div>
              <div className='default-margin-layout flex justify-between'>
                <p className='tertiary-font text-color-secondary md:pl-0 pl-2'>
                  {t("Verification.didn't-get-code")}
                </p>
                <div
                  className='flex space-x-2 cursor-pointer'
                  onClick={() => sendCodeAgain()}
                >
                  {isResendLoading ? (
                    <img
                      src={ResendLoading}
                      className='w-4 h-auto'
                      alt='Resend Icon'
                    />
                  ) : (
                    <img
                      src={ResendIcon}
                      className='w-4 h-auto'
                      alt='Resend Icon'
                    />
                  )}
                  <p className='tertiary-font md:pr-0 pr-2'>
                    {t('Verification.resend')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessBox
        isOpenBox={isOpenSuccessBox}
        SuccessImage={SuccessTipIcon}
        SuccessMessage={t('Authentication.success-register')}
        /**
         * action
         */
        continueProcess={goToRegisterAddress}
        cancelBox={() => setIsOpenSuccessBox(false)}
      />
      <ToastBox isShowing={resendMessage!=''}>
        <div id="hide" className="fixed bottom-5 w-full z-20">
            <div className="default-margin-layout bg-blue-400 p-2 rounded-lg">
              <p className="secondary-font text-color-white text-center font-medium">
                {resendMessage}
              </p>
            </div>
          </div>
      </ToastBox>
    </section>
  );
}
