/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'

//components
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb'
import { Hook } from './hook'
import FooterWeb from '../../CommonComponent/Footer/web_footer'
import { TagList } from '../TagList/tag_list'
import { ProductList } from '../ProductList/product_list'
import History from '../History/history'
import Category from '../CategoryList/categories'

//images
import DownArrow from '../../../assets/common/down_arrow.svg'
import UpArrow from '../../../assets/common/up_arrow.svg'
import RightArrowImage from '../../../assets/productSearch/left_arrow_image.png'
import CategoryListFrame from '../CategoryList/category_list_frame'
import { goBack } from '../../../util/goToSpecificPathName'
import { useHistory } from 'react-router'

const MoreTag = ({ is_more, clickingMoreTag }) => {
  return (
    <div className="w-full h-auto flex justify-center">
      <div
        className="rounded-full shadow-lg py-2 px-8"
        onClick={() => clickingMoreTag()}
      >
        <img
          src={is_more ? UpArrow : DownArrow}
          className="w-6 h-auto"
          alt="DownArrowIcon"
        />
      </div>
    </div>
  )
}

export const WebProductSearch = (props) => {
  const [] = Hook()

  const { t } = useTranslation()
  const history = useHistory()

  // alert(props.selectedCategory);

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen space-y-5 pt-24">
        <NavigationWeb />
        <div className=" mx-auto">
          <div className="default-margin-layout">
            <div className="grid grid-cols-8">
              {/* Filter Category, Tags - Left Side */}
              <>
                <div className="col-span-2 bg-white py-4">
                  <div className=" space-y-6">
                    <div className="flex items-center space-x-3 mx-4">
                      <div>
                        <img
                          src={RightArrowImage}
                          className="w-5 h-auto cursor-pointer"
                          alt="RightArrow"
                          onClick={() => goBack(history)}
                        />
                      </div>
                      <p className="price-font custom-font-bold">
                        What are you looking for...
                      </p>
                    </div>

                    <div className="space-y-3 mx-4">
                      {/* Filter By Category */}
                      <>
                        <p className="primary-font font-medium">Filters</p>
                        <p className="secondary-font font-medium text-color-secondary">
                          {t('ProductSearch.by-categories')}
                        </p>
                        <div className="w-full h-80 space-y-4 overflow-y-auto">
                          <CategoryListFrame>
                            {props.mainCategory.length > 0 &&
                              props.mainCategory.map((category) => (
                                <Category
                                  key={category.id}
                                  CategoryUrl={category.url}
                                  CategoryName={category.name}
                                  CategoryId={category.id}
                                  selectedCategory={props.selectedCategory}
                                  /**
                                   * action
                                   */
                                  onChangeCategoryList={() =>
                                    props.onChangeCategory(category.id)
                                  }
                                />
                              ))}
                          </CategoryListFrame>
                        </div>
                      </>
                      {/* End Filter By Category */}

                      {/* Filter By Tags */}
                      <>
                        <p className="secondary-font font-medium text-color-secondary">
                          Tags
                        </p>
                        <div className="w-full">
                          <div>
                            <TagList
                              Loading={props.secondaryLoading}
                              TagListArray={props.tagList}
                              SelectedTag={props.selectedTag}
                              IsMoreTag={props.isMoreTags}
                              clickTag={props.clickOnTag}
                            />
                          </div>
                          {props.tagList.length > 6 && (
                            <MoreTag
                              is_more={props.isMoreTags}
                              clickingMoreTag={props.clickOnMoreTag}
                            />
                          )}
                        </div>
                      </>
                      {/* End Filter By Tags */}
                    </div>
                  </div>
                </div>
              </>
              {/* End Filter Category, Tags - Left Side */}

              {/* Product Result - Right Side */}
              <>
                <div className="col-span-6 bg-gray-100 py-3">
                  <div className="mx-4 space-y-6">
                    <p className="price-font font-medium">
                      {t('ProductSearch.result')}
                    </p>
                    <div className="w-full overflow-y-auto">
                      {props.selectedTag.length > 0 ||
                      props.selectedCategory ? (
                        <ProductList
                          IsLoading={props.isLoading}
                          IsSecondaryLoading={props.secondaryLoading}
                          IsLoadMore={props.isLoadMore}
                          SearchProductCount={props.searchProductCount}
                          SearchedProductList={props.searchProductList}
                          SelectedCategory={props.selectedCategory}
                          /**
                           * action
                           */
                          sortProduct={props.sortProduct}
                          clickingOnLoadMoreBtn={props.clickOnLoadMoreBtn}
                        />
                      ) : (
                        <History />
                      )}
                    </div>
                  </div>
                </div>
              </>
              {/* End Product Result - Right Side */}
            </div>
          </div>
        </div>
        <FooterWeb />
      </div>
    </>
  )
}
