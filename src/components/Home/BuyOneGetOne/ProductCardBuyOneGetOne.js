/** @format */

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import moneyFormatter from '../../../util/moneyFormatter'
import { goProductDetails } from '../../../util/goToSpecificPathName'
import WishIconOne from '../../../assets/home/wishlist_active.svg'
import NoActiveWishIconOne from './../../../assets/home/wishlist_no_active.svg'

const ProductCardBuyOneGetOne = ({ productData = {}, onClickWishList }) => {
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
        <p className="tertiary-font text-color-default line-through">
          {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
        </p>
      </>
    )

  return (
    <div
      className="cursor-pointer relative flex flex-shrink-0 mb-1 group"
      onClick={(e) => {
        e.stopPropagation()
        goProductDetails(history, productData.productId, true)
      }}
    >
      {/* Toggle Fav Btn */}
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
          src={isFav ? WishIconOne : NoActiveWishIconOne}
          className="w-full h-full absolute top-2 right-2 cursor-pointer"
          alt="Wish Icon"
        />
      </button>
      <div className="w-48 md:w-full mx-auto h-auto relative">
        <div className="relative">
          <div className="absolute bottom-0 bg-promote-price-percent z-40">
            <p className="caption-font text-color-white px-2">Buy 1 Get 1</p>
          </div>
          <div className="overflow-hidden rounded-t-md">
            {productData.url ? (
              <img
                src={productData.url}
                className=" w-full h-auto md:w-full md:h-auto md:rounded-none transform group-hover:scale-110 duration-150"
                alt="Product"
              />
            ) : (
              <div className="w-full h-auto md:h-auto rounded-xl">
                <div className="transform group-hover:scale-110 duration-150">
                  <PlaceHolderImage />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-b-md w-full  md:p-2 px-2 pt-2">
          <p className="primary-font text-color-default custom-font-bold line-clamp-2">
            {productData.name}
          </p>
          {productPriceSection}
        </div>
        {/* Buy 1 Get 1  */}
        {/* <div className="w-20 absolute text-center left-0 top-0">
          <p className="py-1 bg-red-500 text-color-white text-sm">Buy 1 Get 1</p>
        </div> */}
      </div>
    </div>
  )
}

export default ProductCardBuyOneGetOne
