/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import moneyFormatter from '../../../util/moneyFormatter'
import dateFormatter from '../../../util/dateFormatter'

import {
  PAYMENT_CHECKING,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  ORDERED,
  PACKED,
  DELIVERING,
  DELIVERED,
  DELETED,
} from '../../../constant/order'

//images
import VoucherIcon from '../../../assets/orderHistory/voucher_icon.svg'
import RightArrowIcon from '../../../assets/common/right_arrow_icon.svg'
import Ordered from '../../../assets/notification/success_ordered.svg'
import Packed from '../../../assets/notification/success_packed.svg'
import Transporting from '../../../assets/notification/ready_transported.svg'
import Transported from '../../../assets/notification/success_transported.svg'
import Deleted from '../../../assets/orderHistory/order_status_delete.png'

//components
import goOrderDetail from '../../../util/goOrderDetail'

export default function OrderHistoryItems({ Order }) {
  const { t } = useTranslation()

  const history = useHistory()

  const goDetail = (orderId) => {
    if (orderId) goOrderDetail(history, orderId, true)
  }

  const GetVoucher = (orderId) => {
    if (orderId) {
      history.push({
        pathname: '/voucherprint',
        state: orderId,
      })
    }
  }

  let paymentStatusTextColor
  let paymentStatusText
  switch (Order?.paymentStatusId) {
    case PAYMENT_CHECKING:
      paymentStatusTextColor = 'caption-font text-color-secondary font-medium'
      paymentStatusText = t('OrderHistory.checking')
      break
    case PAYMENT_SUCCESS:
      paymentStatusTextColor = 'caption-font text-color-primary font-medium'
      paymentStatusText = t('OrderHistory.success')
      break
    case PAYMENT_FAIL:
      paymentStatusTextColor = 'caption-font text-color-danger font-medium'
      paymentStatusText = t('OrderHistory.fail')
      break
    default:
      break
  }

  let orderStatusImage
  let orderStatusText
  let orderStatusTextColor
  switch (Order?.orderStatusId) {
    case ORDERED:
      orderStatusImage = Ordered
      orderStatusTextColor = 'caption-font text-color-link font-medium'
      orderStatusText = t('OrderHistory.ordered')
      break
    case PACKED:
      orderStatusImage = Packed
      orderStatusTextColor = 'caption-font text-color-default font-medium'
      orderStatusText = t('OrderHistory.packed')
      break
    case DELIVERING:
      orderStatusImage = Transporting
      orderStatusTextColor = 'caption-font text-color-link font-medium'
      orderStatusText = t('OrderHistory.transporting')
      break
    case DELIVERED:
      orderStatusImage = Transported
      orderStatusTextColor = 'caption-font text-color-default font-medium'
      orderStatusText = t('OrderHistory.transported')
      break
    case DELETED:
      orderStatusImage = Deleted
      orderStatusTextColor = 'caption-font text-color-danger font-medium'
      orderStatusText = t('OrderHistory.deleted')
      break

    default:
      break
  }

  console.log(Order)

  return (
    <div className="flex space-x-2 md:space-x-6">
      <div
        className="w-24 md:w-20 h-auto"
        onClick={() => goDetail(Order.orderId)}
      >
        {Order.productUrl ? (
          <img
            src={Order.productUrl}
            className="w-full h-auto"
            alt="Product Image"
          />
        ) : (
          <PlaceHolderImage />
        )}
      </div>
      <div className="w-full h-auto space-y-2">
        <div className="grid grid-cols-6">
          <div className="col-span-4" onClick={() => goDetail(Order.orderId)}>
            <div className="flex items-center space-x-3">
              <p className="secondary-font">
                {t('OrderHistory.order')} {Order.voucherNo}
              </p>
              <div className="w-2 h-auto">
                <img
                  src={RightArrowIcon}
                  className="w-full h-full"
                  alt="RightArrowIcon"
                />
              </div>
            </div>

            <p className="caption-font text-color-secondary">
              {dateFormatter(Order.orderDate)}
            </p>
          </div>
          <div className="col-span-2" onClick={() => GetVoucher(Order.orderId)}>
            <img
              src={VoucherIcon}
              className="w-5 h-auto float-right"
              alt="VoucherIcons"
            />
          </div>
        </div>
        <div
          className="grid grid-cols-1 gap-y-2 md:grid-cols-7"
          onClick={() => goDetail(Order.orderId)}
        >
          <div className="md:col-span-5">
            <div className="flex space-x-2">
              {/* Payment Status */}
              <div className="bg-gray-100 flex items-center space-x-2 px-2 py-1">
                {Order.paymentServiceImgPath && (
                  <div>
                    <img
                      src={Order.paymentServiceImgPath}
                      className="w-8 md:w-10 h-auto"
                      alt="PaymentServiceImage"
                    />
                  </div>
                )}
                {Order.paymentStatusName && (
                  <p className={paymentStatusTextColor}>{paymentStatusText}</p>
                )}
              </div>
              {/* End Payment Status */}
              {/* Order Status */}
              {Order.orderStatusId > 0 && (
                <div className="bg-gray-100 flex items-center space-x-2 px-2 py-1">
                  <div>
                    <img
                      src={orderStatusImage}
                      className="w-4 h-auto"
                      alt="OrderStatusImage"
                    />
                  </div>
                  <p className={orderStatusTextColor}>{orderStatusText}</p>
                </div>
              )}
              {/* End Order Status */}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 float-right">
              <p className="caption-font font-medium">
                {Order.qty} {t('Common.item')}, {t('Common.total')}
              </p>
              <p className="secondary-font font-medium">
                {moneyFormatter(Order.price)} {t('Common.kyats')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
