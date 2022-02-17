/** @format */

import React from 'react'

//components
import { Hook } from './hook'
import { MobileProductSearch } from './MobileProductSearch/mobile_product_search'
import { WebProductSearch } from './WebProductSearch/web_product_search'

export default function ProductSearch(props) {
  const [
    isLoading,
    isSecondaryLoading,
    tagList,
    searchProductList,
    searchProductCount,
    selectedTagList,
    isMoreTags,
    productSuggestionList,
    mainCategory,
    selectedCategory,
    isLoadMore,
    /**
     * action
     */
    searchProduct,
    clickOnMoreTag,
    clickOnTag,
    clickOnLoadMore,
    sortProduct,
    delaySearchByText,
    clearData,
    onSearchCategory,
  ] = Hook(props)

  return (
    <>
      <div className="md:hidden">
        <MobileProductSearch
          isLoading={isLoading}
          isSecondaryLoading={isSecondaryLoading}
          tagList={tagList}
          searchProductList={searchProductList}
          searchProductCount={searchProductCount}
          selectedTag={selectedTagList}
          isMoreTags={isMoreTags}
          productSuggestionList={productSuggestionList}
          mainCategory={mainCategory}
          isLoadMore={isLoadMore}
          /**
           * action
           */
          searchProduct={searchProduct}
          clickOnMoreTag={clickOnMoreTag}
          clickOnTag={clickOnTag}
          clickOnLoadMoreBtn={clickOnLoadMore}
          sortProduct={sortProduct}
          delaySearchByText={delaySearchByText}
          clearData={clearData}
        />
      </div>
      <div className="hidden md:block">
        <WebProductSearch
          isLoading={isLoading}
          secondaryLoading={isSecondaryLoading}
          isLoadMore={isLoadMore}
          tagList={tagList}
          selectedTag={selectedTagList}
          isMoreTags={isMoreTags}
          searchProductList={searchProductList}
          searchProductCount={searchProductCount}
          mainCategory={mainCategory}
          selectedCategory={selectedCategory}
          /**
           * action
           */
          clickOnMoreTag={clickOnMoreTag}
          clickOnTag={clickOnTag}
          clickOnLoadMoreBtn={clickOnLoadMore}
          sortProduct={sortProduct}
          onChangeCategory={onSearchCategory}
        />
      </div>
    </>
  )
}
