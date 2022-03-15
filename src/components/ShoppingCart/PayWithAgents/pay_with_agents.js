/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//images
import LeftArrowImage from '../../../assets/productSearch/left_arrow_image.png'

//components
import { Hook } from './hook'
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb'
import { SubHeadingWithBackArrow } from '../../CommonComponent/SubHeading/sub_heading_with_back_arrow'
import { PaymentAccount } from './PaymentAccount/payment_account'
import PaymentRegistration from './PaymentRegistration/payment_registration'
import { MakePurchaseConfirmBox } from '../PayWithBank/confirm_purchase_box'
import { SuccessOrderBox } from '../CommonUI/success_order_box'
import Loading from '../../CommonComponent/Loading/main_loading'
import FooterWeb from '../../CommonComponent/Footer/web_footer'
import {
  KBZ_AGENT_ID,
  KBZ_AGENT_NAME,
  WAVE_MONEY_AGENT_ID,
  WAVE_MONEY_AGENT_NAME,
} from '../util'

export default function PayWithAgents(props) {
  const [
    isLoading,
    isSecondaryLoading,
    paymentServiceDetail,
    totalAmt,
    netAmt_Again,
    selectedDeliveryInfo,
    uploadedImage,
    imageUploader,
    isImage,
    validateMessage,
    confirmMessageBox,
    setConfirmMessageBox,
    orderId,
    successOrderMessageBox,
    setSuccessOrderMessageBox,
    /**
     * action
     */
    handleImageUpload,
    makePurchase,
    confirmMakePurchase,
  ] = Hook(props)

  const { t } = useTranslation()

  const history = useHistory()

  let agent_name = ''
  switch (paymentServiceDetail?.paymentServiceId) {
    case WAVE_MONEY_AGENT_ID:
      agent_name = WAVE_MONEY_AGENT_NAME
      break
    case KBZ_AGENT_ID:
      agent_name = KBZ_AGENT_NAME
      break
    default:
      break
  }

  if (isLoading) return <Loading />

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-4">
        <NavigationWeb />
        <div className=" mx-auto md:space-y-4">
          <SubHeadingWithBackArrow goTo={() => goBack(history)}>
            <p className="sub-heading-font text-color-default">
              {t('ShoppingCart.pay-with')} {agent_name}{' '}
              {t('ShoppingCart.pay-with-bank')}
            </p>
          </SubHeadingWithBackArrow>
          <div className="default-margin-layout hidden md:block">
            
          </div>
          <div className="default-margin-layout mt-2 md:mt-0 py-20">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => goBack(history)}
            >
                <div className="w-4 h-auto">
                  <img
                    src={LeftArrowImage}
                    className="w-full h-full"
                    alt="Left Arrow"
                  />
                </div>
                <p className="primary-font text-color-default"> Back </p>
            </div>
            <div className="bg-white w-full h-auto min-h-screen py-6 mt-4">
              <div className="mx-4 md:mx-8 space-y-6">
                <PaymentAccount
                  Loading={isSecondaryLoading}
                  ServiceDetail={paymentServiceDetail}
                />
                <PaymentRegistration
                  Loading={isSecondaryLoading}
                  ServiceDetail={paymentServiceDetail}
                  TotalAmount={totalAmt}
                  NetAmount={netAmt_Again}
                  deliveryFee={selectedDeliveryInfo.deliveryFee}
                  ImageUploader={imageUploader}
                  UploadedImage={uploadedImage}
                  IsImage={isImage}
                  ValidateImageMessage={validateMessage}
                  /**
                   * action
                   */
                  HandleImageUpload={handleImageUpload}
                  onSubmit={makePurchase}
                />
              </div>
            </div>
          </div>
        </div>
        <FooterWeb />
      </div>
      <MakePurchaseConfirmBox
        IsOpen={confirmMessageBox}
        closeBox={() => setConfirmMessageBox(false)}
        confirmPurchase={confirmMakePurchase}
      />
      <SuccessOrderBox
        isOpenBox={successOrderMessageBox}
        setIsOpenBox={setSuccessOrderMessageBox}
        OrderId={orderId}
        /**
         * action
         */
        closeBox={() => setSuccessOrderMessageBox(false)}
      />
    </>
  )
}

export const goBack = (history) => {
  history.goBack()
}
