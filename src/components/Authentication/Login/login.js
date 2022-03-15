/** @format */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Hook } from './hook';
import { ErrorMessageBoxValidation } from '../../CommonComponent/error_box';
import { ErrorBox } from '../../CommonComponent/error_box';
import AuthLoading from '../../../components/CommonComponent/Loading/auth_loading';
import {
  goBack,
  goToSpecificPathName,
} from '../../../util/goToSpecificPathName';
import {
  FORGOT_PASSWORD,
  REGISTRATION,
} from '../../../constant/locationPathName';

//images
import AppLogo from '../../../assets/home/app_logo.png';
import FacebookLogo from '../../../assets/Authentication/Login/facebook_logo.svg';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import BackArrowIcon from '../../../assets/common/back_arrow.svg';
// lib
import FaceBookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { DEV_APP_ID, PROD_APP_ID } from '../../../constant/facebookConfig';
export default function LogInPage(props) {
  const [
    isLoading,
    isSecondaryLoading,
    errorMessage,
    showPassword,
    /**
     * action
     */
    onSubmit,
    togglePasswordVisibility,
    responseFacebook,
  ] = Hook(props);

  const { t } = useTranslation();
  const eye = <FontAwesomeIcon icon={faEye} className='ml-12' />;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  return (
    // <div className='bg-no-repeat bg-cover bg-center w-full bg-registration-mobile-image md:bg-registration-web-image md:min-h-screen md:h-auto md:w-full flex items-center'>
    <div className='bg-no-repeat bg-cover bg-center w-full md:min-h-screen md:h-auto md:w-full flex items-center'>
      <ErrorBox message={errorMessage} />
      <div className='h-auto mx-auto py-3 fixed top-4 md:top-8 left-10'>
        <div onClick={() => goBack(history)} className='cursor-pointer'>
          <img src={BackArrowIcon} className='w-3 h-auto' alt='Back Arrow' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:gap-y-6 w-11/12 max-w-sm h-auto mx-auto'>
        <div className=''>
          <div className='grid grid-cols-1 gap-y-6'>
            <div className='md:my-5 my-10'>
              <img
                src={AppLogo}
                className=' w-2/5 h-auto mx-auto'
                alt='AppLogo'
              />
              <p className='text-center mt-2 font-semibold'>
                Your daily necessary things
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
                <div>
                  <input
                    type='tel'
                    className='auth-text-box bg-custom-graycolor'
                    placeholder={t('Authentication.fill-phone')}
                    {...register('PhoneNumber', {
                      required: `${t('Authentication.error-message-en')} ${t(
                        'Authentication.require-phone'
                      )} ${t('Authentication.error-message')}`,
                    })}
                  />
                  {errors.PhoneNumber && (
                    <ErrorMessageBoxValidation
                      errorMessage={errors.PhoneNumber.message}
                    />
                  )}
                </div>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='auth-text-box bg-custom-graycolor pr-10'
                    placeholder={t('Authentication.fill-password')}
                    {...register('Password', {
                      required: `${t('Authentication.error-message-en')} ${t(
                        'Authentication.require-password'
                      )} ${t('Authentication.error-message')}`,
                    })}
                  />
                  <div
                    className='absolute top-0 right-0 my-3 mx-2.5'
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`w-5 h-auto ${
                        showPassword
                          ? 'text-color-default'
                          : 'text-color-secondary'
                      }`}
                    >
                      {eye}
                    </i>
                  </div>
                  {errors.Password && (
                    <ErrorMessageBoxValidation
                      errorMessage={errors.Password.message}
                    />
                  )}
                </div>

                <div className='h-auto'>
                  <button className='auth-btn bg-custom-primary px-1 py-3 rounded-md'>
                    {isLoading ? (
                      <AuthLoading />
                    ) : (
                      <p>{t('Authentication.login')}</p>
                    )}
                  </button>
                </div>
                <p className='text-center'>or</p>
                <div className='h-auto '>
                  <FaceBookLogin
                    appId={DEV_APP_ID}
                    autoLoad={false}
                    fields='name,email,picture'
                    callback={responseFacebook}
                    disableMobileRedirect={true}
                    scope='public_profile, email'
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className='auth-btn bg-custom-main text-color-default  py-2 rounded-md'
                      >
                        <div className='flex justify-center items-center'>
                          {isSecondaryLoading ? (
                            <AuthLoading />
                          ) : (
                            <>
                              <img
                                src={FacebookLogo}
                                className='w-6 h-auto mr-3'
                                alt='FacebookLogo'
                              />
                              {t('Authentication.sign-in-facebook')}
                            </>
                          )}
                        </div>
                      </button>
                    )}
                  />
                </div>
                <div>
                  <p>
                    Don't have an account yet ?{' '}
                    <span
                      className='text-tertiary text-color-brown font-medium cursor-pointer'
                      onClick={() =>
                        goToSpecificPathName(history, REGISTRATION)
                      }
                    >
                      {t('Authentication.sign-up-here')}
                    </span>
                  </p>
                  <p
                    className=' text-color-brown font-medium cursor-pointer text-color-default'
                    onClick={() =>
                      goToSpecificPathName(history, FORGOT_PASSWORD)
                    }
                  >
                    {t('Authentication.forget-password?')} <br />
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
