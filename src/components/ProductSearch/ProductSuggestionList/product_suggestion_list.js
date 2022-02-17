import React from 'react'

//components
import { Hook } from './hook'
import History from '../History/history'
import ProductSuggestionListFrame from './product_suggestion_list_frame'
import { useLocation } from 'react-router-dom'

//images
import SearchNotFoundIcon from '../../../assets/productSearch/search_not_found_icon.svg'
import placeholder from '../../../assets/common/placeholder_icon.svg'
import { useTranslation } from 'react-i18next'
import { react } from '@babel/types'

export default function ProductSuggestionList({
  Loading,
  IsInputValue,
  ProductList,
  setIsFocus,
  dispatchClearDataList,
}) {
  const [
    /**
     * action
     */
    clickOnSuggestionProduct,
  ] = Hook()

  const { t } = useTranslation()
  const location = useLocation()
  const productName = location.state?.productName
  if (IsInputValue)
    return (
      <ProductSuggestionListFrame loading={Loading}>
        {Array.isArray(ProductList) &&
          (ProductList.length > 0 ? (
            <>
              <p className="secondary-font text-color-secondary">
                {t('ProductSearch.result-found')}
              </p>
              {ProductList.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 md:cursor-pointer hover:text-color-link"
                  onClick={() => {
                    clickOnSuggestionProduct(product)
                    if (productName !== product.name) {
                      dispatchClearDataList()
                    }
                    setIsFocus(false)
                  }}
                >
                  <div className="w-10 h-auto flex flex-shrink-0">
                    <img
                      src={product.imageUrl ? product.imageUrl : placeholder}
                      className="w-full h-full rounded-sm object-cover"
                      alt="ProductImage"
                      onError={(e) => (e.target.src = placeholder)}
                    />
                  </div>
                  <p className="secondary-font my-auto"> {product.name} </p>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={SearchNotFoundIcon}
                className="w-3/12 h-auto "
                alt="NotFoundIcon"
              />
            </div>
          ))}
      </ProductSuggestionListFrame>
    )

  return null
  // (
  //   <>
  //     <History />
  //   </>
  // );
}
