/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

//components
import PaymentRegistrationFrame from './payment_registration_frame'
import moneyFormatter from '../../../../util/moneyFormatter'
import { ErrorMessageBoxValidation } from '../../../CommonComponent/error_box'

//images
import SlipPlaceHolderIcon from '../../../../assets/shoppingcart/bank_slip_placeholder.svg'
import WhiteDollarIcon from '../../../../assets/shoppingcart/white_dollar_icon.svg'
import MyanmarFlag from '../../../../assets/common/myanmar_flag.png'

const PaymentRegistration = ({
  Loading,
  ServiceDetail,
  TotalAmount,
  NetAmount,
  deliveryFee,
  ImageUploader,
  UploadedImage,
  IsImage,
  ValidateImageMessage,
  /**
   * action
   */
  HandleImageUpload,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const phNumberIdentifier = /^9([0-9]{7,9}$)/;

  return (
    <>
      <PaymentRegistrationFrame loading={Loading} data={ServiceDetail}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <p className="pl-20 -mb-4 tertiary-font text-color-success">
            9xxxxxxxxx
          </p>
          <div className="flex flex-row">
            <img src={MyanmarFlag} className="w-5 h-4 my-auto" />
            <span className="px-2 my-auto primary-font">+95</span>
            <input
              type="tel"
              className="secondary-text-box tertiary-font py-2 px-3 lg:w-3/5"
              placeholder="9xxxxxxxxx"
              {...register('TransferPhoneNumber', {
                required: `${t('ShoppingCart.require-transfer-phone')}`,
                validate: {
                  phoneValidation: (value) =>
                    (value && phNumberIdentifier.test(value)) ||
                    t('ShoppingCart.validate-phone-format'),
                },
              })}
            />
          </div>
          {errors.TransferPhoneNumber && (
            <ErrorMessageBoxValidation
              errorMessage={errors.TransferPhoneNumber.message}
            />
          )}
          <div>
            <input
              type="file"
              name="File[0]"
              ref={ImageUploader}
              accept="image/*"
              className="hidden relative"
              onChange={HandleImageUpload}
            />
            <div className="pb-2">
              <p className="primary-font text-color-secondary font-medium">
                {t('ShoppingCart.transfer-receipt')}
              </p>
            </div>
            <div
              className="w-32 h-32 md:w-24 md:h-24"
              onClick={() => ImageUploader.current.click()}
            >
              <img
                src={SlipPlaceHolderIcon}
                ref={UploadedImage}
                className="w-32 h-32 md:w-24 md:h-24 object-cover"
                alt="UploadedImage"
              />
            </div>
            {IsImage && (
              <ErrorMessageBoxValidation errorMessage={ValidateImageMessage} />
            )}
          </div>
          <div className="space-y-2">
            <p className="primary-font text-color-secondary font-medium">
              {t('ShoppingCart.notes')}
            </p>
            <div>
              <textarea
                className="tertiary-font resize-y shadow-lg border h-32 py-2 px-3 lg:w-3/5 w-full"
                {...register('Remark')}
              />
            </div>
          </div>
          <div className="flex justify-between lg:w-3/5">
            <p className="primary-font text-color-secondary">
              {t('ShoppingCart.total')}
            </p>
            {isNaN(TotalAmount) ? (
              <p className="sub-heading-font text-color-default">
                {moneyFormatter(NetAmount)} {t('Common.kyats')}
              </p>
            ) : (
              <p className="sub-heading-font text-color-default">
                {moneyFormatter(TotalAmount)} {t('Common.kyats')}
              </p>
            )}
          </div>
          <div className="w-full h-auto">
            <button
              type="submit"
              className="primary-btn primary-font flex justify-center items-center space-x-2 py-3 md:py-2 lg:w-3/5"
            >
              <img
                src={WhiteDollarIcon}
                className="w-3 h-auto"
                alt="WhiteDollarIcon"
              />
              <p>{t('ShoppingCart.make-purchase')}</p>
            </button>
          </div>
        </form>
      </PaymentRegistrationFrame>
    </>
  )
}

export default PaymentRegistration
