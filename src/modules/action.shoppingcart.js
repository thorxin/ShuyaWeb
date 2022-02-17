/** @format */

import {
  set_start_loading,
  set_stop_loading,
  set_secondary_start_loading,
  set_secondary_stop_loading,
  set_is_success,
  set_shop_cart_detail,
  set_available_product_list,
  set_out_of_stock_product_list,
  set_stock_left_product_list,
  set_total_amount,
  set_order_id,
  set_bank_list,
  set_payment_service_detail,
  set_is_error,
} from './reducer.shoppingcart';

import {
  getCartDetail,
  getCartDetailForBuyNow,
  removeFromCart,
  postOrder,
  getBank,
  getPaymentServiceDetail,
  updateProductCart,
  postOrderActivity,
} from '../services/service.order';

import { GET_CONFIG, POST_CONFIG } from '../constant/header';

import {
  increaseCount,
  decreaseCount,
  removeAllProductFromCart,
  filterProductList,
  AVAILABLE_PRODUCT,
  STOCK_LEFT_PRODUCT,
  OUT_OF_STOCK_PRODUCT,
  removeProductFromState,
  calculateProductAmount,
  composeUpdateProductCartData,
} from '../components/ShoppingCart/util';

import _ from 'lodash';

import { ShopCartProductList_Testing } from '../testing/testing_json';

export const fetch_ShopCartDetail = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getCartDetail(GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        let temp_available_products = filterProductList(
          body.productInfo
        ).availableProductList;
        let temp_out_of_stock_products = filterProductList(
          body.productInfo
        ).outOfStockProductList;
        let temp_stock_left_products = filterProductList(
          body.productInfo
        ).stockLeftProductList;
        dispatch(set_shop_cart_detail(body));
        dispatch(set_available_product_list(temp_available_products));
        dispatch(set_out_of_stock_product_list(temp_out_of_stock_products));
        dispatch(set_stock_left_product_list(temp_stock_left_products));
        dispatch(
          set_total_amount(calculateProductAmount(temp_available_products))
        );
      } else {
        alert(body);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_ShopCartDetailForBuyNow = (postData) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getCartDetailForBuyNow(postData, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        let temp_available_products = filterProductList(
          body.productInfo
        ).availableProductList;
        let temp_out_of_stock_products = filterProductList(
          body.productInfo
        ).outOfStockProductList;
        let temp_stock_left_products = filterProductList(
          body.productInfo
        ).stockLeftProductList;
        dispatch(set_shop_cart_detail(body));
        dispatch(set_available_product_list(temp_available_products));
        dispatch(set_out_of_stock_product_list(temp_out_of_stock_products));
        dispatch(set_stock_left_product_list(temp_stock_left_products));
        dispatch(
          set_total_amount(calculateProductAmount(temp_available_products))
        );
      } else {
        alert(body);
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const increasing_ProductQty = (propsData) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    let product_list;
    switch (propsData.type) {
      case AVAILABLE_PRODUCT:
        product_list = getState().shoppingCart.availableProductList;
        let is_exceed_qty = increaseCount(product_list, propsData);
        // let update_cart_data = composeUpdateProductCartData(list[propsData.index]);
        // console.log(update_cart_data);
        // const response =  updateProductCart(POST_CONFIG(JSON.stringify(update_cart_data)));
        // const body =  response.json();
        dispatch(set_is_error(is_exceed_qty));
        dispatch(set_total_amount(calculateProductAmount(product_list)));
        break;
      case STOCK_LEFT_PRODUCT:
        product_list = getState().shoppingCart.stockLeftProductList;
        increaseCount(product_list, propsData);
        break;
      default:
        break;
    }
    dispatch(set_stop_loading());
  };
};

export const decreasing_ProductQty = (propsData) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    let product_list;
    let temp_product_list;

    switch (propsData.type) {
      case AVAILABLE_PRODUCT:
        product_list = getState().shoppingCart.availableProductList;
        decreaseCount(product_list, propsData);
        dispatch(set_total_amount(calculateProductAmount(product_list)));
        break;
      case STOCK_LEFT_PRODUCT:
        product_list = getState().shoppingCart.stockLeftProductList;
        temp_product_list = decreaseCount(product_list, propsData);
        if (
          temp_product_list[propsData.index].qty <=
          temp_product_list[propsData.index].availableQty
        ) {
          let available_product_list =
            getState().shoppingCart.availableProductList;
          available_product_list.push(temp_product_list[propsData.index] || []);
          temp_product_list.splice(propsData.index, 1);
          dispatch(
            set_total_amount(calculateProductAmount(available_product_list))
          );
        }
        break;
      default:
        break;
    }
    dispatch(set_stop_loading());
  };
};

export const remove_FromCart = (postData = {}) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await removeFromCart(
        POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        let temp_product_list;
        let filter_product_list;
        switch (postData?.productType) {
          case AVAILABLE_PRODUCT:
            temp_product_list = getState().shoppingCart.availableProductList;
            filter_product_list = removeProductFromState(
              temp_product_list,
              postData
            );
            dispatch(set_available_product_list(filter_product_list));
            dispatch(
              set_total_amount(calculateProductAmount(filter_product_list))
            );
            break;
          case STOCK_LEFT_PRODUCT:
            temp_product_list = getState().shoppingCart.stockLeftProductList;
            filter_product_list = removeProductFromState(
              temp_product_list,
              postData
            );
            dispatch(set_stock_left_product_list(filter_product_list));
            break;
          case OUT_OF_STOCK_PRODUCT:
            temp_product_list = getState().shoppingCart.outOfStockProductList;
            filter_product_list = removeProductFromState(
              temp_product_list,
              postData
            );
            dispatch(set_out_of_stock_product_list(filter_product_list));
            break;
          default:
            break;
        }
      } else {
        alert(body.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const remove_AllFromCart = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      let cartInfo = _.cloneDeep(getState().shoppingCart.shopCartDetail);
      let productList = cartInfo.productInfo || [];
      if (productList.length > 0) {
        for (let i = 0; i < productList.length; i++) {
          let productToRemove = productList[i];
          await removeAllProductFromCart(productToRemove);
        }
      }
      if (removeAllProductFromCart) {
        dispatch(set_available_product_list([]));
        dispatch(set_stock_left_product_list([]));
        dispatch(set_out_of_stock_product_list([]));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const post_Order = (postData = {}) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await postOrder(POST_CONFIG(JSON.stringify(postData)));
      const body = await response.json();
      // const orderID = JSON.stringify(body?.orderId)
      if (response.ok) {
        dispatch(set_order_id(body?.orderId));
        await postOrderActivity(POST_CONFIG(JSON.stringify(body?.orderId)));
      } else {
        alert(body.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_BankList = () => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await getBank(GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_bank_list(body));
      } else {
        alert(body);
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_PaymentServiceDetail = (payment_service_id = 0) => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await getPaymentServiceDetail(
        payment_service_id,
        GET_CONFIG
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_payment_service_detail(body));
      } else {
        alert(body);
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};
