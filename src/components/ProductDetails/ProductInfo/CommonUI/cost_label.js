/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import moneyFormatter from '../../../../util/moneyFormatter'

export const CostLabel = ({
  PromotePercent,
  Price,
  PromotePrice,
  IsGetOne,
}) => {
  const { t } = useTranslation()

  return PromotePercent > 0 ? (
    <div className="flex items-center space-x-3 md:mx-8 mx-4">
      <p className="sub-heading-font-h3 text-xl font-semibold text-color-brown">
        {moneyFormatter(PromotePrice)} {t('Common.kyats')}
      </p>
      <p className="heading-font text-lg text-color-secondary line-through">
        {moneyFormatter(Price)} {t('Common.kyats')}
      </p>
    </div>
  ) : (
    // <p
    //   className={`sub-heading-font text-xl font-semibold  md:mx-8 mx-4 ${
    //     IsGetOne ? 'text-color-yellow' : 'text-color-orange'
    //   }`}
    // >
    //   {moneyFormatter(Price)} {t('Common.kyats')}
    // </p>
    <p className="sub-heading-font text-xl font-semibold  md:mx-8 mx-4 text-color-brown">
      {moneyFormatter(Price)} {t('Common.kyats')}
    </p>
  )
}
