import React from "react";
import { useTranslation } from "react-i18next";

//components
import { TagList } from "../TagList/tag_list";
import { ProductList } from "../ProductList/product_list";
import History from "../History/history";
import { Hook } from "./hook";
import ProductSuggestionList from "../ProductSuggestionList/product_suggestion_list";
import Category from "../CategoryList/categories";
import CategoryListFrame from "../CategoryList/category_list_frame";

//images
import SearchGrayIcon from "../../../assets/productSearch/search_gray_icon.svg";
import BackArrowIcon from "../../../assets/common/back_arrow.svg";

export const MobileProductSearch = (props) => {
  const { t } = useTranslation();

  const [
    isFocusInput,
    isInputValue,
    /**
     * action
     */
    onFocus,
    onBlur,
    onChangeText,
    clickOnCategory,
    clickOnBack,
    dispatchClearDataList,
    setIsFocusInput,
  ] = Hook(props.delaySearchByText, props.clearData);

  return (
    <>
      <div className="bg-white py-3 md:hidden sticky top-0 z-30">
        <div className="mx-2">
          <div className="flex items-center space-x-4">
            {!isFocusInput && !isInputValue && (
              <div onClick={clickOnBack}>
                <img
                  src={BackArrowIcon}
                  className="w-3 h-auto"
                  alt="BackArrow Icon"
                />
              </div>
            )}

            <div className="w-full h-auto relative ">
              <input
                type="text"
                className="primary-text-box rounded-sm pr-10"
                placeholder={t("Navigation.Search")}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => onChangeText(e.target.value)}
              />
              <img
                src={SearchGrayIcon}
                className="w-4 h-auto absolute top-3 right-3"
                alt="SearchIcon"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <SubHeadingWithBackArrow goTo={clickOnBack}>
        
      </SubHeadingWithBackArrow> */}
      <div className="space-y-3">
        {/* Searching By Text */}
        {isFocusInput || isInputValue ? (
          <div className="mx-4">
            <ProductSuggestionList
              Loading={props.isLoading}
              ProductList={props.productSuggestionList}
              IsInputValue={isInputValue}
              dispatchClearDataList={dispatchClearDataList}
              setIsFocus={setIsFocusInput}
            />
          </div>
        ) : (
          <>
            {/* Searching By Tags */}
            <div className="default-margin-layout">
              <TagList
                Loading={props.isLoading}
                TagListArray={props.tagList}
                IsMoreTag={props.isMoreTags}
                SelectedTag={props.selectedTag}
                /**
                 * action
                 */
                clickMoreTag={props.clickOnMoreTag}
                clickTag={props.clickOnTag}
              />
            </div>

            {/* Searching By Category */}
            {props.selectedTag.length === 0 ? (
              <>
                <div className="default-margin-layout overflow-y-auto">
                  <History />
                </div>
                <div className=" w-full h-auto py-3 bg-white">
                  <div className="default-margin-layout">
                    <CategoryListFrame Loading={props.isLoading}>
                      <div className="grid grid-flow-col grid-rows-2 gap-x-4 gap-y-2 overflow-y-hidden overflow-x-auto">
                        {props.mainCategory.length > 0 &&
                          props.mainCategory.map((category) => (
                            <Category
                              key={category.id}
                              CategoryName={category.name}
                              CategoryUrl={category.url}
                              /**
                               * action
                               */
                              onClickCategory={() => clickOnCategory(category)}
                            />
                          ))}
                      </div>
                    </CategoryListFrame>
                  </div>
                </div>
              </>
            ) : (
              <div className="mx-2">
                <ProductList
                  IsLoading={props.isLoading}
                  IsSecondaryLoading={props.isSecondaryLoading}
                  SearchedProductList={props.searchProductList}
                  SearchProductCount={props.searchProductCount}
                  IsLoadMore={props.isLoadMore}
                  /**
                   * action
                   */
                  sortProduct={props.sortProduct}
                  clickingOnLoadMoreBtn={props.clickOnLoadMoreBtn}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
