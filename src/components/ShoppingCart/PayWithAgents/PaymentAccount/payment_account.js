import React from 'react'
import { useTranslation } from 'react-i18next'
import { Fragment, useState } from 'react'

//components
import { PaymentAccountFrame } from './payment_account_frame'
import KPaySample from './../../../../assets/Payment/kpay.jpeg'
import CloseIcon from './../../../../assets/common/close_icon.svg'
import DialogBox from './../../../CommonComponent/DialogBox/dialog_box'

export const PaymentAccount = ({ Loading, ServiceDetail }) => {
  const { t } = useTranslation()
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <PaymentAccountFrame loading={Loading} data={ServiceDetail}>
        <div className="w-28 h-auto">
          <img src={ServiceDetail?.url} className="w-full" alt="PaymentImage" />
        </div>
        <div>
          <p className="text-lg  md:text-xl font-semibold">
            {ServiceDetail?.name}
          </p>
          <p className="secondary-font font-medium">
            {ServiceDetail?.holderName}
          </p>
          <p className="secondary-font font-medium">
            {ServiceDetail?.accountNo}
          </p>
        </div>
      </PaymentAccountFrame>
      {/* Sample payment */}
      <div className="space-y-3">
        <p className="text-color-secondary font-medium">
          {t('ShoppingCart.sample-payment')}
        </p>
        <img
          src={KPaySample}
          alt="Sample Payment Slip"
          className="w-20 border rounded-sm shadow-md cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <DialogBox isOpen={isOpen} closeModal={closeModal}>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-white absolute top-5 right-5 ring-0 active:ring-0 outline-none"
        >
          <img className="w-5" src={CloseIcon} alt="Close icon" />
        </button>
        <img
          src={KPaySample}
          alt="Sample Payment Slip"
          className="sm:w-52 md:w-72 w-48 border rounded-sm shadow-md m-auto"
        />
      </DialogBox>
    </>
  )
}
