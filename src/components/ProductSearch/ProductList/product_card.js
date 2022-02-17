import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import moneyFormatter from '../../../util/moneyFormatter'
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import { goProductDetails } from '../../../util/goToSpecificPathName'
import WishIconOne from '../../../assets/home/wishlist_no_active.svg'
import ActiveWishIconOne from './../../../assets/home/wishlist_active.svg'

export const ProductCard = ({ Product }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [isFav, setIsFav] = useState(false)

  let costLabel = (
    <div className="flex space-x-2 md:space-x-0">
      <p className="primary-font text-color-primary font-semibold">
        {moneyFormatter(Product.originalPrice)} {t('Common.kyats')}
      </p>
    </div>
  )
  if (Product.promotePercent > 0) {
    costLabel = (
      <div className="flex items-center space-x-2 md:block md:space-x-0">
        <p className="primary-font text-color-primary font-semibold">
          {moneyFormatter(Product.promotePrice)} {t('Common.kyats')}
        </p>
        <p className="tertiary-font text-color-secondary font-medium line-through">
          {moneyFormatter(Product.originalPrice)} {t('Common.kyats')}
        </p>
      </div>
    )
  }

  return (
    <div
      className="flex w-full h-auto space-x-4 md:block md:space-x-0  cursor-pointer group"
      onClick={(e) => {
        e.stopPropagation()
        goProductDetails(history, Product.id)
      }}
    >
      <div className="relative flex flex-shrink-0 w-24 md:w-full h-auto md:border">
        <div className="absolute bottom-0 bg-promote-price-percent">
          {Product.promotePercent > 0 && (
            <p className="caption-font text-color-default px-2">
              {Product.promotePercent}% Off
            </p>
          )}
        </div>
        {/* Buy 1 Get 1  */}
        {Product.isGetOne && (
          <div className="w-20 absolute text-center left-0 top-0">
            <p className="py-1 bg-red-500 text-color-white text-sm">
              Buy 1 Get 1
            </p>
          </div>
        )}
        <div className="overflow-hidden relative">
          {/* Toggle Fav Btn */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsFav(!isFav)
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
          {Product.url ? (
            <img
              src={Product.url}
              className="w-full h-full transform group-hover:scale-110 duration-150"
              alt="ProductImage"
            />
          ) : (
            <div className="transform group-hover:scale-110 duration-150">
              <PlaceHolderImage />
            </div>
          )}
        </div>
      </div>
      <div className="py-3 px-2">
        <p className="primary-font font-semibold line-clamp-2">
          {Product.name}
        </p>
        {costLabel}
      </div>
    </div>
  )
}
