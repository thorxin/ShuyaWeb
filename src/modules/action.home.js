/** @format */

import {
  set_start_loading,
  set_stop_loading,
  set_main_categories,
  set_promotion_products,
  set_latest_products,
  set_get_brand,
  set_bestselling_products,
  set_product_list_by_category,
  set_banner_list,
  set_AD_list,
  set_shopping_cart_detail,
  set_buyOne_getOne_list,
  set_pop_up_banner,
} from './reducer.home';

import {
  getMainCategory,
  getLandingProductPromotion,
  getLandingProductLatest,
  getBestSellingProduct,
  getProductListBuyer,
  getBannerList,
  getCartDetail,
  getBuyOneGetOneList,
  getPopupBanner,
  getBrand,
} from '../services/service.home';

import { OPEN_GET_CONFIG } from '../constant/header';

import { GET_CONFIG } from '../constant/header';
import { GET_STORED_ACCESS_TOKEN } from '../util/storage';

import { BANNER_LIST_ID, AD_LIST_ID } from '../constant/bannerConfig';

const temp_shopping_cart = {
  deliveryInfo: {},
  productInfo: [],
};

export const fetch_mainCategory = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getMainCategory(OPEN_GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_main_categories(body));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_promotionProducts = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getLandingProductPromotion(OPEN_GET_CONFIG);
      } else {
        response = await getLandingProductPromotion(GET_CONFIG);
      }
      if (response.ok) {
        const body = await response.json();
        dispatch(set_promotion_products(body));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};
export const fetch_latestProducts = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getLandingProductLatest(OPEN_GET_CONFIG);
      } else {
        response = await getLandingProductLatest(GET_CONFIG);
      }
      if (response.ok) {
        const body = await response.json();
        dispatch(set_latest_products(body));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_brand = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getBrand(OPEN_GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_get_brand(body));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_bestSellingProducts = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getBestSellingProduct(OPEN_GET_CONFIG);
      } else {
        response = await getBestSellingProduct(GET_CONFIG);
      }
      if (response.ok) {
        const body = await response.json();
        dispatch(set_bestselling_products(body));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_productListByCategory = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getProductListBuyer(OPEN_GET_CONFIG);
      } else {
        response = await getProductListBuyer(GET_CONFIG);
      }
      if (response.ok) {
        const body = await response.json();
        const category = body.mainCategory || [];
        if (Array.isArray(category) && category.length > 0) {
          const filter_data = category.filter(
            (c) => c.productListBuyers?.length > 0
          );
          dispatch(set_product_list_by_category(filter_data));
        }
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_bannerList = (typeId = 0) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getBannerList(typeId, OPEN_GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        switch (typeId) {
          case BANNER_LIST_ID:
            return dispatch(set_banner_list(body));
          case AD_LIST_ID:
            return dispatch(set_AD_list(body));
          default:
            return null;
        }
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

export const fetch_buyOne_getOneList = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getBuyOneGetOneList(OPEN_GET_CONFIG);
      } else {
        response = await getBuyOneGetOneList(GET_CONFIG);
      }
      if (response.ok) {
        const body = await response.json();
        const buyOneGetOneData = body || [];
        dispatch(set_buyOne_getOne_list(buyOneGetOneData));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(set_stop_loading());
  };
};

// const shopping_cart_error_message =`တစ်ခုခုမှားယွင်းနေပါသည်။ profile မှအချက် အလက်များ ပြန်လည် စစ်ဆေးကာ ပြည့်စုံစွာ ဖြည့်စွက်ရန်လိုအပ်ပါသည်။ ဥပမာ - လိပ်စာ နှင့် ဖုန်းနံပါတ် `
const shopping_cart_error_message = 'LOCATION_ERROR';

// export const GetCartDetailInfo = () => {
//   return async (dispatch, getState) => {
//     if (GET_STORED_ACCESS_TOKEN) {
//       dispatch(set_secondary_start_loading());
//       try {
//         const response = await getCartDetail(GET_CONFIG);
//         if (response.ok) {
//           const body = await response.json();
//           dispatch(set_shopping_cart_detail(body));
//         } else {
//           dispatch(set_shopping_cart_detail(temp_shopping_cart));
//         }
//       } catch (error) {
//         dispatch(set_shopping_cart_detail(temp_shopping_cart));
//       }
//     } else return;
//   };
// };
export const fetch_pop_up_banner = () => {
  return async (dispatch) => {
    try {
      const response = await getPopupBanner(OPEN_GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_pop_up_banner(body));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
