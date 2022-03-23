/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

//images
import RightArrowIcon from '../../../../assets/productDetail/right_arrow_icon.svg'

/**
 * util functions
 */
import { goToSpecificPathNameWithData } from '../../../../util/goToSpecificPathName'

/**
 * constants
 */
import { SEARCH_BEST_SELLING } from '../../../../constant/search'

import {
  BY_CATEGORY,
  PRODUCT_SEARCH_RESULT,
} from '../../../../constant/locationPathName'

const ProductCategory = ({ CategoryArray = [] }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const goToByCategory = (id, name, isMainCategory) => {
    if (isMainCategory) {
      goToSpecificPathNameWithData(history, BY_CATEGORY, { id, name })
    } else {
      goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, {
        productName: name,
        categoryId: id,
        searchType: SEARCH_BEST_SELLING,
      })
    }
  }

  if (CategoryArray.length > 0)
    return (
      <>
        <div className="bg-white pb-2 md:-mt-4 ml-4 md:ml-8">
          <div className="flex items-center space-x-2">
            {CategoryArray.map((category, i) => (
              <>
                <button
                  key={category.productCategoryId}
                  className="text-color-secondary"
                  onClick={() =>
                    goToByCategory(
                      category.productCategoryId,
                      category.productCategoryName,
                      category.isMainCategory,
                    )
                  }
                >
                  {category.productCategoryName}
                </button>
                {CategoryArray.length - 1 !== i && (
                  <span className="text-color-secondary font-semibold">/</span>
                )}
              </>
            ))}
          </div>
        </div>
      </>
    )

  return null
}

export default ProductCategory
