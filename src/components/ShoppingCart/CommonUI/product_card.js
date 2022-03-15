import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
//components
import CostLabel from './cost_label'
import { STOCK_LEFT_PRODUCT, OUT_OF_STOCK_PRODUCT } from '../util'

//images
import MinusIcon from '../../../assets/productDetail/minus_icon.svg'
import PlusIcon from '../../../assets/productDetail/plus_icon.svg'
import TrashIcon from '../../../assets/shoppingcart/Trash_icon.svg'

export const ProductCart = ({
  Item = {},
  CurrentIndex,
  PRODUCT_TYPE,
  IsNotBuyNow = false,
  /**
   * action
   */
  decreaseProductCount,
  increaseProductCount,
  onClickTrashIcon,
}) => {
  const { t } = useTranslation()
  let history = useHistory()
  const isStockLeft = () => {
    if (PRODUCT_TYPE === STOCK_LEFT_PRODUCT) return true

    return false
  }

  const isOutOfStock = () => {
    if (PRODUCT_TYPE === OUT_OF_STOCK_PRODUCT) return true

    return false
  }

  const goPage = (productId) => {
    history.push(`/productdetails?productId=${productId}`)
  }

  return (
    <div>
      <div className="w-full h-auto md:mx-auto">
        <div className="grid grid-cols-8">
          <div
            // onClick={() => goPage(Item.productId)}
            className={`col-span-7 ${
              isOutOfStock() ? 'opacity-40' : 'opacity-100'
            } `}
          >
            <div className="flex space-x-4 items-start">
              <div className="w-36 md:w-32 h-auto">
                <img
                  src={Item.productUrl}
                  className="w-full h-full object-contain border-2 border-gray-200"
                  alt="ItemImage"
                />
              </div>
              <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-2 gap-y-3">
                {/* Product Price And Point */}
                <div className="space-y-1">
                  {/* Buy 1 Get 1  */}
                  {Item.isGetOne && (
                    <div className="w-24 text-center">
                      <p className="py-0.5 px-2 bg-red-500 text-color-white text-base">
                        Buy 1 Get 1
                      </p>
                    </div>
                  )}
                  <p className="primary-font custom-font-bold text-color-default">
                    {Item.name}
                  </p>
                  <CostLabel
                    OriginalPrice={Item.price}
                    PromotePrice={Item.promotePrice}
                  />
                  <p className="tertiary-font text-color-secondary">
                    {Item.variation === 'Default' ? '' : Item.variation}
                  </p>
                </div>
                {/* For Mobile Buy 1 Get 1  */}
                {Item.isGetOne && (
                  <div className="flex md:hidden gap-2 items-center">
                    <img
                      src={Item.productUrl}
                      className="w-7 h-full object-contain"
                      alt="ItemImage"
                    />
                    <p className="tertiary-font text-base text-color-secondary">
                      Buy 1 get 1 same item
                    </p>
                  </div>
                )}

                {/* End  */}
                {isOutOfStock() ? (
                  <div className="my-auto">
                    <p className="caption-font text-color-default">
                      {t('ShoppingCart.out-of-stock')}
                    </p>
                  </div>
                ) : (
                  <div className="items-center space-x-5 flex">
                    <div
                      className="w-7 h-auto"
                      onClick={() =>
                        decreaseProductCount({
                          type: PRODUCT_TYPE,
                          index: CurrentIndex,
                          qty: Item.qty,
                        })
                      }
                    >
                      <img
                        src={MinusIcon}
                        className="w-full h-auto"
                        alt="Minus Icon"
                      />
                    </div>
                    <div className="tertiary-font text-color-default">
                      {Item.qty}
                    </div>
                    <div
                      className={`w-7 h-auto ${
                        isStockLeft() ? 'opacity-40' : 'opacity-100'
                      }`}
                      onClick={() =>
                        increaseProductCount({
                          type: PRODUCT_TYPE,
                          index: CurrentIndex,
                          qty: Item.qty,
                        })
                      }
                    >
                      <img
                        src={PlusIcon}
                        className="w-full h-auto"
                        alt="Minus Icon"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* For Web Buy 1 Get 1  */}
            {Item.isGetOne && (
              <div className="md:flex hidden gap-2 items-center py-3 md:py-2">
                <div className="w-24 ml-1 md:w-24 md:ml-2.5 "></div>
                <img
                  src={Item?.promotionGetOne?.url}
                  className="w-7 h-full object-contain"
                  alt="ItemImage"
                />
                {Item?.productId === Item?.promotionGetOne?.getOneProductId ? (
                  <p className="tertiary-font text-base text-color-secondary">
                    Buy 1 get 1{' '}
                    {Item?.productId === Item?.promotionGetOne?.getOneProductId
                      ? 'same'
                      : 'different'}{' '}
                    item
                  </p>
                ) : (
                  <p className="tertiary-font text-base text-color-secondary">
                    Free "{Item?.promotionGetOne?.getOneProductName}"
                  </p>
                )}
              </div>
            )}

            {/* End  */}
          </div>
          <div className="col-span-1 md:my-auto">
            {!IsNotBuyNow && (
              <div
                className=" w-4 h-auto float-right"
                onClick={() =>
                  onClickTrashIcon(
                    t('ShoppingCart.remove-each-product'),
                    Item.productId,
                    Item.skuId,
                    PRODUCT_TYPE,
                  )
                }
              >
                <img
                  src={TrashIcon}
                  className="w-full h-full"
                  alt="Trash Icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
