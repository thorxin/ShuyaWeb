import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

//components
import Status from './Status'
import HeadingLayout from '../CommonUI/heading_layout'

const PaymentRecord = ({
  PaymentInfo = [],
  phoneNumber = '',
  orderInfo = {},
  ClickingPayment,
  orderByCashOnDelivery,
}) => {
  const { t } = useTranslation()
  const [isMorePaymentHistory, setIsMorePaymentHistory] = useState(true)

  if (PaymentInfo.length > 0)
    return (
      <>
        <div className="bg-white mt-2 md:mt-0 pt-3 pb-2 md:py-0">
          <div className="mx-4 md:mx-0  space-y-4">
            <HeadingLayout
              HeadingText={t('OrderDetail.payment-history')}
              isShow={isMorePaymentHistory}
              /**
               * action
               */
              clickOnArrowIcon={() =>
                setIsMorePaymentHistory(!isMorePaymentHistory)
              }
            />
            {isMorePaymentHistory &&
              PaymentInfo.map((info, index) => (
                <Status
                  key={index}
                  Info={info}
                  Service={info.paymentService}
                  Status={info.paymentStatus}
                />
              ))}
          </div>
        </div>
      </>
    )

  return null
}

export default PaymentRecord
