/** @format */

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  GET_STORED_ACCESS_TOKEN,
  // PRODUCT_ID,
  // saveLastRoute,
  // saveLocalStorage,
} from './../../util/storage';
import { goToSpecificPathName } from './../../util/goToSpecificPathName';
import { LOGIN } from './../../constant/locationPathName.js';

import { BANNER_LIST_ID, AD_LIST_ID } from '../../constant/bannerConfig';

export function Hook({
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
   * Actions
   */
  fetchMainCategory,
  fetchPromotionProducts,
  fetchLatestProducts,
  fetchBrandProducts,
  fetchBestSellingProducts,
  fetchProductListByCategory,
  fetchBannerList,
  fetchBuyOneGetOneList,
  fetchMainCategoryDetail,
  fetchPopUpBanner,
  updateProductWishList,
}) {
  const [filterCategories, setFilterCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchMainCategory();
    fetchPromotionProducts();
    fetchLatestProducts();
    fetchBrandProducts();
    fetchBestSellingProducts();
    fetchProductListByCategory();
    fetchBannerList(AD_LIST_ID);
    fetchBannerList(BANNER_LIST_ID);
    fetchBuyOneGetOneList();
    fetchMainCategoryDetail();
    fetchPopUpBanner();
  }, []);

  const clickingOnProductWishIcon = (product_id, isFavWish) => {
    if (!GET_STORED_ACCESS_TOKEN) {
      goToSpecificPathName(history, LOGIN);
      return;
    }
    updateProductWishList(product_id, !isFavWish);
  };

  // show six categories to user interface  - BigDaddy
  useEffect(() => {
    if (Array.isArray(mainCategoryDetail) && mainCategoryDetail.length > 0) {
      let filter_category = mainCategoryDetail.slice(0, 7);
      setFilterCategories(filter_category);
    }
  }, [mainCategoryDetail]);

  return [
    isLoading,
    filterCategories,
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
    clickingOnProductWishIcon,
  ];
}
