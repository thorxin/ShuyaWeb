/** @format */

import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import { Hook } from './hook'
import DefaultContainer from '../../WrapperComponents/default_auth_container'
import { ErrorMessageBoxValidation } from '../../CommonComponent/error_box'
import AuthenticationLoading from '../../CommonComponent/Loading/auth_loading'
import { goBack } from '../../../util/goToSpecificPathName'

export default function ForgotPassword(props) {
  const [
    isLoading,
    /**
     * action
     */
    onSubmit,
  ] = Hook(props)

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <DefaultContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <p className="sub-heading-font-h3 text-center">
              {t('Authentication.enter-valid-phone-number')}
            </p>
            <input
              type="tel"
              className="auth-text-box"
              placeholder={t('Authentication.fill-phone')}
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
            <button type="submit" className="auth-btn bg-custom-primary">
              {isLoading ? (
                <AuthenticationLoading />
              ) : (
                <p>{t('Authentication.confirm')}</p>
              )}
            </button>
          </div>
        </form>
      </DefaultContainer>
    </>
  )
}
