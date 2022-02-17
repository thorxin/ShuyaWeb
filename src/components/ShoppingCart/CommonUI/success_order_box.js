import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'

//components
import DialogBox from '../../CommonComponent/DialogBox/dialog_box'
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName'
import { ORDER_DETAIL } from '../../../constant/locationPathName'

export const SuccessOrderBox = ({
  isOpenBox,
  setIsOpenBox,
  OrderId,
  /**
   * action
   */
  closeBox,
}) => {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const path = location.pathname.toLowerCase()

  const continueProcess = () => {
    if (!OrderId) return
    setIsOpenBox(false)
    goToSpecificPathNameWithData(history, ORDER_DETAIL, OrderId)
  }

  return (
    <DialogBox isOpen={isOpenBox} closeModal={closeBox}>
      <div className="w-10/12 h-auto max-w-sm mx-auto bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-sm py-10">
        <div className="space-y-10 px-4">
          <p className=" tertiary-font text-color-default text-center">
            {t('ShoppingCart.order-success')}
          </p>
          <div className="w-full h-auto mx-auto">
            <button
              className="primary-btn tertiary-font py-2"
              onClick={continueProcess}
            >
              {path === '/shoppingcart' ? 'Okay' : t('Common.do')}
            </button>
          </div>
        </div>
      </div>
    </DialogBox>
  )
}
