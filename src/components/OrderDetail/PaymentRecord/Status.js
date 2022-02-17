/** @format */

import React, { useState } from 'react'

import waveMoney from '../../../assets/Images/waveMoney.png'
import bankIcon from '../../../assets/Images/bankIcon.png'

import { dateFormatterYYMMDD } from '../../../util/dateFormatter'
import { useTranslation } from 'react-i18next'
import RowLabel from './RowLabel'
import OrderDetails from '../order_detail'
import {
  PAYMENT_CHECKING,
  PAYMENT_FAIL,
  PAYMENT_SUCCESS,
} from '../../../constant/order'
import DialogBox from '../../CommonComponent/DialogBox/dialog_box'
import ProductImageDialogBox from './imageDialogBox'

const Status = ({ Info = {}, Service = {}, Status = {} }) => {
  const { t } = useTranslation()
  const [isMoreDetail, setIsMoreDetail] = useState(false)
  const [isImageOpenVariantBox, setIsImageOpenVariantBox] = useState(false)

  const openImageVariantBox = () => {
    setIsImageOpenVariantBox(!isImageOpenVariantBox)
  }

  let payment_status_name = ''
  let color = 'text-color-primary custom-font-bold'
  switch (Status.id) {
    case PAYMENT_CHECKING:
      payment_status_name = t('OrderDetail.payment-status-check')
      break
    case PAYMENT_SUCCESS:
      payment_status_name = t('OrderDetail.payment-status-success')
      color = 'text-color-primary'
      break
    case PAYMENT_FAIL:
      payment_status_name = t('OrderDetail.payment-status-fail')
      color = 'text-color-danger'
      break
    default:
      break
  }

  if (Service.name === 'အိမ်အရောက်')
    return (
      <div className="flex justify-start tertiary-font text-color-default">
        {t('AddFixed.cash-on-delivery')}
      </div>
    )

  return (
    <>
      {/* <div className="h-0.5  bg-gray-300 block md:hidden mb-3"></div> */}
      <div className="flex space-x-4">
        <div>
          <div className="w-20 h-auto">
            <img
              src={Service.imgPath}
              className="w-full h-full cursor-pointer"
              alt="Payment ServiceImage"
            />
          </div>
        </div>
        <div className="w-full md:w-7/12 h-auto space-y-3">
          <RowLabel
            label={t('OrderDetail.payment-platform')}
            value={Service.bankName ? Service.bankName : Service.name}
          />
          <RowLabel label={t('OrderDetail.account-no')} value={Info.phoneNo} />
          {isMoreDetail && (
            <>
              <RowLabel
                label={t('OrderDetail.date')}
                value={dateFormatterYYMMDD(Info.transactionDate)}
              />
              <RowLabel
                label={t('OrderDetail.payment-status')}
                value={payment_status_name}
                text_color={color}
              />
              {Info.remark && (
                <div className="w-full h-auto bg-gray-100 py-3 px-4 rounded-md">
                  <p className="tertiary-font text-color-default">
                    {Info.remark}
                  </p>
                </div>
              )}
              {Info.approveImg && (
                <div className="w-20 h-auto" onClick={openImageVariantBox}>
                  <img
                    src={Info.approveImg}
                    className="w-full h-full cursor-pointer"
                    alt="Payment ApprovedImage"
                  />
                </div>
              )}
              {Info.sellerRemark && (
                <div>
                  <p>
                    <span className="text-md font-bold text-color-danger">
                      {Status.id !== PAYMENT_SUCCESS ? 'Rejected' : 'Accepted'}
                    </span>{' '}
                    by{' '}
                    {Status.id !== PAYMENT_SUCCESS
                      ? Info.rejectedBy
                      : Info.approvedBy}
                  </p>
                  <div className="w-full h-auto bg-gray-100 py-3 px-4 rounded-md">
                    <p className="tertiary-font text-color-default">
                      {Info.sellerRemark}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          <p
            className="caption-font text-color-link cursor-pointer"
            onClick={() => setIsMoreDetail(!isMoreDetail)}
          >
            {isMoreDetail ? t('Common.less-more') : t('Common.view-more')}
          </p>
        </div>
        {/*  */}
      </div>
      <DialogBox
        isOpen={isImageOpenVariantBox}
        closeModal={openImageVariantBox}
      >
        <ProductImageDialogBox
          PaymentImage={Info.approveImg}
          closeVariantBox={() => setIsImageOpenVariantBox(false)}
        />
      </DialogBox>
    </>
  )
}

export default Status
