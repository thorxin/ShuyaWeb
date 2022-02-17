/** @format */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { goProductDetails } from '../../../util/goToSpecificPathName';

//components
import moneyFormatter from '../../../util/moneyFormatter';
import WishIconOne from '../../../assets/productDetail/wish_icon_1.svg';
import ActiveWishIconOne from './../../../assets/productDetail/wish_icon_active_1.svg';

const ProductCart = ({
  ProductId,
  Product,
  TextColor_ProductName,
  TextColor_Price_1,
  TextColor_Price_2,
  clickOnWishList,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(Product.isFav || false);
  }, [Product?.isFav]);

  let price = (
    <div>
      <p className={`primary-font text-color-primary custom-font-bold`}>
        {moneyFormatter(Product.originalPrice)} {t('ProductDetails.kyats')}{' '}
      </p>
    </div>
  );
  if (Product.promotePercent > 0) {
    price = (
      <div>
        <p className={`primary-font text-color-primary custom-font-bold`}>
          {moneyFormatter(Product.promotePrice)} {t('ProductDetails.kyats')}{' '}
        </p>
        <p className={`tertiary-font text-color-secondary line-through `}>
          {moneyFormatter(Product.originalPrice)} {t('ProductDetails.kyats')}{' '}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className='w-46 md:w-full h-auto cursor-pointer mb-2 group relative'
        onClick={() => goProductDetails(history, ProductId)}
      >
        {/* Toggle Fav Btn */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFav(!isFav);
            clickOnWishList(ProductId, Product.isFav);
          }}
          className='absolute z-10 right-1 top-2 w-6 h-6'
        >
          <img
            src={isFav ? ActiveWishIconOne : WishIconOne}
            className='w-full h-full absolute top-2 right-2 cursor-pointer '
            alt='Wish Icon'
          />
        </button>
        <div className='relative '>
          <div className='overflow-hidden'>
            <img
              src={Product.url}
              className='w-full h-auto border-2 rounded-xl transform group-hover:scale-110 duration-150'
              alt='ProductImg'
            />
          </div>
          {Product.promotePercent > 0 && (
            <div className='absolute bottom-0 bg-promote-price-percent'>
              <p className='caption-font text-color-default px-2'>
                {Product.promotePercent}% Off
              </p>
            </div>
          )}
        </div>

        <div className='bg-white p-1'>
          <p className='primary-font text-color-default line-clamp-2 custom-font-bold'>
            {Product.name}
          </p>
          {price}
        </div>
      </div>
    </>
  );
};

export default ProductCart;
