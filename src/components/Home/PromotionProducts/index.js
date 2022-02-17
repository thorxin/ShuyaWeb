/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { SEARCH_PROMOTION } from '../../../constant/search';
import { goToProductSearchResult } from '../../../util/goToSpecificPathName';

import ProductCardHeading from './productCardHeading';
import ProductCard from './productCard_Promotion';

const ProductListByCategory = ({ productArray = [], onClickWishList }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_PROMOTION,
    };
    goToProductSearchResult(history, propsData);
  };

  return (
    <div className=''>
      <ProductCardHeading
        Heading={t('Home.promotion')}
        ViewAll={t('Common.view-more')}
        /**
         * action
         */
        onClickViewMore={clickOnViewMore}
        productLength={productArray}
      />
      <div className='bg-gray-100 pb-2 px-2 md:px-0'>
        <div className=' overflow-x-auto hide-scroll-bar'>
          <div className='grid grid-cols-2 md:grid-cols-4 space-x-0 gap-x-4 gap-y-3 md:space-x-0 md:gap-x-4'>
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
