/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { SEARCH_CATEGORY } from '../../../constant/search'
import { goToProductSearchResult } from '../../../util/goToSpecificPathName'

//images
import ViewMore from '../../../assets/home/seemore.png'

import ProductCardHeading_Mobile from './ProductCardHeading_Mobile'
import ProductCard_Category_Mobile from './ProductCard_Category_Mobile'

const ProductListByCategoryMobile = ({
  category = {},
  productList = [],
  i,
  length,
  onClickWishList,
}) => {
  const { t } = useTranslation()
  const history = useHistory()

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_CATEGORY,
      categoryId: category.id,
      categoryName: category.name,
    }
    goToProductSearchResult(history, propsData)
  }

  return (
    <div className="md:mb-2">
      <ProductCardHeading_Mobile
        Url={category.url}
        Heading={category.name}
        ViewAll={t('Common.view-more')}
        /**
         * action
         */
        onClickViewMore={clickOnViewMore}
        productLength={productList}
      />
      {/* <div className="bg-white pb-2 px-2 md:px-0">
        <div className=" overflow-x-auto">
          <div className="inline-flex md:grid md:grid-cols-6 space-x-4 md:space-x-0 md:gap-x-2">
            {Array.isArray(productList) &&
              productList.slice(0, 6).map((product) => (
                <ProductCard key={product.productId} productData={product} />
              ))}
          </div>
        </div>
      </div>
       <div className="h-1  bg-gray-300 block md:hidden"></div>
    </div> */}
      <div className="bg-gray-100 md:bg-white pb-2 md:pb-0">
        <div className=" pb-4 px-2 md:pb-4 md:mt-1 relative">
          {/* divider */}

          {/* {i !== length - 1 && (
            <div className='h-1 bg-gray-100 w-full absolute top-full hidden md:block left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
          )} */}

          <div className=" overflow-x-auto pb-2 md:pb-0 hide-scroll-bar">
            <div className="inline-flex md:grid md:grid-cols-4 space-x-4 md:space-x-0 md:gap-x-4">
              {Array.isArray(productList) &&
                productList
                  .slice(0, 6)
                  .map((product, i) => (
                    <ProductCard_Category_Mobile
                      key={product.productId}
                      productData={product}
                      onClickWishList={onClickWishList}
                    />
                  ))}
            </div>
          </div>
        </div>
        <div
          className="mx-2 -mt-2 py-2 bg-white rounded-full text-center flex justify-center block md:hidden"
          onClick={clickOnViewMore}
        >
          <img src={ViewMore} className="w-4 h-4 my-auto ml-2" />
          <p className="primary-font text-color-default ml-2 my-auto">
            {t('AddFixed.view-more')}
          </p>
        </div>
      </div>
      {productList.length - 1 !== i && (
        <div className="h-1  bg-gray-300 block md:hidden"></div>
      )}
    </div>
  )
}

export default ProductListByCategoryMobile
