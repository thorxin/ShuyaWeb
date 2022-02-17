import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,
  orderHistoryList: [],
  voucherNoSuggestion: [],
  statusCode: 0
};

/**
 * @param action
 */
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.START_LOADING:
      return {
        ...getCommonState(state),
        isLoading: true,
      };
    case type.STOP_LOADING:
      return {
        ...getCommonState(state),
      };
    case type.START_SECONDARY_LOADING:
      return {
        ...getCommonState(state),
        isSecondaryLoading: true,
      };
    case type.STOP_SECONDARY_LOADING:
      return {
        ...getCommonState(state),
      };
    case type.GET_ORDER_HISTORY_LIST:
      return {
        ...getCommonState(state),
        orderHistoryList: action.payload,
      };
    case type.GET_VOUCHER_NO_SUGGESTION:
      return {
        ...getCommonState(state),
        voucherNoSuggestion: action.payload
      }
    case type.STATUS_CODE:
      return {
        ...getCommonState(state),
        statusCode: action.payload
      }
    default:
      return state;
  }
};
export default Reducer;

const getCommonState = (state) => ({
  ...state,
  isLoading: false,
  isSecondaryLoading: false,
  dataExist: true,
});

/**
 * Action
 */
export const set_start_loading = () => ({
  type: type.START_LOADING,
});

export const set_stop_loading = () => ({
  type: type.STOP_LOADING,
});

export const set_start_secondary_loading = () => ({
  type: type.START_SECONDARY_LOADING,
});

export const set_stop_secondary_loading = () => ({
  type: type.STOP_SECONDARY_LOADING,
});

export const set_order_history_list = (data = []) => ({
    type: type.GET_ORDER_HISTORY_LIST,
    payload: data
});

export const set_voucher_no_suggestion = (data = []) => ({
  type: type.GET_VOUCHER_NO_SUGGESTION,
  payload: data
})

export const set_status_code = (code = 0) => ({
  type: type.STATUS_CODE,
  payload: code
})
