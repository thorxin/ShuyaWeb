/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//components
import { Hook } from './hook';
import { PopOverBox } from '../../CommonComponent/PopOverBox/pop_over_box';
import { ProductListFrame } from './product_list_frame';
import { ProductCard } from './product_card';
import LoadMoreButton from '../../CommonComponent/LoadMoreButton';

export const ProductList = ({
  IsLoading,
  IsSecondaryLoading,
  SearchedProductList = [],
  SearchProductCount = 0,
  IsLoadMore = false,
  sortvalue,
  SelectedCategory,
  /**
   * action
   */
  sortProduct,
  clickingOnLoadMoreBtn,
}) => {
  const [
    sortOption,
    selectedSortedOption,
    isShowSortedOption,
    popUpRef,
    sortedOptionButtonRef,
    /**
     * action
     */
    clickOnSortedList,
    clickOnSortedOption,
  ] = Hook(sortProduct, sortvalue, SelectedCategory);

  const { t } = useTranslation();
  return (
    <>
      <div className='space-y-5 pb-5 md:pb-0'>
        <div className='flex justify-between mt-16 md:mt-0'>
          <div>
            {SearchedProductList.length > 0 && (
              <p className='primary-font font-medium text-color-secondary'>
                {t('ProductSearch.result-found')} ( {SearchProductCount} )
              </p>
            )}
          </div>
          {SearchedProductList.length > 0 && (
            <div className='relative'>
              <div id='sortedOptionButton' ref={sortedOptionButtonRef}>
                <div
                  type='button'
                  className='flex items-center space-x-2 justify-end cursor-pointer'
                  id='menu-button'
                  aria-expanded='true'
                  aria-haspopup='true'
                  onClick={clickOnSortedList}
                >
                  <div>
                    <img
                      src={selectedSortedOption.image}
                      className='w-4 h-auto'
                      alt='Menu Icon'
                    />
                  </div>
                  <p className='tertiary-font font-medium text-color-default'>
                    {t(selectedSortedOption.label)}
                  </p>
                </div>
              </div>
              <div
                id='sortedOptionPopUp'
                ref={popUpRef}
                className={`${isShowSortedOption ? 'block' : 'hidden'}`}
              >
                <div className='absolute z-20 bg-white w-44 md:px-4 sm:px-4 right-0 h-auto max-h-60 mt-1 py-4 shadow-lg overflow-y-auto pl-2'>
                  <div className=''>
                    <div className='space-y-4'>
                      {sortOption.length > 0 &&
                        sortOption.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => clickOnSortedOption(option)}
                            className='flex space-x-3 items-center cursor-pointer'
                          >
                            <div>
                              <img
                                src={option.image}
                                className='w-4 h-auto'
                                alt='Menu Icon'
                              />
                            </div>

                            <p className='caption-font primary-font font-medium'>
                              {t(option.label)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ProductListFrame
          loading={IsLoading}
          isLoadMore={IsLoadMore}
          data={SearchedProductList}
        >
          {SearchedProductList.length > 0 && (
            <>
              {SearchedProductList.map((product, index) => (
                <ProductCard key={index} Product={product} />
              ))}
            </>
          )}
        </ProductListFrame>
        {/* code with sithu */}
        {SearchedProductList.length < SearchProductCount ? (
          <div className='flex justify-center'>
            <LoadMoreButton
              IsLoading={IsLoading}
              IsLoadMore={IsLoadMore}
              /**
               * action
               */
              ClickingOnLoadMoreBtn={clickingOnLoadMoreBtn}
            />
          </div>
        ) : (
          <p className='caption-font text-color-secondary text-center'>
            No More Data
          </p>
        )}
        {SearchedProductList.length === 0 && !IsLoading && (
          <div className='flex justify-center'>
            {t('Common.no-result-found')}
          </div>
        )}
      </div>
    </>
  );
};
