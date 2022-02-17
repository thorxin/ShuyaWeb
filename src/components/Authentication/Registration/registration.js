/** @format */

import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

//images
import BackArrowIcon from '../../../assets/common/back_arrow.svg'
import Logo from '../../../assets/home/logo.svg'
import AppLogo from '../../../assets/home/app_logo.svg'
import UserProfile from '../../../assets/Authentication/Register/user_profile.svg'
import CameraProfile from '../../../assets/Authentication/Register/camera_profile.svg'
import { faEye } from '@fortawesome/free-solid-svg-icons'

//components
import { Hook } from './hook'
import { ErrorMessageBoxValidation } from '../../CommonComponent/error_box'
import { APP_NAME } from '../../../constant/appName'
import { ErrorBox } from '../../CommonComponent/error_box'
import AuthLoading from '../../CommonComponent/Loading/auth_loading'
import { TERMS_CONDITION } from '../../../constant/locationPathName'
import { goBack } from '../../../util/goToSpecificPathName'

export default function RegisterStep1(props) {
  const [
    isLoading,
    errorMessage,
    imageUploader,
    uploadedImage,
    imageFile,
    showPassword,
    showConfirmPassword,
    /**
     * action
     */
    handleImageUpload,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit,
  ] = Hook(props)

  const eye = <FontAwesomeIcon icon={faEye} className="ml-12" />

  const { t } = useTranslation()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const password = useRef({})
  password.current = watch('Password', '')

  const numberIdentifier = /(?=.*\d)/
  const alphabetIdentifier = /([a-zA-Z])/

  return (
    // <div className="bg-no-repeat bg-cover bg-center w-full bg-registration-mobile-image md:bg-registration-web-image md:min-h-screen md:h-auto md:w-full flex items-center">
    <div className="bg-no-repeat bg-cover bg-center w-full md:min-h-screen md:h-auto md:w-full flex items-center">
      <ErrorBox message={errorMessage} />

      <div className="h-auto mx-auto py-3 fixed top-4 md:top-8 left-10">
        <div onClick={() => goBack(history)} className="cursor-pointer">
          <img src={BackArrowIcon} className="w-3 h-auto" alt="Back Arrow" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:gap-y-6 w-11/12 max-w-sm h-auto mx-auto">
        <div className="">
          {/* Profile Upload Section */}
          <div className="w-11/12 h-auto mx-auto  md:py-6">
            <h3 className="custom-font-style text-2xl text-color-brown mb-4 text-center">
              Register
            </h3>

            <div className="flex justify-center mb-12 mt-3 md:my-0">
              <input
                type="file"
                name="File[0]"
                ref={imageUploader}
                accept="image/*"
                className="hidden relative bg-custom-graycolor"
                onChange={handleImageUpload}
              />
              <div
                className="w-24 h-24 rounded-full flex items-end md:mt-auto mt-20"
                style={{ backgroundImage: `url(${UserProfile})` }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  src={UserProfile}
                  ref={uploadedImage}
                  className="w-24 h-24 object-cover shadow-md rounded-full border-2 border-gray-200"
                  alt="UploadedImage"
                />
                <img
                  src={CameraProfile}
                  className={`w-10 h-auto md:w-10 -ml-8 -mb-2 ${
                    imageFile ? 'hidden' : ''
                  }`}
                  alt="CameraProfile"
                />
              </div>
            </div>
          </div>

          {/* Text Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Name */}
            <div>
              <input
                type="text"
                maxLength="25"
                placeholder={t('Authentication.fill-name')}
                className={`${
                  errors.UserName && 'focus:ring-custom-primary'
                } auth-text-box bg-gray-50 bg-custom-graycolor`}
                {...register('UserName', {
                  required: `${t('Authentication.error-message-en')} ${t(
                    'Authentication.require-name',
                  )} ${t('Authentication.error-message')}`,
                })}
              />
              {errors.UserName && (
                <ErrorMessageBoxValidation
                  errorMessage={errors.UserName.message}
                />
              )}
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                placeholder={t('Authentication.fill-phone')}
                className={`${
                  errors.PhoneNumber && 'focus:ring-red-500'
                } auth-text-box bg-gray-50 bg-custom-graycolor`}
                {...register('PhoneNumber', {
                  required: `${t('Authentication.error-message-en')} ${t(
                    'Authentication.require-phone',
                  )} ${t('Authentication.error-message')}`,
                })}
              />
              {errors.PhoneNumber && (
                <ErrorMessageBoxValidation
                  errorMessage={errors.PhoneNumber.message}
                />
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Authentication.fill-password')}
                  className={`${
                    errors.Password && 'focus:ring-custom-primary'
                  } auth-text-box bg-gray-50 bg-custom-graycolor`}
                  {...register('Password', {
                    required: `${t('Authentication.error-message-en')} ${t(
                      'Authentication.require-password',
                    )} ${t('Authentication.error-message')}`,
                    validate: {
                      length: (value) =>
                        (value && value.length >= 6) ||
                        `${t('Authentication.at-least-total-password')}`,
                      digit: (value) =>
                        (value && numberIdentifier.test(value)) ||
                        `${t('Authentication.at-least-one-digit')}`,
                      alphabet: (value) =>
                        value && value.match(alphabetIdentifier)
                          ? null
                          : `${t('Authentication.at-least-one-char')}`,
                    },
                  })}
                />
                <div
                  className="absolute top-0 right-0 my-3 mx-2.5"
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
              </div>
              {errors.Password && (
                <ErrorMessageBoxValidation
                  errorMessage={errors.Password.message}
                />
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('Authentication.fill-confirm-password')}
                  className="auth-text-box bg-gray-50 bg-custom-graycolor"
                  {...register('ConfirmPassword', {
                    required: `${t('Authentication.error-message-en')} ${t(
                      'Authentication.require-password',
                    )} ${t('Authentication.error-message')}`,
                    validate: (value) =>
                      value === password.current ||
                      `${t('Authentication.password-not-match')}`,
                  })}
                />
                <div
                  className="absolute top-0 right-0 my-3 mx-2.5"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i
                    className={`w-5 h-auto ${
                      showConfirmPassword
                        ? 'text-color-default'
                        : 'text-color-secondary'
                    }`}
                  >
                    {eye}
                  </i>
                </div>
              </div>
              {errors.ConfirmPassword && (
                <ErrorMessageBoxValidation
                  errorMessage={errors.ConfirmPassword.message}
                />
              )}
            </div>

            {/* Terms and Privacy Policy */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  {...register('termsAndPolicy', {
                    required: `${t('Authentication.require-terms-policy')}`,
                  })}
                />
                <p className="primary-font text-color-default mx-5">
                  {t('Authentication.agree-with')}{' '}
                  <span className="text-tertiary font-semibold">
                    {APP_NAME}
                  </span>
                  {t("Authentication.'s")}
                  <Link to={TERMS_CONDITION}>
                    <span className="font-medium italic text-color-link">
                      &nbsp; Terms and Privacy Policy
                    </span>
                  </Link>
                  {t('Authentication.accept')}
                </p>
              </div>
              {errors.termsAndPolicy && (
                <ErrorMessageBoxValidation
                  errorMessage={errors.termsAndPolicy.message}
                />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="auth-btn bg-custom-primary rounded-md mb-4"
              >
                {isLoading ? (
                  <AuthLoading />
                ) : (
                  <p> {t('Authentication.confirm')} </p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Grid <div> End */}
    </div>
  )
}
