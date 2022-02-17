/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import PaymentInfo from './payment_info'
import PaymentServices from './payment_service'

//images
import DollarSign from '../../../assets/shoppingcart/dollarSign.jpg'

const Payment = ({
  DeliveryInfo,
  DeliveryInfoNoDelivery,
  TotalAmount,
  NetAmount,
  DeliveryFee,
  CommercialTax,
  Discount,
  PaymentService = [],
  /**
   * action
   */
  clickingPayment,
}) => {
  const { t } = useTranslation()
  if (DeliveryInfo?.mainDeliveryService) {
    return (
      <>
        <div className="bg-white py-3 md:py-4">
          <div className="mx-4 md:mx-8 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 md:w-5 h-auto">
                <img
                  src={DollarSign}
                  className="w-full h-full"
                  alt="DollarIcon"
                />
              </div>
              <p className="text-lg custom-font-bold text-color-default">
                {t('ShoppingCart.payment-service')}
              </p>
            </div>
            <PaymentInfo
              FromDeliveryDay={DeliveryInfo?.fromEstDeliveryDay}
              ToDeliveryDay={DeliveryInfo?.toEstDeliveryDay}
              TotalAmt={parseInt(NetAmount) + DeliveryInfo?.deliveryFee}
              SubAmt={TotalAmount}
              DeliveryFee={DeliveryFee}
              CommercialTax={CommercialTax}
              Discount={Discount}
            />
            <div className="w-full h-1 bg-gray-200" />
            <div>
              {/* <p className='primary-font text-color-default'>{DeliveryInfoNoDelivery.deliveryFee}</p> */}
              <p className="primary-font text-color-default">
                {t('ShoppingCart.select-payment-option')}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-x-2 gap-y-3">
              {PaymentService.length > 0 &&
                PaymentService.map((service) => (
                  <PaymentServices
                    key={service.id}
                    Services={service}
                    /**
                     * action
                     */
                    onClickPayment={clickingPayment}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-white py-3 md:py-4">
        <div className="mx-4 md:mx-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 md:w-5 h-auto">
              <img
                src={DollarSign}
                className="w-full h-full"
                alt="DollarIcon"
              />
            </div>
            <p className="sub-heading-font text-color-default">
              {t('ShoppingCart.payment-service')}
            </p>
          </div>
          <PaymentInfo
            FromDeliveryDay={DeliveryInfo?.deliveryInfo?.fromEstDeliveryDay}
            ToDeliveryDay={DeliveryInfo?.deliveryInfo?.toEstDeliveryDay}
            TotalAmt={DeliveryInfoNoDelivery.netAmt}
            SubAmt={TotalAmount}
            DeliveryFee={DeliveryInfoNoDelivery.deliveryFee}
            CommercialTax={CommercialTax}
            Discount={Discount}
          />
          <div className="w-full h-1 bg-gray-200" />
          <div>
            <p className="primary-font text-color-default">
              {t('ShoppingCart.select-payment-option')}
            </p>
          </div>
          <div className="grid grid-cols-12 gap-x-2 gap-y-3">
            {PaymentService.length > 0 &&
              PaymentService.map((service) => (
                <PaymentServices
                  key={service.id}
                  Services={service}
                  /**
                   * action
                   */
                  onClickPayment={clickingPayment}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
