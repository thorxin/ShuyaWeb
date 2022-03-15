/** @format */

import React, { useState,useEffect,useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share'

//components
import { Hook } from './hook'
import ProductImageSlide from './image_slide'
import { CostLabel } from './CommonUI/cost_label'
import ProductVariation from './ProductVariation/product_variation'
import ProductCategory from './ProductCategory/product_category'
import ProductOffers from './ProductOffers'
import SizeChart from './SizeChart'
import ProductDescription from './ProductDescription'
import ProductClip from './ProductClip'
import ProductVariantDialogBox from './ProductVariantDialogBox'
import ProductImageDialogBox from './ProductImageDialogBox'
import { BUY_NOW, ADD_TO_SHOP_CART, NO_VARIANT_CONFIG } from '../util'
import DialogBox from '../../CommonComponent/DialogBox/dialog_box'
import { APP_NAME } from '../../../constant/appName'
import ProductSizeDialogBox from '../Common/ProductSizeDialogBox'


//images
import ActiveRatingStar from '../../../assets/productDetail/active_rating_star.svg'
import RatingStar from '../../../assets/productDetail/rating_star.svg'
import MinusIcon from '../../../assets/productDetail/minus_icon.svg'
import PlusIcon from '../../../assets/productDetail/plus_icon.svg'
import MessageIcon from '../../../assets/productDetail/message.svg'
import BuyNowIcon from '../../../assets/productDetail/buy_now_icon.svg'
import BuyNowIconMobile from '../../../assets/productDetail/dollar_mobile.svg'
import ShopCartIcon from '../../../assets/productDetail/shopping_cart_icon.svg'
import ShopCartIconMobile from '../../../assets/productDetail/shopping_cart_mobile.svg'
import WishIcon from '../../../assets/productDetail/wish_icon.svg'
import ActiveWishIcon from '../../../assets/productDetail/wish_icon_active.svg'
import WishIconOne from '../../../assets/productDetail/wish_icon_1.svg'
import ActiveWishIconOne from '../../../assets/home/wishlist_active.svg'
import ShareIconMobile from '../../../assets/home/wishlist_no_active.svg'
import ShareIconOne from '../../../assets/productDetail/share_icon_one.svg'
import BackIconMobile from '../../../assets/productDetail/back_icon_mobile.svg'
import BackArrowImage from '../../../assets/common/left_arrow_image.png'
import placeholder from '../../../assets/common/placeholder_icon.svg'
import Brand from './Brand/Brand'
import moneyFormatter from '../../../util/moneyFormatter'
import {
  FACEBOOK,
  FACEBOOK_NAME,
  MESSENGER,
  MESSENGER_NAME,
  PHONE,
  WEBSITE,
  WEBSITE_NAME,
} from '../../../constant/contactUs'

export const ProductSharingBox = ({ shared_url = "", isShow = false,onClickOutside }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClickOutside ]);
  return (
    <>
      <div
        ref={ref}
        className={`${
          isShow ? "block" : "hidden"
        } w-full h-auto bg-white shadow-lg border py-3 px-3`}
      >
        <div className='default-margin-layout space-y-4'>
          <div className='flex flex-1'>
            <div className='tertiary-font mx-auto'>
              <FacebookShareButton
                url={shared_url}
                quote={"The best e-Commerce website in Myanmar"}
                hashtag={`#${APP_NAME.replaceAll(" ", "")}`}
              >
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>
            </div>
            {/* <div className="tertiary-font mx-auto">
              <FacebookMessengerShareButton>
                <FacebookMessengerIcon size={30} round={true} />
              </FacebookMessengerShareButton>
            </div> */}
            <div className='tertiary-font mx-auto'>
              <ViberShareButton url={shared_url}>
                <ViberIcon size={30} round={true} />
              </ViberShareButton>
            </div>
            <div className='tertiary-font mx-auto'>
              <TelegramShareButton url={shared_url}>
                <TelegramIcon size={30} round={true} />
              </TelegramShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ContactUsMobile = ({ setOpenContactUsMobile }) => {
  return (
    <>
      <div className="fixed bottom-0 z-10 h-screen w-full bg-black opacity-40"></div>
      <div className="grid grid-cols-1 z-20 px-3 py-4 gap-0.5 fixed bottom-0 w-full bg-gray-300">
        <div className="bg-white w-full rounded-md rounded-b-none">
          <p className="py-3 pl-5">
            <a
              href={`tel:${PHONE}`}
              className="text-md font-semibold text-color-secondary"
            >
              (Contact) {PHONE}
            </a>
          </p>
        </div>
        <div className="bg-white w-full">
          <p className="py-3 pl-5">
            <a
              href={MESSENGER}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-color-secondary"
            >
              (Messenger) {MESSENGER_NAME}
            </a>
          </p>
        </div>
        <div className="bg-white w-full">
          <p className="py-3 pl-5">
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-color-secondary"
            >
              (Facebook) {FACEBOOK_NAME}
            </a>
          </p>
        </div>
        <div className="bg-white w-full rounded-md rounded-t-none">
          <p className="py-3 pl-5">
            <a
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-color-secondary"
            >
              (Website) {WEBSITE_NAME}
            </a>
          </p>
        </div>
        {/* Cancle Btn */}
        <button
          onClick={() => setOpenContactUsMobile(false)}
          className="text-color-secondary font-semibold text-md w-full bg-white mt-4 rounded-md py-3"
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export const ContactUsWeb = ({ setOpenContactUsWebsite }) => {
  return (
    <div className="w-full h-auto max-w-screen-sm md:mx-auto backdrop-filter backdrop-blur-sm">
      <div className="bg-white w-7/12 relative h-auto mx-auto py-5 rounded-lg">
        <div
          className="absolute cursor-pointer right-0.5 top-1"
          onClick={() => setOpenContactUsWebsite(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
        <div className="mx-4">
          <div className="bg-white w-full rounded-md rounded-b-none">
            <p className="py-2">
              <a
                href={`tel:09 - 777001947`}
                className="text-md font-semibold text-color-secondary"
              >
                (Contact) 09 - 777001947 / 09 - 777001946
              </a>
            </p>
          </div>
          <div className="bg-white w-full">
            <p className="py-2">
              <a
                href={MESSENGER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-semibold text-color-secondary"
              >
                (Messenger) {MESSENGER_NAME}
              </a>
            </p>
          </div>
          <div className="bg-white w-full">
            <p className="py-2">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-semibold text-color-secondary"
              >
                (Facebook) {FACEBOOK_NAME}
              </a>
            </p>
          </div>
          <div className="bg-white w-full rounded-md rounded-t-none">
            <p className="py-2">
              <a
                href={WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-semibold text-color-secondary"
              >
                (Website) {WEBSITE_NAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductInfo = ({
  isSecondaryLoading,
  Detail = {},
  CartCount = 0,
  IsFavWish,
  /**
   * action
   */
  clickOnWishList,
  goBackTo,
}) => {
  const [
    isOpenVariantBox,
    setIsOpenVariantBox,
    isImageOpenVariantBox,
    setIsImageOpenVariantBox,
    isImageOpenSizeBox,
    setIsImageOpenSizeBox,
    variantConfigType,
    updatedVariantList,
    selectedVariantList,
    selectedSku,
    itemCount,
    currentIndex,
    isShowShareBox,
    setIsShowShareBox,
    /**
     * action
     */
    openVariantBox,
    openImageVariantBox,
    openImageSizeChatBox,
    clickingVariantItem,
    increaseItemCount,
    decreaseItemCount,
    addToCart,
    buyNow,
    changeOnCountTextBox,
    clickOnShopCart,
  ] = Hook(Detail);

  const { t } = useTranslation()
  const history = useHistory()
  const [openContactUsMobile, setOpenContactUsMobile] = useState(false)
  const [openContactUsWebsite, setOpenContactUsWebsite] = useState(false)
  const sharedUrl = String(window.location.href)
  let shareButton = (
    <>
      <div
        className="hidden md:flex justify-end cursor-pointer"
        onClick={() => setIsShowShareBox(!isShowShareBox)}
      >
        <img src={ShareIconOne} className="w-4 h-auto" alt="Share Icon One" />
        <p className="text-lg text-color-secondary py-1 px-2">
          {t('ProductDetails.share')}
        </p>
      </div>
      <div
        className="block md:hidden"
        onClick={() => setIsShowShareBox(!isShowShareBox)}
      >
        <div className=" mr-5 mt-1">
          <img src={ShareIconMobile} className="w-8 h-auto" alt="Share Icon" />
        </div>
      </div>
      <div
        className="w-9/12 h-auto absolute left-8 top-10
       hidden md:block"
      >
        <ProductSharingBox shared_url={sharedUrl} isShow={isShowShareBox} onClickOutside={()=>setIsShowShareBox(false)}/>
      </div>
    </>
  )

  let AppRating = (
    <div className="flex space-x-1 items-center">
      <div>
        <p className="tertiary-font text-color-default"> 4.5 </p>
      </div>
      <div>
        <img
          src={ActiveRatingStar}
          className="w-4 md:w-3 h-auto"
          alt="RatingStarIcons"
        />
      </div>
      <div>
        <img
          src={ActiveRatingStar}
          className="w-4 md:w-3 h-auto"
          alt="RatingStarIcons"
        />
      </div>
      <div>
        <img
          src={RatingStar}
          className="w-4 md:w-3 h-auto"
          alt="RatingStarIcons"
        />
      </div>
      <div>
        <img
          src={RatingStar}
          className="w-4 md:w-3 h-auto"
          alt="RatingStarIcons"
        />
      </div>
      <div>
        <img
          src={RatingStar}
          className="w-4 md:w-3 h-auto"
          alt="RatingStarIcons"
        />
      </div>
    </div>
  )

  return (
    <>
      {/* Back Arrow, Share Icon and ShopCart Icon Section - Header - For only Mobile View */}
      <div className="bg-custom-orange z-30 h-auto md:hidden px-4 sticky top-0 w-full bg-white shadow-md">
        <div className="flex justify-between py-3 default-margin-layout">
          <div className="my-auto" onClick={goBackTo}>
            <img
              src={BackIconMobile}
              className="w-8 h-auto"
              alt="Back Arrow White"
            />
          </div>
          <div className="flex space-x-3">
            {shareButton}
            <div className="relative" onClick={clickOnShopCart}>
              {CartCount > 0 && (
                <div className="absolute -top-2 right-4 w-5 h-5 rounded-full flex items-center justify-center bg-red-600">
                  <p className="text-color-white caption-font">{CartCount}</p>
                </div>
              )}
              <div className="pt-1">
                <img
                  src={ShopCartIconMobile}
                  className="w-8 h-auto"
                  alt="Cart Icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:pb-0">
        <div className="bg-white h-auto relative w-full md:w-5/12">
          <ProductImageSlide
            ProductImageArray={Detail.productImage}
            openImageVariantBox={openImageVariantBox}
            IsGetOne={Detail.isGetOne}
          />
          {/* {(selectedSku.length && selectedSku[0].value !== "Default") > 0 ? (
            <ProductImageSlide
              ProductImageArray={selectedSku[0].productSkuImages}
              openImageVariantBox={openImageVariantBox}
              defaultImage = {Detail.productImage}
            />
          ) : (
            <ProductImageSlide ProductImageArray={Detail.productImage} openImageVariantBox={openImageVariantBox} />
          )} */}
          {/* WishList  */}
          <img
            onClick={clickOnWishList}
            src={IsFavWish ? ActiveWishIconOne : WishIconOne}
            className="w-6 h-6 absolute top-2 right-2 cursor-pointer z-10"
            alt="Wish Icon"
          />
        </div>

        <div className=" w-full md:w-9/12">
          <div className="bg-white pb-4 md:py-4">
            <div className=" space-y-2">
              {/* For Web  */}
              {/* Buy 1 Get 1  */}
              {Detail.isGetOne &&
                (Detail?.promotionGetOne.productId ===
                Detail?.promotionGetOne.getOneProductId ? (
                  <div className="hidden ml-8 md:flex  md:-mt-4 md:mb-6 bg-gradient-to-r from-custom-main to-custom-primary h-12 items-center text-color-white">
                    <span className="h-7 w-7 ml-3 bg-black rounded-full flex items-center justify-center font-bold text-color-yellow">
                      +1
                    </span>
                    <p className="text-color-white custom-font-bold ml-2 primary-font">
                      Buy 1 get 1 same item
                    </p>
                  </div>
                ) : (
                  <div className="hidden ml-8 md:flex items-center text-color-white -mt-3 py-2 px-2 bg-gradient-to-r from-custom-main to-custom-primary">
                    <img
                      src={
                        Detail?.promotionGetOne?.getOneProductImage[0]
                          ?.thumbnailUrl
                          ? Detail?.promotionGetOne?.getOneProductImage[0]
                              ?.thumbnailUrl
                          : placeholder
                      }
                      alt="ProductImg"
                      className="h-14 w-14 flex flex-shrink-0 object-cover"
                      onError={(e) => (e.target.src = placeholder)}
                    />
                    <div className="flex flex-col pl-3">
                      <span className="text-sm font-normal">
                        Get this item free for buying {Detail?.name}
                      </span>
                      <span className="text-base font-medium">
                        {Detail?.promotionGetOne.getOneProductName}
                      </span>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm font-normal">Only</span>
                        <span className="text-md font-semibold text-color-primary">
                          {moneyFormatter(
                            Detail?.promotionGetOne.getOneOriginalPrice,
                          )}{' '}
                          {t('Common.kyats')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              {/* End For Web  */}

              <div className="flex justify-between relative">
                {Detail.promotePercent > 0 && (
                  <div className="md:col-span-2 md:my-2 mx-4 md:mx-8">
                    <div className="flex ">
                      <p className="tertiary-font text-color-white bg-promote-price-percent px-3 py-1">
                        {Detail.promotePercent}% Off
                      </p>
                    </div>
                  </div>
                )}
                <div className="md:flex gap-3 md:my-2 mx-4 md:mx-8">
                  <div className="col-span-6 hidden md:block">
                    {shareButton}
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <div
                      className=" w-6 md:w-6 h-auto cursor-pointer md:mr-auto mr-4 hidden md:block"
                      onClick={clickOnWishList}
                    >
                      <img
                        src={IsFavWish ? ActiveWishIcon : WishIcon}
                        className="w-full h-full -mb-2 md:mb-0"
                        alt="Wish Icon"
                      />
                    </div>
                    <p className="text-lg text-color-secondary hidden md:block">
                      Add to wishlist
                    </p>
                  </div>
                </div>
              </div>
              <ProductCategory CategoryArray={Detail?.categorySteps} />

              {Detail.isGetOne && (
                <div className="w-24 text-center mx-4 md:mx-8">
                  <p className="py-1 px-1 bg-red-500 text-color-white primary-font">
                    Buy 1 Get 1
                  </p>
                </div>
              )}
              <div className="mx-4 md:mx-8">
                <p className="sub-heading-font-h3 text-xl text-color-default">
                  {Detail.name}
                </p>
              </div>

              <div className="flex flex-wrap md:flex-wrap-reverse space-y-2 md:space-y-0 md:mx-5 md:mx-auto mt-0">
                <div className="w-full h-auto">
                  {selectedSku.length > 0 ? (
                    <CostLabel
                      PromotePercent={selectedSku[0]?.promotePercent}
                      Price={selectedSku[0]?.originalPrice}
                      PromotePrice={selectedSku[0]?.promotePrice}
                      IsGetOne={Detail?.isGetOne}
                    />
                  ) : (
                    <CostLabel
                      PromotePercent={Detail?.promotePercent}
                      Price={Detail?.originalPrice}
                      PromotePrice={Detail?.promotePrice}
                      IsGetOne={Detail?.isGetOne}
                    />
                  )}
                </div>
                {/* <div className=" w-full h-auto">{AppRating}</div> */}
              </div>
            </div>
          </div>
          <ProductVariation
            VariationArray={Detail.variantValues}
            SelectedVariantList={selectedVariantList}
            /**
             * action
             */
            OpenVariantBox={() => openVariantBox(NO_VARIANT_CONFIG)}
          />
          {/* For Mobile  */}
          <div className="bg-custom-orange md:hidden mt-1 fixed md:relative bottom-0 w-full h-auto z-30">
            {/* Buy 1 Get 1  */}
            {Detail.isGetOne &&
              (Detail?.promotionGetOne.productId ===
              Detail?.promotionGetOne.getOneProductId ? (
                <div className=" bg-custom-primary h-16 flex items-center text-color-white">
                  <span className="h-9 w-9 ml-3 bg-black rounded-full flex items-center justify-center font-bold text-color-yellow">
                    +1
                  </span>
                  <p className="text-color-white font-medium ml-5">
                    Buy 1 get 1 same item
                  </p>
                </div>
              ) : (
                <div className=" bg-gradient-to-r from-custom-main to-custom-primary h-20 flex items-center text-color-white">
                  <img
                    src={
                      Detail?.promotionGetOne?.getOneProductImage[0]
                        ?.thumbnailUrl
                        ? Detail?.promotionGetOne?.getOneProductImage[0]
                            ?.thumbnailUrl
                        : placeholder
                    }
                    alt="ProductImg"
                    className="h-16 w-16 ml-2 flex flex-shrink-0 object-cover"
                    onError={(e) => (e.target.src = placeholder)}
                  />
                  <div className="flex flex-col pl-3">
                    <span className="text-sm font-normal">
                      Get this item free for buying {Detail?.name}
                    </span>
                    <span className="text-base font-medium">
                      {Detail?.promotionGetOne.getOneProductName}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm font-normal">Only</span>
                      <span className="text-md font-semibold text-color-primary">
                        {moneyFormatter(
                          Detail?.promotionGetOne.getOneOriginalPrice,
                        )}{' '}
                        {t('Common.kyats')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            <div className="grid grid-cols-3">
              <button
                className="bg-gray-400 py-4 tertiary-font text-color-white"
                onClick={() => setOpenContactUsMobile(true)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-auto">
                    <img
                      src={MessageIcon}
                      className="w-full h-full"
                      alt="Buy Now Icon"
                    />
                  </div>
                  <p className="truncate">Contact Us</p>
                </div>
              </button>
              <button
                className="bg-custom-primary border-r-2 border-gray-200 tertiary-font text-color-default py-4 "
                onClick={() => openVariantBox(BUY_NOW)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-auto">
                    <img
                      src={BuyNowIconMobile}
                      className="w-4 h-5"
                      alt="Buy Now Icon"
                    />
                  </div>
                  <p className="truncate text-color-white">
                    {t('ProductDetails.buy-now')}
                  </p>
                </div>
              </button>
              <button
                className="border-custom-orange bg-gray-50 tertiary-font py-4"
                onClick={() => openVariantBox(ADD_TO_SHOP_CART)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-auto">
                    <img
                      src={ShopCartIcon}
                      className="w-full h-full"
                      alt="Add To Cart Icon"
                    />
                  </div>
                  <p className="truncate">{t('ProductDetails.add-to-cart')}</p>
                </div>
              </button>
            </div>
          </div>
          {/* For Web  */}
          <div className="bg-white hidden md:block mt-1 py-4 md:py-2 fixed md:relative bottom-0 w-full h-auto z-10">
            <div className="mx-4 md:ml-8">
              <div className="grid grid-cols-8 gap-x-2 md:grid-cols-1 md:gap-x-0 md:gap-y-6">
                <div className="">
                  <div className="lg:flex lg:justify-between items-center grid grid-cols-2 gap-x-3 gap-y-3">
                    <div className="grid grid-cols-3 flex-1">
                      <div
                        className="w-11 md:w-11 h-auto cursor-pointer"
                        onClick={decreaseItemCount}
                      >
                        <img
                          src={MinusIcon}
                          className="w-full h-full rounded-lg"
                          alt="Minus Icon"
                        />
                      </div>
                      <input
                        type="number"
                        value={itemCount}
                        className="w-full md:w-2/12 h-auto ml-4 bg-white text-color-default text-center primary-font py-2"
                        onChange={changeOnCountTextBox}
                        disabled={selectedSku.length > 0 ? false : true}
                      />
                      <div
                        className="w-11 md:w-11 h-auto cursor-pointer"
                        onClick={increaseItemCount}
                      >
                        <img
                          src={PlusIcon}
                          className="w-full h-full rounded-lg"
                          alt="Plus Icon"
                        />
                      </div>
                    </div>
                    <button
                      className="border-2 flex-1 border-custom-main rounded-lg tertiary-font py-2.5"
                      onClick={() => openVariantBox(BUY_NOW)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-auto">
                          <img
                            src={BuyNowIcon}
                            className="w-full h-full"
                            alt="Buy Now Icon"
                          />
                        </div>
                        <p className="truncate text-color-primary font-semibold">
                          {t('ProductDetails.buy-now')}
                        </p>
                      </div>
                    </button>
                    <button
                      className="border-2 flex-1 border-custom-main rounded-lg tertiary-font text-color-white py-2.5"
                      onClick={() => openVariantBox(ADD_TO_SHOP_CART)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-auto">
                          <img
                            src={ShopCartIcon}
                            className="w-full h-full"
                            alt="Add To Cart Icon"
                          />
                        </div>
                        <p className="truncate text-color-primary font-semibold">
                          {t('ProductDetails.add-to-cart')}
                        </p>
                      </div>
                    </button>
                    <button
                      className="bg-custom-primary w-16 rounded-lg tertiary-font text-color-white py-2.5"
                      onClick={() => setOpenContactUsWebsite(true)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-auto">
                          <img
                            src={MessageIcon}
                            className="w-full h-full"
                            alt="Buy Now Icon"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* About Brand  */}
          <Brand BrandData={Detail?.brand} />
          <ProductOffers
            ShippingInfo={Detail?.shippingInfo}
            ReturnPolicy={Detail?.returnPolicy}
            Warranty={Detail?.warranty}
            Installation={Detail?.installation}
          />
          <SizeChart ChartArray={Detail?.sizeChart} />
          <ProductDescription Description={Detail?.highLightMain.body} />
          <ProductClip Clip={Detail?.productClips} />
        </div>
      </div>
      {/* Start Contact Us For Mobile  */}
      {openContactUsMobile && (
        <ContactUsMobile setOpenContactUsMobile={setOpenContactUsMobile} />
      )}
      {/* Contact Us For Website  */}
      <DialogBox
        isOpen={openContactUsWebsite}
        closeModal={() => setOpenContactUsWebsite(false)}
      >
        <ContactUsWeb setOpenContactUsWebsite={setOpenContactUsWebsite} />
      </DialogBox>
      {/* End Contact Us For Mobile  */}
      <DialogBox isOpen={isOpenVariantBox} closeModal={openVariantBox}>
        <ProductVariantDialogBox
          isLoading={isSecondaryLoading}
          ProductImageArray={Detail.productImage}
          ProductName={Detail.name}
          OriginalPrice={Detail.originalPrice}
          PromotePercent={Detail.promotePercent}
          PromotePrice={Detail.promotePrice}
          VariantList={updatedVariantList}
          SelectedVariantList={selectedVariantList}
          SelectedSku={selectedSku}
          VariantConfig={variantConfigType}
          ItemCount={itemCount}
          CurrentIndex={currentIndex}
          /**
           * action
           */
          confirmSelectedVariant={clickingVariantItem}
          IncreaseItemCount={increaseItemCount}
          DecreaseItemCount={decreaseItemCount}
          ChangeOnCountTextBox={changeOnCountTextBox}
          AddToCart={addToCart}
          BuyNow={buyNow}
          closeVariantBox={() => setIsOpenVariantBox(false)}
        />
      </DialogBox>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={3}
        closeOnClick
        draggable
        hideProgressBar={true}
      />
      <div className="fixed bottom-0 w-full h-auto md:hidden">
      <ProductSharingBox shared_url={sharedUrl} isShow={isShowShareBox} onClickOutside={()=>setIsShowShareBox(false)}/>
      </div>
      <DialogBox
        isOpen={isImageOpenVariantBox}
        closeModal={openImageVariantBox}
      >
        <ProductImageDialogBox
          ProductImageArray={Detail.productImage}
          SelectedSku={selectedSku}
          /**
           * action
           */
          closeVariantBox={() => setIsImageOpenVariantBox(false)}
        />
      </DialogBox>
      <DialogBox
        isOpen={isImageOpenSizeBox!=''}
        closeModal={()=>setIsImageOpenSizeBox('')}
      >
        <ProductSizeDialogBox
          sizeChatimg={isImageOpenSizeBox}
          /**
           * action
           */
          closeVariantBox={() => setIsImageOpenSizeBox('')}
        />
      </DialogBox>
    </>
  )
}

export default ProductInfo
