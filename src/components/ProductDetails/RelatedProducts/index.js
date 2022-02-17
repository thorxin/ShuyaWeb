/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import ProductCartHeading from '../Common/ProductCartHeading'
import ProductCart from '../Common/ProductCart'
import { SEARCH_CATEGORY } from '../../../constant/search'
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName'
import { PRODUCT_SEARCH_RESULT } from '../../../constant/locationPathName'

const RelatedProducts = ({
  ProductListArray = [],
  Category = {},
  clickOnWishList,
}) => {
  const { t } = useTranslation()
  const history = useHistory()

  const goToProductResultList = () => {
    let propsState = {
      searchType: SEARCH_CATEGORY,
      categoryId: Category.productCategoryId,
      categoryName: Category.productCategoryName,
    }
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState)
  }

  return (
    <div className="py-4 mb-12">
      <div className=" mx-auto">
        <div className="default-margin-layout space-y-4">
          <div className="w-11/12 md:w-full h-auto mx-auto space-y-4">
            <ProductCartHeading
              HeadingName={t('ProductDetails.related-products')}
              ViewMore={t('Common.view-more')}
              TextColor_HeadingName="text-color-default font-bold"
              TextColor_ViewMore="text-color-secondary"
              /**
               * action
               */
              onClickViewMore={goToProductResultList}
              productLength={ProductListArray}
            />
            <div className="overflow-x-auto hide-scroll-bar md:overflow-hidden">
              <div className="inline-flex md:grid md:grid-cols-4 gap-x-4">
                {ProductListArray.length > 0 &&
                  ProductListArray.slice(0, 4).map((product) => (
                    <ProductCart
                      key={product.productId}
                      ProductId={product.productId}
                      Product={product}
                      TextColor_ProductName="text-color-default"
                      TextColor_Price_1="text-color-primary"
                      TextColor_Price_2="text-color-secondary"
                      clickOnWishList={clickOnWishList}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
