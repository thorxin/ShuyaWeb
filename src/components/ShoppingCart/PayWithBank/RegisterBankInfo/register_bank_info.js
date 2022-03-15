/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

//images
import WhiteDollarIcon from '../../../../assets/shoppingcart/white_dollar_icon.svg';
import SlipPlaceHolderIcon from '../../../../assets/shoppingcart/bank_slip_placeholder.svg';

//components
import { APP_NAME } from '../../../../constant/appName';
import { RegisterBankInfoFrame } from './register_bank_info_frame';
import { ErrorMessageBoxValidation } from '../../../CommonComponent/error_box';
import moneyFormatter from '../../../../util/moneyFormatter';
import { AmountLabel } from '../../Payment/payment_info';

export const RegisterBankInfo = ({
  IsLoading,
  BankListArray = [],
  SelectedBank,
  UploadedImage,
  ImageUploader,
  TotalAmount,
  NetAmount,
  deliveryFee,
  ValidateImageMessage,
  IsImage,
  /**
   * action
   */
  HandleImageUpload,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <RegisterBankInfoFrame data={BankListArray} loading={IsLoading}>
        <div>
          <p className='primary-font font-medium text-color-default'>
            {APP_NAME} {t("Common.'s")} {SelectedBank?.name}{' '}
            {t('ShoppingCart.bank-account')}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-y-2'>
          <p className='tertiary-font text-color-secondary'>
            {t('ShoppingCart.bank-account-number')} :
          </p>
          <p className='primary-font text-color-default text-right'>
            {SelectedBank?.accountNo}
          </p>
          <p className='tertiary-font text-color-secondary'>
            {t('ShoppingCart.bank-account-name')} :
          </p>
          <p className='primary-font text-color-default text-right'>
            {SelectedBank?.holderName}
          </p>
        </div>
        <div>
          <input
            type='number'
            placeholder={t('ShoppingCart.your-bank-account-number')}
            className='secondary-text-box tertiary-font py-2 px-3'
            {...register('BankAccountNumber', {
              required: `${t('ShoppingCart.require-bank-account-number')}`,
            })}
          />
          {errors.BankAccountNumber && (
            <ErrorMessageBoxValidation
              errorMessage={errors.BankAccountNumber.message}
            />
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <input
              type='file'
              name='File[0]'
              ref={ImageUploader}
              accept='image/*'
              className='hidden relative'
              onChange={HandleImageUpload}
            />
            <div
              className='w-32 h-32 md:w-24 md:h-24'
              onClick={() => ImageUploader.current.click()}
            >
              <img
                src={SlipPlaceHolderIcon}
                ref={UploadedImage}
                className='w-32 h-32 md:w-24 md:h-24 object-cover'
                alt='UploadedImage'
              />
            </div>
            {IsImage && (
              <ErrorMessageBoxValidation errorMessage={ValidateImageMessage} />
            )}
          </div>
          <div className='space-y-2'>
            <p className='secondary-font font-medium text-color-secondary'>
              {t('ShoppingCart.notes')}
            </p>
            <div>
              <textarea
                className='tertiary-font text-color-default resize-y shadow-lg border w-full h-32 py-2 px-3'
                {...register('Remark')}
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='primary-font text-color-secondary'>
              {t('ShoppingCart.total')}
            </p>
            
            {(isNaN(TotalAmount) ) ? 
            <p className='text-md text-color-default'>
              {moneyFormatter(NetAmount)} {t('Common.kyats')}
            </p>:
            <p className='text-md text-color-default'>
              {moneyFormatter(TotalAmount)} {t('Common.kyats')}
            </p>
            }
            
          </div>
          <div className='w-full h-auto'>
            <button
              type='submit'
              className='primary-btn primary-font flex justify-center items-center space-x-2 py-3 md:py-2'
            >
              <img
                src={WhiteDollarIcon}
                className='w-3 h-auto'
                alt='WhiteDollarIcon'
              />
              <p>{t('ShoppingCart.make-purchase')}</p>
            </button>
          </div>
        </form>
      </RegisterBankInfoFrame>
    </>
  );
};
