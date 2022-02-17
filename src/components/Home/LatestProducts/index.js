/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SEARCH_LATEST, SEARCH_CATEGORY } from '../../../constant/search';
import { goToProductSearchResult } from '../../../util/goToSpecificPathName';
import * as sortType from '../../../constant/search';

import ProductCardHeading from './productCardHeading';
import ProductCard from './productCard_Latest';

import { PRODUCT_SEARCH_RESULT } from '../../../constant/locationPathName';
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName';

const ProductListByCategory = ({ productArray = [], onClickWishList }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_LATEST,
    };
    goToProductSearchResult(history, propsData);
  };

  const clickOnCategoryLow = ({ value }) => {
    let propsState = {
      categoryName: 'All Proucts',
      category: 1,
      searchType: SEARCH_CATEGORY,
      value,
    };
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState);
  };

  return (
    <div className='mb-2'>
      <ProductCardHeading
        Heading={t('Home.new-arrival')}
        ViewAll={t('Common.view-more')}
        /**
         * action
         */
        onClickViewMore={() =>
          clickOnCategoryLow({
            value: sortType.SORT_LATEST_PRODUCT,
          })
        }
        productLength={productArray}
      />
      <div className='bg-custom-main-light bg-gray-100 pb-2 px-2 md:px-0'>
        <div className=' overflow-x-auto hide-scroll-bar'>
          <div className='grid grid-cols-2 md:grid-cols-4 space-x-0 gap-x-4 md:space-x-0 md:gap-x-4'>
            {Array.isArray(productArray) &&
              productArray
                .slice(0, 4)
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
    </div>
  );
};

export default ProductListByCategory;
