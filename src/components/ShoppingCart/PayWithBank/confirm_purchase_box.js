import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogBox from '../../CommonComponent/DialogBox/dialog_box'

export const MakePurchaseConfirmBox = ({
  IsOpen,
  /**
   * action
   */
  closeBox,
  confirmPurchase,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <DialogBox isOpen={IsOpen} closeModal={closeBox}>
        <div className="md:w-6/12 w-11/12 mx-auto">
          <div className="default-margin-layout bg-white backdrop-filter backdrop-blur-sm py-8 rounded-lg shadow-lg">
            <div className="default-margin-layout space-y-6">
              <div className="space-y-4">
                <p className="tertiary-font text-center text-color-default">
                  {t('ShoppingCart.warning-order-message')}
                </p>
                <p className="primary-font  text-color-default text-center">
                  {t('ShoppingCart.confirm-order-message')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-2 mx-8 md:mx-0">
                <button
                  className="secondary-btn border-custom-primary border-2 primary-font py-1"
                  onClick={closeBox}
                >
                  {t('Common.not-do')}
                </button>
                <button
                  className="primary-btn bg-custom-primary primary-font py-1"
                  onClick={confirmPurchase}
                >
                  {t('Common.do')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogBox>
    </>
  )
}
