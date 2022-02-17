/** @format */

import {
    set_start_loading,
    set_stop_loading,
    set_error_message,
    set_sub_category_list,
    set_main_categorydetail,
    set_product_by_brand,
    set_main_category,
} from './reducer.home';
import {
  getLandingMainCategory,
  getSubCategory,
  getLandingCategoryDetail,
  getProductByBrand,
} from '../services/service.bycategory.js';

import { OPEN_GET_CONFIG } from '../constant/header';
import CheckStatus from '../util/status';

/**
 *
 * @param {*} id
 */

export const fetch_mainCategoryDetail = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getLandingCategoryDetail();
      if (CheckStatus(response.status)) {
        dispatch(set_main_categorydetail(response.data));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};

export const fetch_ProductByBrand = (id = 0) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getProductByBrand(id, OPEN_GET_CONFIG);
      if (response.ok) {
        const data = await response.json();
        dispatch(set_product_by_brand(data));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};

export const fetchSubCategory = (mainId = 0) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getSubCategory(mainId, OPEN_GET_CONFIG);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.subCategory) && data.subCategory.length > 0) {
          dispatch(
            set_sub_category_list(data.subCategory, {
              id: data.id,
              name: data.name,
              url: data.url,
              videoUrl: data.videoUrl,
            })
          );
        } else {
          dispatch(set_sub_category_list([]));
        }
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};


export const fetch_mainCategory = () => {
  return async (dispatch, getState) => {
    const list = getState().home.mainCategory || [];

    if (Array.isArray(list) && list.length === 0) {
      dispatch(set_start_loading());
      try {
        const response = await getLandingMainCategory();
        if (CheckStatus(response.status)) {
          dispatch(set_main_category(response.data));
        }
        dispatch(set_stop_loading());
      } catch (error) {
        dispatch(set_error_message(error.message));
      }
    }
  };
};