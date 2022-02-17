/** @format */

import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

//components
import { Hook } from './hook';
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb';
import { ProductList } from '../ProductList/product_list';
import { SubHeadingWithBackArrow } from '../../CommonComponent/SubHeading/sub_heading_with_back_arrow';
import FooterWeb from '../../CommonComponent/Footer/web_footer';

//images
import BackArrowIcon from '../../../assets/common/left_arrow_image.png';

export default function ResultProductList(props) {
  const [
    isLoading,
    searchProductList,
    searchProductCount,
    name,
    isLoadMore,
    isShowTextBox,
    sortvalue,
    /**
     * action
     */
    goToBack,
    sortProduct,
    clickOnLoadMore,
    changeOnSearchText,
  ] = Hook(props);
  const { t } = useTranslation();

  const history = useHistory();

  const goToHome = () => {
    history.push('/');
  };

  return (
    <>
      <div className='bg-gray-200 w-full h-auto min-h-screen md:space-y-5'>
        <NavigationWeb />
        <div className=' mx-auto'>
          <div className='default-margin-layout md:space-y-5'>
            {/* Heading Section - Back Arrow */}
            <div
              className='hidden md:flex space-x-2 items-center cursor-pointer'
              onClick={goToBack}
            >
              <div className='w-3 h-auto'>
                <img
                  src={BackArrowIcon}
                  className='w-full h-full'
                  alt='Back Arrow Icon'
                />
              </div>
              <p className='tertiary-font text-color-secondary'>
                {t('Common.back')}
              </p>
            </div>
            <SubHeadingWithBackArrow goTo={goToBack}>
              {isShowTextBox ? (
                <input
                  type='text'
                  className='primary-text-box rounded-sm pr-10'
                  placeholder={t('Navigation.Search')}
                  value={name}
                  onChange={(e) => changeOnSearchText(e)}
                />
              ) : (
                <p className='text-color-default sub-heading-font'>{name}</p>
              )}
            </SubHeadingWithBackArrow>
            <div className='bg-white md:py-4 scrollbar-hide'>
              <div className='mx-4 md:mx-8 space-y-5'>
                <p className='text-color-default sub-heading-font hidden md:block font-semibold'>
                  {name}
                </p>
                {name && (
                  <ProductList
                    IsLoading={isLoading}
                    SearchedProductList={searchProductList}
                    SearchProductCount={searchProductCount}
                    IsLoadMore={isLoadMore}
                    sortvalue={sortvalue}
                    /**
                     * action
                     */
                    sortProduct={sortProduct}
                    clickingOnLoadMoreBtn={clickOnLoadMore}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterWeb />
      </div>
    </>
  );
}

export const goBack = (history) => {
  history.goBack();
};
