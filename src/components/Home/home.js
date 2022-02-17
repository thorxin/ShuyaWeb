/** @format */

import React, { useEffect, useState } from 'react'
import { Hook } from './hook'
import { useHistory } from 'react-router-dom'

/**
 * images
 */
import CloseIcon from '../../assets/common/close_icon.svg'

/**
 * components
 */
import Loading from '../CommonComponent/Loading/main_loading'
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
import NavigationMobile from '../CommonComponent/Navigation/NavigationMobile'
import MainCategories from './Category'
import HomeCategory from './Category/HomeCategory'
import PromotionProducts from './PromotionProducts'
import LatestProducts from './LatestProducts'
import Brand from './Brand'
import BestSellingProducts from './BestSellingProducts'
import ProductListByCategory from './ProductListByCategory'
import ProductListByCategoryMobile from './ProductListByCategory/ProductListByCategoryMobile'
import BannerSlider from './BannerSlider'
import ADSlider from './ADSlider'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import BuyOneGetOne from './BuyOneGetOne'
import DialogBox from '../CommonComponent/DialogBox/dialog_box'
import placeholder from '../../assets/common/placeholder_icon.svg'
import { goToProductSearchResult } from '../../util/goToSpecificPathName'
import { SEARCH_PROMOTION } from '../../constant/search'
export default function HomePage(props) {
  const [
    isLoading,
    mainCategoryDetail,
    promotionProducts,
    latestProducts,
    brandProducts,
    bestSellingProducts,
    productListByCategory,
    bannerList,
    ADList,
    buyOneGetOneList,
    /**
     * action
     */
    clickingOnProductWishIcon, // need product id && whitelist state [local state]
  ] = Hook(props)

  const { popUpBanner = {} } = props

  let history = useHistory()

  const [isOpenPopupBox, setIsOpenPopupBox] = useState(false)
  const [bannnerClick, setIsBannerClick] = useState(true)

  useEffect(() => {
    if (popUpBanner?.url) {
      setIsOpenPopupBox(true)
    } else {
      setIsOpenPopupBox(false)
    }
  }, [popUpBanner?.url])

  if (isLoading) return <Loading />

  const goPromotionPage = () => {
    let propsData = {
      searchType: SEARCH_PROMOTION,
    }
    goToProductSearchResult(history, propsData)
  }

  return (
    <>
      <div className="w-full h-auto min-h-screen">
        <div className="">
          <NavigationWeb />
          <NavigationMobile />
          <div className="h-14 w-full block md:hidden"></div>

          {bannnerClick ? (
            <>
              <div className="mx-auto space-y-2 md:mb-0 relative w-full">
                <div className="mt-20">
                  <BannerSlider BannerListArray={bannerList} />
                </div>
              </div>
            </>
          ) : null}

          {/* <div className='mx-auto space-y-2 md:mb-0'>
            <div className='w-full md:w-5/12 2xl:w-6/12 h-auto mx-auto'>
              <div className='md:mt-2 mt-4'>
                <MainCategories categoryArray={mainCategoryDetail} />
              </div>
            </div>
          </div> */}
        </div>

        <div className="bg-white">
          <div className="container">
            <HomeCategory categoryArray={mainCategoryDetail}></HomeCategory>
          </div>
        </div>

        <div className="bg-gradient-to-r from-custom-main to-custom-primary rounded-t-2xl md:rounded-none">
          <div className="container">
            <BuyOneGetOne
              // toggleFav={clickingOnProductWishIcon}
              productsArray={buyOneGetOneList}
              onClickWishList={clickingOnProductWishIcon}
            />
          </div>
        </div>

        <div className="mx-auto space-y-2 md:mb-0 bg-gray-100">
          <div className="container">
            <PromotionProducts
              // toggleFav={clickingOnProductWishIcon}
              productArray={promotionProducts}
              onClickWishList={clickingOnProductWishIcon}
            />
          </div>
        </div>

        <div className="mx-auto space-y-2 bg-custom-main-light">
          <div className="container">
            <div className="">
              <LatestProducts
                // toggleFav={clickingOnProductWishIcon}
                productArray={latestProducts}
                onClickWishList={clickingOnProductWishIcon}
              />
            </div>
          </div>
        </div>

        {ADList.length >= 1 ? null : <div className="h-1  bg-gray-100"></div>}

        {ADList.length >= 1 ? (
          <>
            <div className="mx-auto space-y-2 md:mb-0">
              <div className="md:mt-2">
                <ADSlider ADListArray={ADList} />
              </div>
            </div>
          </>
        ) : null}

        {/* {bestSellingProducts.length >= 1 && (
          <>
            <div className='mx-auto space-y-2'>
              <div className='w-full md:w-9/12 2xl:w-9/12 h-auto mx-auto'>
                <div className='mt-2'>
                  <BestSellingProducts
                    // toggleFav={clickingOnProductWishIcon}
                    productArray={bestSellingProducts}
                    onClickWishList={clickingOnProductWishIcon}
                  />
                </div>
              </div>
            </div>
            <div className='h-1  bg-gray-100'></div>
          </>
        )} */}

        {/* <div className='mx-auto space-y-2'>
          <div className='w-full md:w-9/12 2xl:w-9/12 h-auto mx-auto'>
            <div className='md:mt-2'>
              <Brand categoryArray={brandProducts} />
            </div>
          </div>
        </div> */}

        <div className="h-1  bg-gray-100"></div>

        <div className="mx-auto space-y-2 mb-20 md:mb-0 block md:hidden">
          <div className="w-full">
            <div className="md:mt-2">
              {Array.isArray(productListByCategory) &&
                productListByCategory.length > 0 &&
                productListByCategory.map((c, i) => (
                  <ProductListByCategoryMobile
                    key={c.id}
                    category={c}
                    productList={c.productListBuyers}
                    i={i}
                    length={productListByCategory.length}
                    onClickWishList={clickingOnProductWishIcon}
                    // toggleFav={clickingOnProductWishIcon}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="mx-auto space-y-2 mb-20 md:mb-0 hidden md:block">
          <div className="w-full md:w-9/12 2xl:w-9/12 h-auto mx-auto">
            {Array.isArray(productListByCategory) &&
              productListByCategory.length > 0 && (
                <ProductListByCategory categories={productListByCategory} />
              )}
          </div>
        </div>

        <FooterWeb />
        <FooterMobile />
        {/* Promotion Popup  */}
        {/* <DialogBox isOpen={isOpenPopupBox} closeModal={() => setIsOpenPopupBox(false)}>
          <div className="w-80 h-auto md:w-96 lg:w-full md:max-w-screen-sm max-h-min mx-auto backdrop-filter">
            <div className="mx-auto py-5 w-10/12 lg:w-5/12 xl:w-7/12 relative">
              <img onClick={goPromotionPage} src={popUpBanner?.url ? popUpBanner?.url : placeholder} onError={(e) => e.target.src = placeholder} alt="promotion popup" className="w-full h-full cursor-pointer" />
              //Close Svg 
              <svg className="absolute -top-0.5 -right-1.5 cursor-pointer" onClick={() => setIsOpenPopupBox(false)} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 24 24" width="25px" fill="#ffffff">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>
          </div>
        </DialogBox> */}
      </div>
    </>
  )
}
