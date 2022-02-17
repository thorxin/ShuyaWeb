/** @format */

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

// img
import ActiveWishIconOne from './../../../assets/productDetail/wish_icon_active_1.svg'
import WishIconOne from '../../../assets/productDetail/wish_icon_1.svg'

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import moneyFormatter from '../../../util/moneyFormatter'
import { goProductDetails } from '../../../util/goToSpecificPathName'

const ProductCard = ({ productData = {}, onClickWishList }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(productData.isFav || false)
  }, [productData?.isFav])

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
        <p className="tertiary-font text-color-secondary line-through">
          {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
        </p>
      </>
    )

  return (
    <div
      className="cursor-pointer group relative"
      onClick={() => goProductDetails(history, productData.productId, true)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsFav(!isFav)
          onClickWishList(productData.productId, isFav)
          // toggleFav(productData.productId, productData.isFav)
        }}
        className="absolute z-10 right-1 top-0 w-6 h-6"
      >
        <img
          src={isFav ? ActiveWishIconOne : WishIconOne}
          className="w-full h-full absolute top-2 right-2 cursor-pointer"
          alt="Wish Icon"
        />
      </button>
      <div className="w-full mx-auto h-auto relative">
        <div className="relative">
          {productData.promotePercent > 0 && (
            <div className="absolute bottom-0 bg-promote-price-percent">
              <p className="caption-font text-color-default px-2">
                {productData.promotePercent}% Off
              </p>
            </div>
          )}
          <div className="overflow-hidden">
            <img
              src={productData.url}
              className="w-full h-auto rounded-xl md:rounded-none transform group-hover:scale-110 duration-150"
              alt="Product"
            />
          </div>
        </div>
        <div className="p-2">
          <p className="primary-font text-color-default line-clamp-2 custom-font-bold">
            {productData.name}
          </p>
          {productPriceSection}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
