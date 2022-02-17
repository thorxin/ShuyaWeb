/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { goProductDetails } from '../../../util/goToSpecificPathName'

//components
import moneyFormatter from '../../../util/moneyFormatter'
import PlaceHolderImage from '../../CommonComponent/placeholder_image'

const ProductCard = ({ productData = {} }) => {
  const { t } = useTranslation()
  const history = useHistory()

  let productPriceSection = (
    <p className="primary-font text-color-primary custom-font-bold">
      {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
    </p>
  )
  if (productData.promotePrice > 0)
    productPriceSection = (
      <>
        <p className="primary-font text-color-primary custom-font-bold">
          {moneyFormatter(productData.promotePrice)} {t('Common.kyats')}
        </p>
        <p className=" tertiary-font  text-color-secondary line-through">
          {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
        </p>
      </>
    )

  return (
    <>
      <div
        className="w-32 md:w-full h-auto cursor-pointer mb-2 hover:shadow-md"
        onClick={() => goProductDetails(history, productData.productId, true)}
      >
        <div className="w-full h-auto relative">
          {productData.promotePercent > 0 && (
            <div className="absolute bottom-0 bg-custom-promo-price">
              <p className="caption-font text-color-white px-2">
                {productData.promoteType} {productData.promotePercent}% Off
              </p>
            </div>
          )}
          <img
            src={productData.url}
            className="w-full h-full md:rounded-none rounded-md"
            alt="ProductByCategory"
          />
          {/* <PlaceHolderImage /> */}
        </div>
        <div className="p-2">
          <p className="tertiary-font text-color-default line-clamp-2 custom-font-bold leading-6">
            {productData.name}
          </p>
          {productPriceSection}
        </div>
      </div>
    </>
  )
}

export default ProductCard
