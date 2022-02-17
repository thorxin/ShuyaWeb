import {
  set_start_loading,
  set_stop_loading,
  set_error_message,
  set_is_success,
  set_order_detail,
  set_pos_voucher,
  set_shopping_cart_detail,
  set_order_message,
} from "./reducer.orderdetail";

import {
  set_order_id,
} from "./reducer.shoppingcart";

import {
  getOrderDetail,
  buyerOrderCancel,
  getPOSVoucher,
  getCartDetail,
  removeItemFromCart,
  sendOrderMessage,
  getOrderMessage,
  paymentAgain,
} from "../services/service.order";

import { POST_CONFIG, GET_CONFIG } from "../constant/header";
import _ from "lodash";
import checkStatus from "../util/status";
import { GET_STORED_ACCESS_TOKEN } from "../util/storage";

const temp_shopping_cart = {
  deliveryInfo: {},
  productInfo: [],
};

export const fetchOrderDetail = (orderId) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getOrderDetail(orderId);
      if (checkStatus(response.status)) {
        const { data } = response;
        dispatch(set_order_detail(data));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};

export const order_cancel = (postData) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await buyerOrderCancel(
        POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_is_success(true));
      } else {
        alert(body?.message);
        dispatch(set_is_success(false));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
      dispatch(set_is_success(false));
    }
  };
};

export const fetchPOSVoucher = (orderID) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getPOSVoucher(orderID, GET_CONFIG);
      if (checkStatus(response.status)) {
        const body = await response.json();
        dispatch(set_pos_voucher(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};

export const postPaymentAgain = (postData) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await paymentAgain(
        POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        // await postOrderActivity(postData.orderId, POST_CONFIG({}));
        dispatch(set_order_id(postData.orderId));
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
    dispatch(set_stop_loading());
  };
};

// const shopping_cart_error_message =`တစ်ခုခုမှားယွင်းနေပါသည်။ profile မှအချက် အလက်များ ပြန်လည် စစ်ဆေးကာ ပြည့်စုံစွာ ဖြည့်စွက်ရန်လိုအပ်ပါသည်။ ဥပမာ - လိပ်စာ နှင့် ဖုန်းနံပါတ် `
const shopping_cart_error_message = "LOCATION_ERROR";

export const GetCartDetailInfo = () => {
  return async (dispatch, getState) => {
    if (GET_STORED_ACCESS_TOKEN) {
      dispatch(set_start_loading());
      try {
        const response = await getCartDetail(GET_CONFIG);
        if (response.ok) {
          const body = await response.json();
          dispatch(set_shopping_cart_detail(body));
        } else {
          dispatch(set_shopping_cart_detail(temp_shopping_cart));
          dispatch(set_error_message(shopping_cart_error_message));
        }
      } catch (error) {
        dispatch(set_shopping_cart_detail(temp_shopping_cart));
        dispatch(set_error_message(shopping_cart_error_message));
      }
    } else return;
  };
};

export const RemoveItemFromCart = (index) => {
  return async (dispatch, getState) => {
    try {
      dispatch(set_start_loading());

      let cartInfo = _.cloneDeep(getState().order.shoppingCart);

      const productList = cartInfo.productInfo || [];

      if (Array.isArray(productList) && productList.length > 0) {
        const itemTobeRemove = productList[index] || {};
        const response = await removeItemFromCart(
          POST_CONFIG(
            JSON.stringify({
              productId: itemTobeRemove.productId,
              skuId: itemTobeRemove.skuId,
            })
          )
        );

        if (response) {
          productList.splice(index, 1);

          let totalAmout = 0;

          productList.forEach((i) => {
            if (i.promotePrice > 0) totalAmout += i.promotePrice * i.qty;
            else totalAmout += i.price * i.qty;
          });

          cartInfo = {
            ...cartInfo,
            productInfo: productList,
            totalAmt: totalAmout,
            netAmt: totalAmout + cartInfo.deliveryFee,
          };

          dispatch(set_shopping_cart_detail(cartInfo));
        }
      }
      dispatch(set_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error.message));
    }
  };
};

export const clear_cart_info = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(set_shopping_cart_detail(null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const send_OrderNoteMessage = (propsDate) => {
  return async (dispatch) => {
    try {
      const response = await sendOrderMessage(
        POST_CONFIG(JSON.stringify(propsDate))
      );
      const body = response.json();
      if (response.ok) {
        console.log("Success");
      } else {
        console.log("Fail");
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_orderMessageList = (order_id, page_number, page_size) => {
  return async (dispatch) => {
    try {
      const response = await getOrderMessage(
        order_id,
        page_number,
        page_size,
        GET_CONFIG
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_order_message(body));
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const clear_orderId = () => {
  return (dispatch) => {
    dispatch(set_order_id(0));
  };
};
