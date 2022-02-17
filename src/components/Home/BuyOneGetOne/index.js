/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

/**
 * components
 */
import ProductCardHeading from './productCardHeading';
import ProductCard from './ProductCardBuyOneGetOne';
import { goToProductSearchResult } from '../../../util/goToSpecificPathName';
import { SEARCH_BUY_ONE_GET_ONE } from '../../../constant/search';

const PromotionProducts = ({ productsArray = [], onClickWishList }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_BUY_ONE_GET_ONE,
    };
    goToProductSearchResult(history, propsData);
  };

  if (productsArray.length > 0)
    return (
      <>
        <ProductCardHeading
          Heading={t('Home.buy-one-get-one')}
          ViewAll={t('Common.view-more')}
          /**
           * action
           */
          onClickViewMore={clickOnViewMore}
          productLength={productsArray}
        />
        <div className='pb-2'>
          <div className='pb-2 px-2 md:px-0'>
            <div className=' overflow-x-auto pb-2 md:pb-0 hide-scroll-bar'>
              <div className='inline-flex md:grid md:grid-cols-4 space-x-4 md:space-x-0 md:gap-x-4'>
                {Array.isArray(productsArray) &&
                  productsArray
                    .slice(0, 6)
                    .map((product) => (
                      <ProductCard
                        key={product.productId}
                        productData={product}
                        onClickWishList={onClickWishList}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return null;
};
export default PromotionProducts;
