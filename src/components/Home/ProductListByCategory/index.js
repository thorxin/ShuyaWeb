/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { SEARCH_CATEGORY } from '../../../constant/search'
import { goToProductSearchResult } from '../../../util/goToSpecificPathName'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

import ProductCardHeading from './productCardHeading'
import ProductCard from './productCard_Category'

const ProductListByCategory = ({ categories = [] }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const clickOnViewMore = (id, name) => {
    let propsData = {
      searchType: SEARCH_CATEGORY,
      categoryId: id,
      categoryName: name,
    }
    goToProductSearchResult(history, propsData)
  }

  return (
    <div className="mb-2 mt-10">
      {/* slelected product by category */}
      <Tab.Group>
        <div className="space-x-3 overflow-x-auto flex hide-scroll-bar md:px-0 px-2">
          <Tab.List className="inline-flex space-x-6">
            {categories.length > 0 &&
              categories.slice(0, 3).map((category) => (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      key={category.id}
                      className={`flex md:w-92 items-center space-x-2 ${
                        selected ? 'border-b-2 border-custom-primary' : ''
                      }`}
                    >
                      <p
                        className={`mx-auto text-center sub-heading-font-h3 ${
                          selected ? '' : 'sub-heading-font-gray'
                        }`}
                      >
                        {category.name}
                      </p>
                    </button>
                  )}
                </Tab>
              ))}
            {categories.length > 3 && (
              <Tab as={Fragment}>
                <button
                  className="px-5 py-2 flex w-44 items-center space-x-2"
                  onClick={() => history.push('/productsearch')}
                >
                  <span className="sub-heading-font-gray sub-heading-font-h3">
                    {/* {t('Common.view-more')} */}
                    More
                  </span>
                </button>
              </Tab>
            )}
          </Tab.List>
          {/* see more category */}
        </div>
        <Tab.Panels className="w-full mb-6 py-4">
          {categories.length > 0 &&
            categories.map((category) => (
              <Tab.Panel
                key={category.id}
                className="overflow-x-auto hide-scroll-bar"
              >
                <div className="inline-flex md:grid md:grid-cols-4 gap-x-4 gap-y-4 md:space-x-0 md:mx-auto mx-2">
                  {category.productListBuyers.length > 0 &&
                    category.productListBuyers
                      .slice(0, 8)
                      .map((product) => (
                        <ProductCard
                          key={product.productId}
                          productData={product}
                        />
                      ))}
                </div>

                {/* hide show see more button */}
                {category.productListBuyers.length > 8 && (
                  <button
                    className="load-more_btn block m-auto rounded-md w-full md:w-4/12 mt-5 mb-5 py-2"
                    onClick={() => clickOnViewMore(category.id, category.name)}
                  >
                    <span className="tertiary-font">
                      {t('Common.view-more')}
                    </span>
                  </button>
                )}
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>

      {/* See More Product Button */}
      {/* <button className="load-more_btn block m-auto rounded-md w-full md:w-4/12 mb-5 py-2">
        <span className="tertiary-font">{t('Common.view-more')}</span>
      </button> */}
      {/* <div className="h-1  bg-gray-300 block md:hidden"></div> */}
    </div>
  )
}

export default ProductListByCategory
