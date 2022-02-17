import React from "react";
import { useTranslation } from "react-i18next";

//components
import PlaceHolderImage from "../../../CommonComponent/placeholder_image";
import moneyFormatter from "../../../../util/moneyFormatter";
import VariantItems from "../ProductVariation/variant_items";
import { BUY_NOW, ADD_TO_SHOP_CART, NO_VARIANT_CONFIG } from "../../util";

//images
import MinusIcon from "../../../../assets/productDetail/minus_icon.svg";
import PlusIcon from "../../../../assets/productDetail/plus_icon.svg";
import BuyNowIcon from "../../../../assets/productDetail/buy_now_icon.svg";
import ShopCartIcon from "../../../../assets/productDetail/shopping_cart_icon.svg";
import AuthLoadingBlack from "../../../../assets/Authentication/Loading/auth_loading_black.gif";
import BackArrowIcon from "../../../../assets/common/back_arrow.svg";

export const PriceLabel = ({
  original_price = 0,
  promote_price = 0,
  promote_percent = 0,
}) => {
  const { t } = useTranslation();
  if (promote_percent > 0)
    return (
      <div className="space-y-1">
        <p className="primary-font text-color-primary custom-font-bold">
          {moneyFormatter(promote_price)} {t("Common.kyats")}
        </p>
        <p className="tertiary-font text-color-secondary line-through">
          {moneyFormatter(original_price)} {t("Common.kyats")}
        </p>
      </div>
    );

  return (
    <p className="primary-font text-color-primary">
      {moneyFormatter(original_price)} {t("Common.kyats")}
    </p>
  );
};

export const VariantLoading = () => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="w-7 h-auto">
          <img
            src={AuthLoadingBlack}
            className="w-full h-full"
            alt="Variant Loading"
          />
        </div>
        {/* <p className="tertiary-font text-color-default">Loading ....</p> */}
      </div>
    </>
  );
};

export const ProductImage = ({ ImageArray = [] }) => {
  return (
    <>
      <div className="w-20 md:w-28 h-auto">
        {ImageArray.length > 0 ? (
          <img
            src={ImageArray[0].url}
            className="w-full h-full"
            alt="Product Image"
          />
        ) : (
          <PlaceHolderImage />
        )}
      </div>
    </>
  );
};

const ProductVariantDialogBox = ({
  isLoading,
  ProductImageArray = [],
  ProductName = "",
  OriginalPrice = 0,
  PromotePercent = 0,
  PromotePrice = 0,
  VariantList = [],
  SelectedVariantList = [],
  SelectedSku = [],
  VariantConfig = "",
  ItemCount = 0,
  CurrentIndex,
  /**
   * action
   */
  confirmSelectedVariant,
  IncreaseItemCount,
  DecreaseItemCount,
  ChangeOnCountTextBox,
  AddToCart,
  BuyNow,
  closeVariantBox,
}) => {
  const { t } = useTranslation();
  console.log(SelectedSku);
  console.log(ItemCount);

  const exceedQtyCheck = () => {
    if (SelectedSku.length <= 0) return;
    if (SelectedSku[0].qty < ItemCount) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="w-full h-auto max-w-screen-sm md:mx-auto backdrop-filter backdrop-blur-sm">
        <div className="bg-white w-11/12 md:w-full h-auto mx-auto py-5 rounded-lg">
          <div className="mx-4 space-y-8">
            <div className="flex justify-between items-center">
              <div
                className="w-3 h-auto cursor-pointer"
                onClick={closeVariantBox}
              >
                <img
                  src={BackArrowIcon}
                  className="w-full h-full"
                  alt="Back Arrow Icon"
                />
              </div>
              <p className="sub-heading-font text-color-default">
                Select Variations
              </p>
              <div
                className="w-3 mr-1.5 h-auto cursor-pointer"
                onClick={closeVariantBox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </div>
            </div>

            <div className="flex space-x-4">
              <ProductImage ImageArray={ProductImageArray} />
              {/* {SelectedSku.length > 0 ? (
                <ProductImage ImageArray={SelectedSku[0].productSkuImages} />
              ) : (
                <ProductImage ImageArray={ProductImageArray} />
              )} */}
              
              <div className="space-y-1 my-auto">
                <p className="primary-font text-color-primary custom-font-bold">{ProductName}</p>
                {SelectedSku.length > 0 ? (
                  <PriceLabel
                    original_price={SelectedSku[0].originalPrice}
                    promote_price={SelectedSku[0].promotePrice}
                    promote_percent={SelectedSku[0].promotePercent}
                  />
                ) : (
                  <PriceLabel
                    original_price={OriginalPrice}
                    promote_price={PromotePrice}
                    promote_percent={PromotePercent}
                  />
                )}
              </div>
            </div>

            {VariantList.length > 0 &&
              VariantList.map((variant, variant_index) => (
                <React.Fragment key={variant_index}>
                  <div className="space-y-4">
                    <p className="primary-font text-color-default">
                      {variant.name}
                    </p>
                    {CurrentIndex.currentVariantIndex + 1 === variant_index &&
                      isLoading ? (
                      <VariantLoading />
                    ) : variant.show ? (
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                          {variant.variantValue.length > 0 &&
                            variant.variantValue.map(
                              (variant_value, variant_value_index) => (
                                <VariantItems
                                  key={variant_value_index}
                                  value={variant_value}
                                  isSelected={
                                    SelectedVariantList[variant_index]
                                      .value_id === variant_value.valueId
                                  }
                                  /**
                                   * action
                                   */
                                  ConfirmSelectedVariant={() =>
                                    confirmSelectedVariant(
                                      variant,
                                      variant_value,
                                      variant_index,
                                      variant_value_index
                                    )
                                  }
                                />
                              )
                            )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-auto h-auto bg-gray-100 py-2 px-3">
                        <p className="text-color-secondary tertiary-font">
                          Please Select {VariantList[variant_index - 1].name}
                        </p>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}

            <div className="w-full h-auto flex justify-between space-x-4">
              <div className="w-4/12 md:w-3/12 h-auto">
                <div className="flex items-center justify-between">
                  <div
                    className="w-20 md:w-8 h-auto cursor-pointer"
                    onClick={DecreaseItemCount}
                  >
                    <img
                      src={MinusIcon}
                      className="w-full h-full"
                      alt="Minus Icon"
                    />
                  </div>
                  {/* <p className="primary-font text-color-default">{ItemCount}</p> */}
                  <input
                    type="number"
                    value={ItemCount}
                    className="w-full md:w-6/12 h-auto bg-white text-color-default text-center primary-font py-2"
                    onChange={ChangeOnCountTextBox}
                    disabled={SelectedSku.length > 0 ? false : true}
                  />
                  <div
                    className={`w-20 md:w-8 h-auto cursor-pointer ${exceedQtyCheck() && "opacity-60"
                      }`}
                    onClick={IncreaseItemCount}
                  >
                    <img
                      src={PlusIcon}
                      className="w-full h-full"
                      alt="Plus Icon"
                    />
                  </div>
                </div>
              </div>
              <div className="w-8/12 md:w-8/12 h-auto">
                {VariantConfig === BUY_NOW && (
                  <button
                    className="primary-btn tertiary-font text-color-white py-2"
                    onClick={BuyNow}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-auto">
                        <img
                          src={BuyNowIcon}
                          className="w-full h-full"
                          alt="Buy Now Icon"
                        />
                      </div>
                      <p className="truncate">{t("ProductDetails.buy-now")}</p>
                    </div>
                  </button>
                )}
                {VariantConfig === ADD_TO_SHOP_CART && (
                  <button
                    className="secondary-btn tertiary-font text-color-default py-2 border-yellow-400"
                    onClick={AddToCart}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-auto">
                        <img
                          src={ShopCartIcon}
                          className="w-full h-full"
                          alt="Add To Cart Icon"
                        />
                      </div>
                      <p className="truncate">
                        {t("ProductDetails.add-to-cart")}
                      </p>
                    </div>
                  </button>
                )}
                {VariantConfig === NO_VARIANT_CONFIG && (
                  <div className="grid grid-cols-2 gap-x-2">
                    <button
                      className="primary-btn tertiary-font text-color-white py-2"
                      onClick={BuyNow}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-auto">
                          <img
                            src={BuyNowIcon}
                            className="w-full h-full"
                            alt="Buy Now Icon"
                          />
                        </div>
                        <p className="truncate">
                          {t("ProductDetails.buy-now")}
                        </p>
                      </div>
                    </button>
                    <button
                      className="secondary-btn tertiary-font text-color-default py-2"
                      onClick={AddToCart}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-auto">
                          <img
                            src={ShopCartIcon}
                            className="w-full h-full"
                            alt="Add To Cart Icon"
                          />
                        </div>
                        <p className="truncate">
                          {t("ProductDetails.add-to-cart")}
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductVariantDialogBox;
