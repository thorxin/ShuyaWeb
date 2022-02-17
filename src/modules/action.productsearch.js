/** @format */

import {
  set_start_loading,
  set_stop_loading,
  set_secondary_start_loading,
  set_secondary_stop_loading,
  set_tag_list,
  set_search_product_list,
  set_product_suggestion_list,
  set_clear_data_list,
  set_bought_together_product_list,
  set_search_product_count,
  set_is_error,
} from './reducer.productsearch';

import {
  getTag,
  productSearch,
  getProductNameSuggestion,
} from '../services/service.productsearch';

import { GET_STORED_ACCESS_TOKEN } from '../util/storage';

import { GET_CONFIG, OPEN_GET_CONFIG } from '../constant/header';

import * as endpoints from '../constant/api';

import {
  PAGE_FROM_PRODUCT_SEARCH,
  SEARCH_TAG,
  PAGE_NUMBER,
  PAGE_SIZE,
  SEARCH_CATEGORY,
  PAGE_FROM_DETAIL,
} from '../constant/search';

export const fetch_productSearch = ({
  searchType = 0,
  ProductName = '',
  ProductCategoryId = 0,
  tagList = [],
  sortType = 1,
  isRemoveProductListState = false,
  pageNumber = 0,
  pageSize = 0,
  frompage = PAGE_FROM_PRODUCT_SEARCH, // DEFAULT FROM PRODUCT SEARCH
}) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      let isValid = false;

      let api = endpoints.ProductSearch;

      let product_list = getState().productSearch.searchProductList;

      if (searchType > 0) {
        api += searchType;

        isValid = true;
      }

      if (sortType > 0) {
        api += `&Choose=${sortType}`;
      }

      if (isRemoveProductListState) {
        product_list.length = 0;
      }

      if (ProductName) {
        api += `&ProductName=${ProductName}`;
        isValid = true;
      }

      if (ProductCategoryId > 0 && SEARCH_CATEGORY) {
        api += `&ProductCategoryId=${ProductCategoryId}`;
        isValid = true;
      }

      if (SEARCH_TAG) {
        if (tagList.length > 0) api += `&tagIds=${tagList.join('&tagIds=')}`;
        else if (tagList.length === 0) api += `&tagIds=0`;

        isValid = true;
      }

      if (pageNumber > 0) api += `&PageNumber=${pageNumber}`;
      if (pageSize > 0) api += `&PageSize=${pageSize}`;

      if (!isValid) return;

      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await productSearch(api, OPEN_GET_CONFIG);
      } else {
        response = await productSearch(api, GET_CONFIG);
      }
      const body = await response.json();
      if (response.ok) {
        const list = body.productList || [];
        if (list.length > 0) {
          product_list = product_list.concat(list);
          switch (frompage) {
            case PAGE_FROM_PRODUCT_SEARCH:
              dispatch(set_search_product_list(product_list));
              break;
            case PAGE_FROM_DETAIL:
              dispatch(set_bought_together_product_list(product_list));
              break;
            default:
              break;
          }
        }
        dispatch(set_search_product_count(body.count));
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_is_error());
    }
  };
};

export const fetch_tagList = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getTag(OPEN_GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_tag_list(body));
      } else {
        alert(body);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_ProductSuggestionList = (keyword = '') => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await getProductNameSuggestion(
        keyword,
        PAGE_NUMBER,
        PAGE_SIZE,
        OPEN_GET_CONFIG
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_product_suggestion_list(body));
      } else {
        alert(body?.message);
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const clear_DataList = () => {
  return async (dispatch) => {
    dispatch(set_clear_data_list());
  };
};
