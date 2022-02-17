/** @format */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

//components
import { Hook } from './hook';
import { goToSpecificPathName } from '../../../../util/goToSpecificPathName';
import {
  LOGIN,
  PRODUCT_SEARCH,
  SHOPPING_CART,
} from '../../../../constant/locationPathName';

import {
  SEARCH_LATEST,
  SEARCH_BEST_SELLING,
  SEARCH_CATEGORY,
} from '../../../../constant/search';
import { PRODUCT_SEARCH_RESULT } from '../../../../constant/locationPathName';
import { goToProductSearchResult } from '../../../../util/goToSpecificPathName';
import { goToSpecificPathNameWithData } from '../../../../util/goToSpecificPathName';

//images
import Logo from '../../../../assets/home/app_logo.png';
import FilterIcon from '../../../../assets/home/filter_icon_mobile.svg';
import SearchIcon from '../../../../assets/home/search.png';
import Cart from '../../../../assets/home/cart.png';
import LowToHeight from '../../../../assets/home/low_icon.svg';
import HeightToLow from '../../../../assets/home/high_icon.svg';
import LatestProduct from '../../../../assets/home/latest_icon.svg';
import PopularProduct from '../../../../assets/home/popular_icon.svg';
import CloseIcon from '../../../../assets/common/close_icon.svg';

import { Link } from 'react-router-dom';
import {
  GET_STORED_ACCESS_TOKEN,
  saveLastRoute,
} from '../../../../util/storage';

const maximum_cart_count = 9;

const NavigationMobile = (props) => {
  const [cartCount] = Hook();

  const { t } = useTranslation();
  const history = useHistory();

  const onClickRoute = (routeName) => {
    if (GET_STORED_ACCESS_TOKEN) return;
    saveLastRoute(routeName);
  };

  // Fiter [code with sithu]
  const [isFilter, setIsFilter] = useState(false);

  const clickOnViewMoreLatest = () => {
    let propsData = {
      searchType: SEARCH_LATEST,
    };
    goToProductSearchResult(history, propsData);
  };

  const clickOnViewMorePromotion = () => {
    let propsData = {
      searchType: SEARCH_BEST_SELLING,
    };
    goToProductSearchResult(history, propsData);
  };

  const clickOnCategoryLow = () => {
    let propsState = {
      categoryName: 'All Proucts',
      category: 1,
      searchType: SEARCH_CATEGORY,
    };
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState);
  };
  // End Filter

  return (
    <>
      {isFilter ? (
        <div className=' mx-auto relative'>
          <div className='fixed shadow-md top-0 left-0 right-0 z-40 bg-white md:py-5 md:px-48 px-4 py-2 space-y-3'>
            <div className='flex justify-between items-center'>
              <div className='primary-font font-semibold text-color-default'>
                Filter
              </div>
              <div>
                <img src={Logo} className='w-12 py-2' alt='AppLogo' />
              </div>
              <div
                className='cursor-pointer'
                onClick={() => setIsFilter(!isFilter)}
              >
                <img src={CloseIcon} className='w-5 h-5' />
              </div>
            </div>
            <div
              className='cursor-pointer primary-font flex space-x-4 items-center'
              onClick={clickOnCategoryLow}
            >
              <div>
                <img src={LowToHeight} className='w-5 h-5' />
              </div>
              <div className='caption-font'>Amount: Lowest to Highest</div>
            </div>
            <div
              className='cursor-pointer primary-font flex space-x-4 items-center'
              onClick={clickOnCategoryLow}
            >
              <div>
                <img src={HeightToLow} className='w-5 h-5' />
              </div>
              <div className='caption-font'>Amount: Highest to Lowest</div>
            </div>
            <div
              className='cursor-pointer primary-font flex space-x-3 items-center'
              onClick={clickOnViewMoreLatest}
            >
              <div>
                <img src={LatestProduct} className='w-6 h-6' />
              </div>
              <div className='caption-font'> New arrival Products</div>
            </div>
            <div
              className='cursor-pointer primary-font flex space-x-4 items-center'
              onClick={clickOnViewMorePromotion}
            >
              <div>
                <img src={PopularProduct} className='w-5 h-5' />
              </div>
              <div className='caption-font'> Popular Products</div>
            </div>
          </div>
        </div>
      ) : null}
      <div className='block md:hidden fixed top-0 w-full  bg-white z-50'>
        <div className='w-full h-auto'>
          <div className='mx-2 pt-2'>
            <div className='flex justify-center'>
              <img src={Logo} className='w-36 h-auto' alt='AppLogo' />
            </div>
            <div className='flex w-full justify-between items-center space-x-4 mt-4 mb-4'>
              <div className='w-full h-auto relative'>
                <input
                  type='text'
                  className='w-full h-12 p-4 rounded-xl bg-custom-graycolor outline-none text-lg'
                  placeholder='Search...'
                />
                <div
                  className='h-auto absolute top-0 p-3 rounded-xl bg-white right-0 border-2 border-custom-primary'
                  onClick={() => goToSpecificPathName(history, PRODUCT_SEARCH)}
                >
                  <img
                    src={SearchIcon}
                    className='w-4 h-auto pt-1'
                    alt='SearchIcon'
                  />
                </div>
              </div>
              <Link
                to={GET_STORED_ACCESS_TOKEN ? SHOPPING_CART : LOGIN}
                onClick={() => onClickRoute(SHOPPING_CART)}
              >
                <div className='relative px-2 py-1'>
                  {cartCount > 0 && (
                    <div className='absolute -top-1.5 left-0 bg-custom-orange w-4 h-4 rounded-full flex justify-center items-center'>
                      <p className='text-color-white text-tiny'>{cartCount}</p>
                    </div>
                  )}
                  <img src={Cart} className='w-8 h-auto' alt='CartIcon' />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMobile;
