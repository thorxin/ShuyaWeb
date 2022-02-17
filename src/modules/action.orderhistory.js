import {
  set_start_loading,
  set_stop_loading,
  set_order_history_list,
  set_start_secondary_loading,
  set_stop_secondary_loading,
  set_voucher_no_suggestion,
  set_status_code,
} from "./reducer.orderhistory";

import {
  getOrderHistory,
  getVoucherNoSuggestion,
} from "../services/service.order";

import { GET_CONFIG } from "../constant/header";
import { set_secondary_start_loading, set_secondary_stop_loading } from "./reducer.productsearch";

export const fetch_getOrderHistory = ({
  userId = 0,
  voucherNo = "",
  paymentStatusId = 0,
  orderStatusId = 0,
  orderDate = "",
  paymentDate = "",
  isRemoveOrderListState = true,
  pageNumber = 0,
  pageSize = 0,
}) => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      let isValid = false;
      let request_data;
      let order_history_list = getState().orderHistory.orderHistoryList;

      if (userId > 0) {
        request_data = `?UserId=${userId}`;
        isValid = true;
      }

      if (voucherNo) {
        request_data += `&VoucherNo=${voucherNo}`;
        isValid = true;
      }

      if (orderStatusId > 0) {
        request_data += `&OrderStatusId=${orderStatusId}`;
        isValid = true;
      }

      if (paymentStatusId > 0) {
        request_data += `&PaymentStatusId=${paymentStatusId}`;
        isValid = true;
      }

      if (paymentDate) {
        request_data += `&PaymentDate=${paymentDate}`;
        isValid = true;
      }

      if (orderDate) {
        request_data += `&OrderDate=${orderDate}`;
        isValid = true;
      }

      if (isRemoveOrderListState) {
        order_history_list.length = 0;
      }

      if (!isValid) return;

      if (pageNumber > 0) {
        request_data += `&PageNumber=${pageNumber}`;
      }
      if (pageSize > 0) {
        request_data += `&PageSize=${pageSize}`;
      }

      const response = await getOrderHistory(request_data, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        order_history_list = order_history_list.concat(body);
        dispatch(set_order_history_list(order_history_list));
        dispatch(set_status_code(0));
      } else {
        dispatch(set_status_code(body?.status));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_VoucherNoSuggestion = (
  userId = 0,
  voucherNo = "",
  pageNumber = 0,
  pageSize = 0
) => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      let api_request;

      if (userId > 0) {
        api_request = `?UserId=${userId}`;
      }
      if (voucherNo) {
        api_request += `&SearchText=${voucherNo}`;
      }
      if (pageNumber > 0) {
        api_request += `&PageNumber=${pageNumber}`;
      }
      if (pageSize > 0) {
        api_request += `&PageSize=${pageSize}`;
      }

      const response = await getVoucherNoSuggestion(api_request, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_voucher_no_suggestion(body));
      } else {
        alert(body?.message);
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};
