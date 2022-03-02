import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

// images
import ActiveLike from '../../../../assets/Images/heart_active.png'

// components
import moneyFormatter from '../../../../util/moneyFormatter'
import { goProductDetails } from '../../../../util/goToSpecificPathName'
import ConfirmationBox from '../../../CommonComponent/DialogBox/confirmation_box'

const Index = ({
  Product = {
    productId: 0,
    url: '',
    name: '',
    originalPrice: 0,
    promotePercent: 0,
    promotePrice: 0,
    fromPrice: 0,
    toPrice: 0,
    hasFromToPrice: false,
  },
  /**
   * action
   */
  RemoveWishList,
}) => {
  const history = useHistory()
  const { t } = useTranslation()

  const [isShowDeleteBox, setIsShowDeleteBox] = useState(false)

  const clickingClear = (e) => {
    e.stopPropagation();
    setIsShowDeleteBox(true)
  }

  const removeWishList = () => {
    RemoveWishList(Product.productId, Product.is_fav)
  }

  let productPriceSection = (
    <p className="primary-font text-color-primary font-semibold">
      {moneyFormatter(Product.originalPrice)} {t('Common.kyats')}
    </p>
  )
  if (Product.promotePercent > 0)
    productPriceSection = (
      <div className="flex space-x-2">
        <p className="primary-font text-color-primary font-semibold ">
          {moneyFormatter(Product.promotePrice)} {t('Common.kyats')}
        </p>
        <p className=" tertiary-font  text-color-secondary line-through font-medium my-auto">
          {moneyFormatter(Product.originalPrice)} {t('Common.kyats')}
        </p>
      </div>
    )

  return (
    <>
      <div
        className="flex space-x-2  mx-4 md:mx-8 mb-2 cursor-pointer"
        onClick={() => goProductDetails(history, Product.productId)}
      >
        <div className="w-20 h-20 flex flex-shrink-0">
          <img
            src={Product.url}
            alt="Product Img"
            onClick={() => goProductDetails(history, Product.productId)}
          />
        </div>
        <div className="flex-grow my-auto pl-2 text-color-default primary-font">
          <div>
            {Product.promotePercent > 0 && (
              <span className="caption-font bg-promote-price-percent w-auto text-color-white px-2">
                {Product.promotePercent}% Off
              </span>
            )}
          </div>
          <span className="font-semibold">{Product.name} </span>
          <br></br>
          {productPriceSection}
        </div>
        <div className="w-16 h-16">
          <img
            src={ActiveLike}
            alt="Heart Logo"
            className="w-5 h-5 mt-5 float-right cursor-pointer"
            onClick={clickingClear}
          />
        </div>
      </div>
      <ConfirmationBox
        isOpenBox={isShowDeleteBox}
        ConfirmationMessage={t('WishList.are-you-sure-to-clear')}
        /**
         * action
         */
        cancelBox={() => setIsShowDeleteBox(false)}
        confirmBox={() => removeWishList()}
      />
    </>
  )
}

export default Index
