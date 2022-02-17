import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

// components
import DefaultAuthContainer from '../../WrapperComponents/default_auth_container'
import { APP_NAME } from '../../../constant/appName'
import { Hook } from './hook'
import AuthLoading from '../../CommonComponent/Loading/auth_loading'
import { ErrorMessageBoxValidation } from '../../CommonComponent/error_box'

import { TERMS_CONDITION } from '../../../constant/locationPathName'
import SuccessBox from '../../CommonComponent/DialogBox/success_box'

const ChangePassword = (props) => {
  const [
    IsLoading,
    newPasswordLength,
    requiredCharacter,
    requiredNumber,
    isChecked,
    isSuccessChanged,
    setIsSuccessChanged,
    /**
     * action
     */
    changeOnNewPassword,
    clickingOnTermsCheck,
    onSubmit,
    goTo,
  ] = Hook(props)

  const { t } = useTranslation()

  const eye = <FontAwesomeIcon icon={faEye} className="ml-12" />

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('NewPassword', '')

  //#region - Password Show or Hide
  const [oldPasswordShown, setOldPasswordShown] = useState(false)
  const [newPasswordShown, setNewPasswordShown] = useState(false)
  const [newConfirmPasswordShown, setNewConfirmPasswordShown] = useState(false)
  const toggleOldPasswordShow = () => {
    setOldPasswordShown(!oldPasswordShown)
  }
  const toggleNewPasswordShow = () => {
    setNewPasswordShown(!newPasswordShown)
  }
  const toggleNewConfirmPasswordShow = () => {
    setNewConfirmPasswordShown(!newConfirmPasswordShown)
  }
  //#endregion

  const isValidation = () => {
    if (!isValid || !isChecked || requiredCharacter || requiredNumber) {
      return true
    }
    return false
  }

  const goHere = () => {
    document.getElementById('show').style.display = 'block'
  }

  return (
    <>
      <DefaultAuthContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Old Password */}
          <div className="relative">
            <input
              type={oldPasswordShown ? 'text' : 'password'}
              name="OldPassword"
              placeholder={t('Authentication.fill-old-password')}
              className={`auth-text-box bg-white pr-10 ${
                errors.OldPassword?.type === 'required' && 'ring-2 ring-red-400'
              }`}
              {...register('OldPassword', {
                required: true,
                required: `${t('Authentication.error-message-en')} ${t(
                  'Authentication.require-old-password',
                )} ${t('Authentication.error-message')}`,
              })}
            />
            {errors.OldPassword && (
              <ErrorMessageBoxValidation
                errorMessage={errors.OldPassword.message}
              />
            )}
            <div
              className="absolute top-0 right-0 my-2 mx-2.5"
              onClick={toggleOldPasswordShow}
            >
              <i
                className={`w-5 h-auto ${
                  oldPasswordShown
                    ? 'text-color-default'
                    : 'text-color-secondary'
                }`}
              >
                {eye}
              </i>
            </div>
          </div>
          {/* New Password */}
          <div className="relative">
            <input
              type={newPasswordShown ? 'text' : 'password'}
              name="newPassword"
              placeholder={t('ChangePassword.new_password')}
              className={`auth-text-box bg-white pr-10 ${
                errors.OldPassword?.type === 'required' && 'ring-2 ring-red-400'
              }`}
              {...register('NewPassword', {
                onChange: (e) => changeOnNewPassword(e),
                required: `${t('Authentication.error-message-en')} ${t(
                  'Authentication.require-new-password',
                )} ${t('Authentication.error-message')}`,
                minLength: {
                  value: 6,
                  message: `${t('Authentication.at-least-total-password')}`,
                },
              })}
            />
            {errors.NewPassword && (
              <ErrorMessageBoxValidation
                errorMessage={errors.NewPassword.message}
              />
            )}
            <div
              className="absolute top-0 right-0 my-3 md:my-2 mx-2.5"
              onClick={toggleNewPasswordShow}
            >
              <i
                className={`w-5 h-auto ${
                  newPasswordShown
                    ? 'text-color-default'
                    : 'text-color-secondary'
                }`}
              >
                {eye}
              </i>
            </div>
          </div>
          {/* Confirm Password */}
          <div className="relative">
            <input
              type={newConfirmPasswordShown ? 'text' : 'password'}
              name="new-confirm-password"
              placeholder={t('ChangePassword.confirm_password')}
              className={`auth-text-box bg-white pr-10 ${
                errors.OldPassword?.type === 'required' && 'ring-2 ring-red-400'
              }`}
              {...register('NewConfirmPassword', {
                required: `${t('Authentication.error-message-en')} ${t(
                  'Authentication.require-new-password',
                )} ${t('Authentication.error-message')}`,
                validate: (value) =>
                  value === password.current ||
                  `${t('Authentication.password-not-match')}`,
              })}
            />
            {errors.NewConfirmPassword && (
              <ErrorMessageBoxValidation
                errorMessage={errors.NewConfirmPassword.message}
              />
            )}
            <div
              className="absolute top-0 right-0 my-3 md:my-2 mx-2.5"
              onClick={toggleNewConfirmPasswordShow}
            >
              <i
                className={`w-5 h-auto ${
                  newConfirmPasswordShown
                    ? 'text-color-default'
                    : 'text-color-secondary'
                }`}
              >
                {eye}
              </i>
            </div>
          </div>

          {/* Validation Message */}
          <div className="space-y-3">
            <p
              className={`tertiary-font ${
                newPasswordLength >= 6
                  ? 'text-color-default'
                  : 'text-color-secondary'
              }`}
            >
              * {t('Authentication.at-least-char-or-number-total-password')}
            </p>
            <p
              className={`tertiary-font ${
                requiredCharacter
                  ? 'text-color-secondary'
                  : 'text-color-default'
              }`}
            >
              * {t('Authentication.at-least-one-char')}
            </p>
            <p
              className={`tertiary-font ${
                requiredNumber ? 'text-color-secondary' : 'text-color-default'
              }`}
            >
              * {t('Authentication.at-least-one-digit')}
            </p>
          </div>

          {/* TermsAndConditions */}
          <div className="mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-6 w-6"
                name="terms-check-box"
                checked={isChecked}
                onChange={clickingOnTermsCheck}
              />
              <p className="primary-font text-color-default font-normal mx-5">
                {t('Authentication.agree-with')} &nbsp;
                <span className="font-semibold">{APP_NAME}</span>
                {t("Authentication.'s")}
                <Link to={TERMS_CONDITION}>
                  <span className="font-medium italic text-color-link">
                    &nbsp; Terms and Privacy Policy &nbsp;
                  </span>
                </Link>
                {t('Authentication.accept')}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`auth-btn bg-custom-primary ${
                isValidation() && 'bg-opacity-40'
              }`}
              disabled={isValidation()}
            >
              {IsLoading ? (
                <AuthLoading />
              ) : (
                <p> {t('ChangePassword.confirm')} </p>
              )}
            </button>
          </div>
        </form>
      </DefaultAuthContainer>
      <SuccessBox
        isOpenBox={isSuccessChanged}
        SuccessMessage={t('Authentication.password-changed-successful')}
        /**
         * action
         */
        cancelBox={() => setIsSuccessChanged(!isSuccessChanged)}
        continueProcess={goTo}
      />
    </>
  )
}

export default ChangePassword
