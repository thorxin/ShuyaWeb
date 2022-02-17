/** @format */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

//components
import {
  ORDERED,
  PACKED,
  DELIVERING,
  DELIVERED,
  DELETED,
  ORDER_TYPE_COURSE,
  ORDER_TYPE_PRODUCT,
} from '../../../constant/order'

//images
import TrashIcon from '../../../assets/common/trash_icon_white.svg'
//#region - None-Active
import OrderedIcon from '../../../assets/orderDetail/ordered_icon.svg'
import PackedIcon from '../../../assets/orderDetail/packed_icon.svg'
import DeliveringIcon from '../../../assets/orderDetail/delivering_icon.svg'
import DeliveredIcon from '../../../assets/orderDetail/delivered_icon.svg'
//#endregion

//#region - Active
import OrderedActiveIcon from '../../../assets/orderDetail/ordered_active_icon.svg'
import PackedActiveIcon from '../../../assets/orderDetail/packed_active_icon.svg'
import DeliveringActiveIcon from '../../../assets/orderDetail/delivering_active_icon.svg'
import DeliveredActiveIcon from '../../../assets/orderDetail/delivered_active_icon.svg'
//#endregion

export const OrderStatusImage = ({
  image,
  active_image,
  width,
  is_active = false,
  text = '',
  /**
   * action
   */
  click,
}) => {
  return is_active ? (
    <>
      <div className="w-full h-auto cursor-pointer space-y-2" onClick={click}>
        <img
          src={active_image}
          className="w-12 md:w-12 h-auto mx-auto"
          alt="Order Status Icon"
        />
        <p className="caption-font text-center text-color-primary">{text}</p>
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-auto space-y-2">
        <img
          src={image}
          className={`${width ? width : 'w-12 md:w-12'}  h-auto mx-auto`}
          alt="Order Status Icon"
        />
        <p className="caption-font text-center text-color-secondary">{text}</p>
      </div>
    </>
  )
}

const OrderStatus = ({
  Status = {},
  OrderName = '',
  TakeNote = '',
  SendingNote = '',
  SentNote = '',
  status_id = 1,
}) => {
  const { t } = useTranslation()
  let prevent_status = Status.id < 5

  const [orderNoteBox, setOrderNoteBox] = useState({
    id: 0,
    msg: '',
    box: '',
  })
  const [isShowStatusNote, setIsShowStatusNote] = useState(true)

  useEffect(() => {
    if (status_id > ORDERED) {
      let option = null
      switch (Status.id) {
        case PACKED:
          option = {
            id: PACKED,
            msg: TakeNote,
            box: 'left-24 md:left-32',
          }
          break
        case DELIVERING:
          option = {
            id: DELIVERING,
            msg: SendingNote,
            box: 'right-36',
          }
          break
        case DELIVERED:
          option = {
            id: DELIVERED,
            msg: SentNote,
            box: 'right-5',
          }
          break

        default:
          break
      }
      if (option) {
        setOrderNoteBox(option)
      }
    }
  }, [Status.id])

  const clickOnOrderStatus = (id, noteMsg, position) => {
    let option = {
      id: id,
      msg: noteMsg,
      box: position,
    }
    setOrderNoteBox(option)
    setIsShowStatusNote(true)

    if (orderNoteBox.id === id) {
      setIsShowStatusNote(!isShowStatusNote)
    }
  }

  return (
    <>
      {Status.id === 5 ? (
        <div className="w-11/12 h-auto mx-auto">
          <div className="">
            <OrderStatusImage
              image={TrashIcon}
              text={t('OrderDetail.order-deleted')}
              width="w-7"
            />
          </div>
        </div>
      ) : (
        <div className="bg-main-theme-color pt-4 pb-1 md:py-0 space-y-4">
          <div className="w-10/12 md:w-10/12 lg:w-10/12 mx-auto h-auto">
            <div className="grid grid-cols-7">
              <OrderStatusImage
                image={OrderedIcon}
                active_image={OrderedActiveIcon}
                is_active={prevent_status && Status.id >= ORDERED}
                text={t('OrderHistory.ordered')}
              />

              <div className="w-full h-0.5 bg-gray-200 mt-5 md:mt-6" />

              <OrderStatusImage
                image={PackedIcon}
                active_image={PackedActiveIcon}
                is_active={prevent_status && Status.id >= PACKED}
                text={t('OrderHistory.packed')}
                /**
                 * action
                 */
                click={() =>
                  clickOnOrderStatus(PACKED, TakeNote, 'left-24 md:left-32')
                }
              />

              <div className="w-full h-0.5 bg-gray-200 mt-5 md:mt-6" />

              <OrderStatusImage
                image={DeliveringIcon}
                active_image={DeliveringActiveIcon}
                is_active={prevent_status && Status.id >= DELIVERING}
                text={t('OrderHistory.transporting')}
                /**
                 * action
                 */
                click={() =>
                  clickOnOrderStatus(DELIVERING, SendingNote, 'right-36')
                }
              />

              <div className="w-full h-0.5 bg-gray-200 mt-5 md:mt-6" />

              <OrderStatusImage
                image={DeliveredIcon}
                active_image={DeliveredActiveIcon}
                is_active={prevent_status && Status.id >= DELIVERED}
                text={t('OrderHistory.transported')}
                /**
                 * action
                 */
                click={() => clickOnOrderStatus(DELIVERED, SentNote, 'right-5')}
              />
            </div>
          </div>

          {orderNoteBox.msg && isShowStatusNote && Status.id > ORDERED && (
            <>
              <div className="mx-auto h-auto w-10/12 md:w-10/12 lg:w-10/12 relative">
                <div className="grid grid-cols-4">
                  <div />

                  <div>
                    {orderNoteBox.id === PACKED && (
                      <div
                        className={`h-4 w-4 bg-custom-primary rotate-45 transform origin-bottom-left -mb-4 ml-2.5 md:ml-16`}
                      />
                    )}
                  </div>

                  <div>
                    {orderNoteBox.id === DELIVERING && (
                      <div
                        className={`h-4 w-4 bg-custom-primary rotate-45 transform origin-bottom-left -mb-4 ml-8 md:ml-12 lg:ml-24`}
                      />
                    )}
                  </div>

                  <div>
                    {orderNoteBox.id === DELIVERED && (
                      <div
                        className={`h-4 w-4 bg-custom-primary rotate-45 transform origin-bottom-left -mb-4 ml-10 md:ml-32`}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-10/12 md:w-10/12 lg:w-10/12 mx-auto h-auto">
                <div className=" w-auto h-16 bg-custom-primary py-2 px-4">
                  <p className="tertiary-font text-color-white">
                    {orderNoteBox.msg}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )

  return null
}

export default OrderStatus
