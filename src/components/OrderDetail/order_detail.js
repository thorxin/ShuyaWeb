/** @format */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

//images
import BackArrowIcon from '../../assets/common/left_arrow_image.png'
import VoucherIcon from '../../assets/orderHistory/voucher_icon.svg'
import VoucherIconMobile from '../../assets/Images/voucherIcon.png'
import DeleteIcon from '../../assets/Images/delete.svg'
import moment from 'moment'

//components
import {
  dateFormatterYYMMDD,
  dateFormatterOnlyTime,
} from '../../util/dateFormatter'
import Loading from '../CommonComponent/Loading/main_loading'
import { Hook } from './hook'
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
import OrderStatus from './OrderStatus'
import { SubHeadingWithBackArrow } from '../CommonComponent/SubHeading/sub_heading_with_back_arrow'
import OrderItem from './OrderItem'
import DeliverSection from './DeliverySection'
import { AmountLabel } from '../ShoppingCart/Payment/payment_info'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import PaymentRecord from './PaymentRecord'
import ConfirmationBox from '../CommonComponent/DialogBox/confirmation_box'
import SuccessBox from '../CommonComponent/DialogBox/success_box'
import OrderStatusBanner from './OrderStatusBanner'
import PaymentServices from '../ShoppingCart/Payment/payment_service'
import { PaymentServiceBox } from '../ShoppingCart/CommonUI/payment_service_box'
import { DELETED, PAYMENT_FAIL, PAYMENT_SUCCESS } from '../../constant/order'
// import NoteMessaging from "./NoteMessaging";

export default function OrderDetails(props) {
  const [
    isLoading,
    posVoucher,
    OrderDetail,
    LastPayment,
    // deliveryInfo,
    // status,
    willGoBack,
    deliveryAddress,
    // Cancel,
    clickingPayment,
    showPopUP,
    handleClose,
    orderId,
    orderMessageList,
    isShowCancelOrderBox,
    setIsShowCancelOrderBox,
    isShowSuccessOrderBox,
    setIsShowSuccessOrderBox,
    isPaymentServiceBox,
    setIsPaymentServiceBox,
    serviceGatewayArray,
    isShowSuccessCODBox,
    setIsShowSuccessCODBox,
    /**
     * action
     */
    clickingCashOnDelivery,
    goToVoucherPrintPage,
    goToBack,
    clickingCancelOrder,
    confirmCancelOrder,
    clickingOnSuccess,
    // sendOrderNoteMessage,
    onClickServiceGateWay,
    clickingOnPaymentService,
  ] = Hook(props)

  const { t } = useTranslation()
  const [openPayAgain, setOpenPayAgain] = useState(false)
  if (isLoading || !OrderDetail) return <Loading />

  const isShowOrderCancelBtn = () => {
    if(OrderDetail?.orderStatus.id === DELETED){
      return false;
    }else{
      if (LastPayment.paymentStatus.id === PAYMENT_SUCCESS) {
            if(OrderDetail?.orderStatus.id !== 1){
              return false
            }
        }
      return true;
    }
  };

  const chkPayAgain =
  OrderDetail.paymentInfo[OrderDetail.paymentInfo.length - 1].paymentStatus
      .id === PAYMENT_FAIL && !(OrderDetail?.orderStatus.id === DELETED)  

  return (
    <>
      <div className="md:bg-white  bg-gray-200 w-full h-auto min-h-screen md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto md:pt-20">
          <div className="md:w-7/12 w-full mx-auto h-auto md:space-y-5">
            {/* Heading Section - Back Arrow */}
            <div
              className="hidden md:flex space-x-2 items-center cursor-pointer"
              onClick={goToBack}
            >
              <div className="w-3 h-auto">
                <img
                  src={BackArrowIcon}
                  className="w-full h-full"
                  alt="Back Arrow Icon"
                />
              </div>
              <p className="tertiary-font text-color-secondary">
                {t('Common.back')}
              </p>
            </div>
            <SubHeadingWithBackArrow goTo={goToBack}>
              <p className="text-color-default sub-heading-font">
                {t('OrderDetail.order-detail')}
              </p>
            </SubHeadingWithBackArrow>
            {/* End Heading Section - Back Arrow */}

            <OrderStatusBanner
              PaymentStatusId={LastPayment.paymentStatus.id}
              OrderStatusId={OrderDetail?.orderStatus.id}
            />

            <div className=" bg-gray-200 md:bg-white pb-4 md:py-5">
              <div className="md:space-y-6">
                {/* Voucher Number Section */}
                <div className="bg-white pt-4 md:pt-0">
                  <div className="mx-4 md:mx-auto space-y-6">
                    <div className="flex justify-between items-center -mb-4">
                      {/* Vouchern ID & Date for Web */}
                      <p className="sub-heading-font-h3 text-color-default hidden md:block">
                        #{OrderDetail.voucherNo}
                      </p>
                      {/* End Voucher ID & Date for Web */}

                      {/* Vouchern ID & Date for Mobile */}
                      <p className="primary-font block md:hidden">
                        <span className="text-color-default custom-font-bold mr-4">
                          {t('OrderDetail.voucher-no')} :
                        </span>
                        <span className="text-color-default">
                          {OrderDetail.voucherNo}
                        </span>
                      </p>
                      {/* End Voucher ID & Date for Mobile */}

                      {OrderDetail?.orderStatus.id !== DELETED && 
                        <div className="w-5 h-auto hidden md:block">
                            <img
                              src={VoucherIcon}
                              className='w-full h-full cursor-pointer'
                              alt='Voucher Icon'
                              onClick={goToVoucherPrintPage}
                            />
                        </div>
                        }
                    </div>
                    {/* Date For Web */}
                    <div className="hidden md:block">
                      <p className="primary-font md:pb-0 pb-4 text-color-secondary custom-font-bold">
                        {dateFormatterYYMMDD(OrderDetail.orderDate)} at &nbsp;
                        {dateFormatterOnlyTime(OrderDetail.orderDate)}
                      </p>
                    </div>
                    {/* End Date for Web */}
                    {/* Date For Mobile */}
                    <div className="block md:hidden">
                      <p className="primary-font md:pb-0 pb-4 ">
                        <span className="text-color-default custom-font-bold mr-10">
                          {t('AddFixed.order-date')} :
                        </span>
                        <span className="text-color-default">
                          {dateFormatterYYMMDD(OrderDetail.orderDate)}
                        </span>
                      </p>
                    </div>
                    {/* End Date for Mobile */}
                    {/* <div className="w-full h-0.5 bg-gray-200 block md:hidden" /> */}
                  </div>
                </div>
                {/* End Voucher Number Section */}
                {/* Order Status */}
                <OrderStatus
                  Status={OrderDetail?.orderStatus}
                  OrderName={OrderDetail?.orderName}
                  TakeNote={OrderDetail.takeNote}
                  SendingNote={OrderDetail.sendingNote}
                  SentNote={OrderDetail.sentNote}
                  status_id={OrderDetail?.orderStatus.id}
                  cancelNote={OrderDetail?.cancelNote}
                />
                {/* End Order Status */}
                <div className="grid grid-cols-1 md:grid-cols-8">
                  <div className="col-span-5 md:space-y-6">
                    {/* Order Item For Mobile*/}
                    <div className="block md:hidden">
                      <OrderItem itemList={OrderDetail?.orderItem} />
                    </div>
                    {/* End Order Item */}

                    {/* Deliver Section */}
                    <DeliverSection DeliveryInfo={OrderDetail.deliveryInfo} />
                    <div className=" h-0.5 bg-gray-200 hidden md:block" />
                    {/* End Deliver Section */}

                    {/* Order Item For Web*/}
                    <div className="hidden md:block">
                      <OrderItem
                        itemList={OrderDetail?.orderItem}
                        DiscountPrice={OrderDetail.deliveryInfo.discountPrice}
                      />
                    </div>
                    {/* End Order Item  */}
                    <div className=" h-0.5 bg-gray-200 hidden md:block" />
                  </div>

                  {/* Note Messaging */}
                  <div className="col-span-3">
                    {/* <NoteMessaging
                      OrderId={orderId}
                      MessageList={orderMessageList}
                      
                      SendOrderMessage={sendOrderNoteMessage}
                    /> */}
                  </div>
                  {/* End Note Messaging */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-8">
                  <div className="col-span-5 md:space-y-6">
                    {/* Payment Record */}
                    <PaymentRecord PaymentInfo={OrderDetail.paymentInfo} />
                    {/* End Payment Record */}

                    <div className="w-11/12 mx-auto h-0.5 bg-gray-200" />
                    {/* Start Pay Again  */}
                      {
                      OrderDetail.cancelNote == '' &&
                        <>
                          <div
                            className={`${
                              openPayAgain || !chkPayAgain ? 'hidden' : 'block'
                            } bg-white py-4 md:py-0`}
                          >
                            <div className='w-full mx-auto'>
                              <button
                                className='tertiary-font w-full h-auto text-color-white bg-custom-primary py-3 rounded-md'
                                onClick={() => setOpenPayAgain(true)}
                              >
                                {t('OrderDetail.pay-again')}
                              </button>
                            </div>
                          </div>
                          <div className='bg-white'>
                            <div
                              className={` ${
                                openPayAgain ? 'block pt-3 pb-5' : 'hidden'
                              } w-full mx-auto`}
                            >
                              <div className='md:-mt-2.5'>
                                <p className='primary-font text-color-default'>
                                  {t('ShoppingCart.select-payment-option')}
                                </p>
                              </div>
                              <div className='grid grid-cols-12 gap-x-2 gap-y-3 mt-4'>
                                {OrderDetail.newPaymentService.length > 0 &&
                                  OrderDetail.newPaymentService.map((service) => (
                                    <PaymentServices
                                      key={service.id}
                                      Services={service}
                                      isPayAgain={true}
                                      /**
                                       * action
                                       */
                                      onClickPayment={clickingOnPaymentService}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* End Pay Again  */}
                          {chkPayAgain && (
                            <div className='w-11/12 mx-auto h-0.5 bg-gray-200' />
                          )}
                        </>
                      }
                    {/* Amount Info */}
                    <div className="bg-white py-4 md:py-0">
                      <div className="mx-4 md:mx-auto  grid grid-cols-2 gap-y-3">
                        <AmountLabel
                          Label={t('ShoppingCart.delivery-time')}
                          Amount={`${
                            OrderDetail?.deliveryInfo?.deliveryService
                              .fromEstDeliveryDay || '2'
                          } ${t('Common.day')} - ${
                            OrderDetail?.deliveryInfo?.deliveryService
                              .toEstDeliveryDay || '5'
                          } ${t('Common.day')}`}
                        />
                        <AmountLabel
                          Label={t("ShoppingCart.sub-total")}
                          Amount={OrderDetail.totalAmt}
                          currency={t("Common.kyats")}
                        />
                        <AmountLabel
                          Label={t('ShoppingCart.delivery-fee')}
                          Amount={
                            OrderDetail.deliveryFee > 0
                              ? OrderDetail.deliveryFee
                              : 2000
                          }
                          currency={t('Common.kyats')}
                        />
                        {/* <AmountLabel
                          Label={t("ShoppingCart.discount")}
                          Amount={"-"}
                          currency={t("Common.kyats")}
                        />
                        <AmountLabel
                          Label={t("ShoppingCart.commarcial-tax")}
                          Amount={"-"}
                          currency={t("Common.kyats")}
                        /> */}
                        <AmountLabel
                          Label={t('ShoppingCart.total')}
                          Amount={
                            OrderDetail.totalAmt + OrderDetail.deliveryFee
                          }
                          currency={t('Common.kyats')}
                          color={'text-color-primary'}
                        />
                      </div>
                    </div>
                    {/* End Amount Info */}

                    {/* Button Group - GetVoucher and Cancel Order */}
                    <div className="bg-white pb-4 md:py-0 cursor-pointer">
                      <div className="mx-4 md:mx-auto  space-y-4">
                        {OrderDetail?.orderStatus.id !== DELETED && 
                          <div className=''>
                            <div
                                className='primary-btn bg-custom-primary rounded-md py-3 flex justify-center'
                                onClick={goToVoucherPrintPage}
                              >
                                <img
                                  src={VoucherIconMobile}
                                  className='w-5 h-full cursor-pointer mr-2 '
                                  alt='Voucher Icon'
                                />
                                <p className=' my-auto'>
                                  {t('OrderDetail.get-voucher')}
                                </p>
                              </div>
                          </div>
                        }
                        {isShowOrderCancelBtn() && (
                          <div>
                            <div
                              className="tertiary-font w-full h-auto text-color-danger bg-gray-200 py-3 rounded-md flex justify-center"
                              onClick={clickingCancelOrder}
                            >
                              <img
                                src={DeleteIcon}
                                className="w-5 h-full cursor-pointer mr-2 "
                                alt="Voucher Icon"
                              />
                              <p className="my-auto">
                                {t('OrderDetail.cancel-order')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* End Button Group */}
                  </div>
                  <div className="col-span-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterWeb />
      </div>
      <ConfirmationBox
        isOpenBox={isShowCancelOrderBox}
        ConfirmationMessage={t('OrderDetail.are-you-sure-to-cancel-order')}
        /**
         * action
         */
        cancelBox={() => setIsShowCancelOrderBox(false)}
        confirmBox={confirmCancelOrder}
      />
      <SuccessBox
        isOpenBox={isShowSuccessOrderBox}
        SuccessMessage={t('OrderDetail.success-cancel-order')}
        /**
         * action
         */
        cancelBox={() => setIsShowSuccessOrderBox(false)}
        continueProcess={clickingOnSuccess}
      />
      {/* Cash on delivery  */}
      <SuccessBox
        isOpenBox={isShowSuccessCODBox}
        SuccessMessage={t('OrderDetail.payment-success')}
        /**
         * action
         */
        cancelBox={() => setIsShowSuccessCODBox(false)}
        continueProcess={clickingOnSuccess}
      />
      <PaymentServiceBox
        isOpenBox={isPaymentServiceBox}
        GateWay={serviceGatewayArray}
        /**
         * action
         */
        closeBox={() => setIsPaymentServiceBox(false)}
        clickServiceGateWay={onClickServiceGateWay}
      />
    </>
  )
}
