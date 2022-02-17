/** @format */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { goProductDetails } from '../../../util/goToSpecificPathName';

//components
import moneyFormatter from '../../../util/moneyFormatter';
import PlaceHolderImage from '../../CommonComponent/placeholder_image';
import WishIconOne from '../../../assets/home/fav_no_active.png';
import NoActiveWishIconOne from './../../../assets/home/fav_noactive_black.png';

const ProductCard = ({ productData = {}, onClickWishList }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(productData.isFav || false);
  }, [productData?.isFav]);

  let productPriceSection = (
    <p className='primary-font text-color-primary custom-font-bold'>
      {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
    </p>
  );
  if (productData.promotePrice > 0)
    productPriceSection = (
      <>
        <p className='primary-font text-color-primary custom-font-bold'>
          {moneyFormatter(productData.promotePrice)} {t('Common.kyats')}
        </p>
        <p className=' tertiary-font  text-color-secondary line-through'>
          {moneyFormatter(productData.originalPrice)} {t('Common.kyats')}
        </p>
      </>
    );

  return (
    <>
      <div
        className='w-46 md:w-full h-auto cursor-pointer mb-2 group relative'
        onClick={(e) => {
          e.stopPropagation();
          goProductDetails(history, productData.productId, true);
        }}
      >
        {/* Toggle Fav Btn */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFav(!isFav);
            onClickWishList(productData.productId, isFav);
            // toggleFav(productData.productId, productData.isFav)
          }}
          className='absolute z-10 right-1 top-0 w-6 h-6'
        >
          <img
            src={isFav ? WishIconOne : NoActiveWishIconOne}
            className='w-full h-full absolute top-2 right-2 cursor-pointer'
            alt='Wish Icon'
          />
        </button>
        <div className='w-full h-auto relative'>
          {productData.promotePercent > 0 && (
            <div className='absolute bottom-0 bg-promote-price-percent z-40'>
              <p className='caption-font text-color-white px-2'>
                {productData.promotePercent}% Off
              </p>
            </div>
          )}
          <div className='overflow-hidden rounded-t-md'>
            <img
              src={productData.url}
              className='w-full h-full md:rounded-none transform group-hover:scale-110 duration-150'
              alt='ProductByCategory'
            />
          </div>
          {/* <PlaceHolderImage /> */}
        </div>
        <div className='p-2 bg-white rounded-b-md'>
          <p className='primary-font text-color-default line-clamp-2 custom-font-bold'>
            {productData.name}
          </p>
          {productPriceSection}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
