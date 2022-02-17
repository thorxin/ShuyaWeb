import { connect } from 'react-redux'

import Home from '../components/Home/home'
import { fetch_mainCategoryDetail } from '../modules/action.bycategory'
import { update_ProductWishList } from './../modules/action.myaccount'

import {
  fetch_mainCategory,
  fetch_promotionProducts,
  fetch_latestProducts,
  fetch_brand,
  fetch_bestSellingProducts,
  fetch_productListByCategory,
  fetch_bannerList,
  fetch_buyOne_getOneList,
  fetch_pop_up_banner,
} from '../modules/action.home'

export default connect(
  (state) => ({
    isLoading: state.home.isLoading,
    mainCategory: state.home.mainCategory,
    mainCategoryDetail: state.home.mainCategoryDetail,
    promotionProducts: state.home.promotionProducts,
    latestProducts: state.home.latestProducts,
    brandProducts: state.home.homeBrand,
    bestSellingProducts: state.home.bestSellingProducts,
    productListByCategory: state.home.productListByCategory,
    bannerList: state.home.bannerList,
    ADList: state.home.ADList,
    buyOneGetOneList: state.home.buyOneGetOneList,
    popUpBanner: state.home.popUpBanner,
  }),
  (dispatch) => ({
    fetchMainCategory: () => dispatch(fetch_mainCategory()),
    fetchPromotionProducts: () => dispatch(fetch_promotionProducts()),
    fetchLatestProducts: () => dispatch(fetch_latestProducts()),
    fetchBrandProducts: () => dispatch(fetch_brand()),
    fetchBestSellingProducts: () => dispatch(fetch_bestSellingProducts()),
    fetchProductListByCategory: () => dispatch(fetch_productListByCategory()),
    fetchBannerList: (typeId) => dispatch(fetch_bannerList(typeId)),
    fetchBuyOneGetOneList: () => dispatch(fetch_buyOne_getOneList()),
    fetchMainCategoryDetail: () => dispatch(fetch_mainCategoryDetail()),
    fetchPopUpBanner: () => dispatch(fetch_pop_up_banner()),
    updateProductWishList: (productId, isFav) =>
      dispatch(update_ProductWishList(productId, isFav)),
  }),
)(Home)
