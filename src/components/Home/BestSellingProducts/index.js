/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

import ProductCardHeading from '../CommonUI/productCardHeading'
import ProductCard from './productCard_BestSelling'
import { SEARCH_BEST_SELLING } from '../../../constant/search'
import { goToProductSearchResult } from '../../../util/goToSpecificPathName'

const BestSellingProducts = ({ productArray = [], onClickWishList }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_BEST_SELLING,
    }
    goToProductSearchResult(history, propsData)
  }

  return (
    <>
      <ProductCardHeading
        Heading={t('Home.best-selling')}
        ViewAll={t('Common.view-more')}
        /**
         * action
         */
        onClickViewMore={clickOnViewMore}
        productLength={productArray}
      />
      <div className="bg-white pb-2">
        <div className=" mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-2 md:mx-auto mx-2">
            {Array.isArray(productArray) &&
              productArray
                .slice(0, 6)
                .map((products) => (
                  <ProductCard
                    key={products.productId}
                    productData={products}
                    onClickWishList={onClickWishList}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default BestSellingProducts
