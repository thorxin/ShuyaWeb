/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//images
import BackArrowIcon from '../../../assets/common/back_arrow.svg';
import MyShopCartIcon from '../../../assets/shoppingcart/shop_cart_icon.svg';
import ExclamationMarkIcon from '../../../assets/common/exclamation_mark_icon.svg';

//components
import { ProductCart } from '../CommonUI/product_card';
import {
  AVAILABLE_PRODUCT,
  STOCK_LEFT_PRODUCT,
  OUT_OF_STOCK_PRODUCT,
  CLEAR_ALL,
} from '../util';
import { goBack } from '../../../util/goToSpecificPathName';
import { useHistory } from 'react-router';
import { getLocalStorage, SHOPPING_CART_TYPE } from '../../../util/storage';
import { BUY_NOW } from '../../ProductDetails/util';

const MyCart = ({
  AvailableProduct = [],
  StockLeftProduct = [],
  OutOfStockProduct = [],
  /**
   * action
   */
  clickClearAll,
  clickTrashIcon,
  IncreaseProductCount,
  DecreaseProductCount,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const shopCartType = getLocalStorage(SHOPPING_CART_TYPE);

  const product_card_width = 'w-full md:w-8/12 lg:w-6/12';
  const unavailable_number_product =
    StockLeftProduct.length + OutOfStockProduct.length;

  return (
    <div className='bg-white pb-3 md:py-3'>
      <div className='space-y-4'>
        {/* Heading */}
        <div className='w-11/12 h-auto mx-auto flex items-center justify-between'>
          <div className='flex space-x-3 items-center'>
            <div className='w-5 h-auto'>
              <img
                src={MyShopCartIcon}
                className='w-full h-full'
                alt='Shopping Cart Icon'
              />
            </div>
            <p className='text-lg custom-font-bold text-color-default'>
              {t('ShoppingCart.my-cart')}
            </p>
          </div>
          {shopCartType !== BUY_NOW && (
            <button
              onClick={() =>
                clickClearAll(t('ShoppingCart.remove-all-product'), CLEAR_ALL)
              }
            >
              <p className='primary-font text-color-secondary'>
                {t('ShoppingCart.clear-all')}
              </p>
            </button>
          )}
        </div>
        {/* End Heading */}

        {/* Available Products */}
        {AvailableProduct.length > 0 && (
          <div className='space-y-3'>
            <div className='w-11/12 h-auto mx-auto'>
              <p className='primary-font text-color-secondary'>
                {t('ShoppingCart.available-products')} ({' '}
                {AvailableProduct.length} )
              </p>
            </div>

            {AvailableProduct.map((product, idx) => (
              <div
                key={idx}
                className='hover:bg-blue-100 cursor-pointer py-2 md:py-3'
              >
                <div className='w-11/12 h-auto mx-auto'>
                  <ProductCart
                    Item={product}
                    CurrentIndex={idx}
                    PRODUCT_TYPE={AVAILABLE_PRODUCT}
                    IsNotBuyNow={shopCartType === BUY_NOW}
                    /**
                     * action
                     */
                    onClickTrashIcon={clickTrashIcon}
                    increaseProductCount={IncreaseProductCount}
                    decreaseProductCount={DecreaseProductCount}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* End Available Products */}

        {/* Unavailable Product */}
        {(OutOfStockProduct.length > 0 || StockLeftProduct.length > 0) && (
          <div className='space-y-3'>
            <div className='w-11/12 h-auto mx-auto'>
              <p className='tertiary-font text-color-secondary'>
                {t('ShoppingCart.unavailable-products')} ({' '}
                {unavailable_number_product} )
              </p>
            </div>

            {/* Out Of Stock Products */}
            {OutOfStockProduct.map((product, idx) => (
              <div
                key={idx}
                className='hover:bg-blue-100 cursor-pointer md:py-3'
              >
                <div className='w-11/12 h-auto mx-auto space-y-3'>
                  <ProductCart
                    Item={product}
                    CurrentIndex={idx}
                    PRODUCT_TYPE={OUT_OF_STOCK_PRODUCT}
                    /**
                     * action
                     */
                    onClickTrashIcon={clickTrashIcon}
                    increaseProductCount={IncreaseProductCount}
                    decreaseProductCount={DecreaseProductCount}
                  />
                  <div className='space-y-2'>
                    <div className='bg-gray-100 p-2'>
                      <div className='flex space-x-3'>
                        <div className='w-5 md:w-4 h-auto'>
                          <img
                            src={ExclamationMarkIcon}
                            className='w-full h-full mx-auto'
                            alt='Exclamation Mark'
                          />
                        </div>
                        <div className='space-y-2'>
                          <p className='tertiary-font font-medium text-color-default'>
                            {t('ShoppingCart.selected_item_out_of_stock')}
                          </p>
                          <p className='caption-font text-color-secondary font-medium'>
                            {t('ShoppingCart.remove-product')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End Out Of Stock Products */}

            {/* Stock Left Products */}
            {StockLeftProduct.map((product, idx) => (
              <div
                key={idx}
                className='hover:bg-blue-100 cursor-pointer md:py-3'
              >
                <div className='w-11/12 h-auto mx-auto space-y-3'>
                  <ProductCart
                    Item={product}
                    CurrentIndex={idx}
                    PRODUCT_TYPE={STOCK_LEFT_PRODUCT}
                    /**
                     * action
                     */
                    onClickTrashIcon={clickTrashIcon}
                    increaseProductCount={IncreaseProductCount}
                    decreaseProductCount={DecreaseProductCount}
                  />
                  <div className='space-y-2'>
                    <div className='bg-gray-100 space-y-2 p-2'>
                      <div className='flex space-x-3'>
                        <div className='w-5 md:w-4 h-auto'>
                          <img
                            src={ExclamationMarkIcon}
                            className='w-full h-full mx-auto'
                            alt='Exclamation Mark'
                          />
                        </div>
                        <div className='space-y-2'>
                          <p className='tertiary-font font-medium text-color-default'>
                            {t('ShoppingCart.not-enough-stock')}
                          </p>
                          <p className='caption-font text-color-secondary font-medium'>
                            {t('ShoppingCart.update-your-cart')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className='caption-font text-color-danger text-right'>
                          {product.availableQty}{' '}
                          {t('ShoppingCart.only-stock-left')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End Stock Left Products */}
          </div>
        )}
        {/* End Unavailable Products */}
      </div>
    </div>
  );
};

export default MyCart;
