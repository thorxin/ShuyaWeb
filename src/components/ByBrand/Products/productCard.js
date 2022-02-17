import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import moneyFormatter from '../../../util/moneyFormatter'
import { goProductDetails } from '../../../util/goToSpecificPathName'

const ProductCard = ({ productData = {} }) => {
  const { t } = useTranslation()
  const history = useHistory()

  let productPriceSection = (
    <p className="primary-font text-color-orange custom-font-bold">
      {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
    </p>
  )
  if (productData.promotePrice > 0)
    productPriceSection = (
      <>
        <p className="primary-font text-color-orange custom-font-bold">
          {moneyFormatter(productData.promotePrice)} {t('Common.kyats')}
        </p>
        <p className="tertiary-font text-color-secondary line-through">
          {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
        </p>
      </>
    )

  return (
    <div
      className="cursor-pointer group"
      onClick={() => goProductDetails(history, productData.productId, true)}
    >
      <div className="w-full mx-auto h-auto relative">
        <div className="relative">
          {productData.promotePercent > 0 && (
            <div className="absolute top-0 bg-promote-price-percent">
              <p className="caption-font text-color-white px-2">
                {productData.promotePercent}% Off
              </p>
            </div>
          )}
          <div className="overflow-hidden">
            <img
              src={productData.url}
              className="w-full h-auto border-2 group-hover:scale-110 transform duration-150"
              alt="Product"
            />
          </div>
        </div>
        <div className="mx-0 bg-white md:p-2 md:h-28">
          <p className="primary-font text-color-default custom-font-bold line-clamp-2">
            {productData.name}
          </p>
          {productPriceSection}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
