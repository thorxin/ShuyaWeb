import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,
  isSuccess: false,
  errorMessage: '',

  orderDetail: null,
  orderDetailKPay: null,
  orderDetailWavePay: null,
  orderID: '',
  posVoucher: null,
  transactionId: '',

  paymentServiceDetail: null,

  shoppingCart: null,

  bankList: [],
  cityList: [],
  townList: [],

  orderMessageList: []
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
    case type.ERROR_MESSAGE:
      return {
        ...getCommonState(state),
        errorMessage: action.payload
      }
    case type.START_SECONDARY_LOADING:
      return {
        ...getCommonState(state),
        isSecondaryLoading: true,
      };
    case type.STOP_SECONDARY_LOADING:
      return {
        ...getCommonState(state),
      };
    case type.IS_SUCCESS:
      return {
        ...getCommonState(state),
        isSuccess: action.payload
      }
    case type.GET_ORDER_DETAIL:
      return {
        ...getCommonState(state),
        orderDetail: action.payload
      }
    case type.GET_CART_DETAIL:
      return {
        ...getCommonState(state),
        shoppingCart: action.payload
      }
    case type.GET_BANK_LIST:
      return {
        ...getCommonState(state),
        bankList: action.payload
      }
    case type.CITY_LIST:
      return {
        ...getCommonState(state),
        cityList: action.payload
      }
    case type.CLEAR_CITY_LIST:
      return {
        ...getCommonState(state),
        cityList: []
      }
    case type.TOWNSHIP_LIST:
      return {
        ...getCommonState(state),
        townList: action.payload
      }
    case type.CLEAR_TOWNSHIP_LIST:
      return {
        ...getCommonState(state),
        townList: []
      }
    case type.SET_ORDER_ID:
      return {
        ...getCommonState(state),
        orderID: action.payload
      }
    case type.POST_KBZ_PAYMENT:
      return {
        ...getCommonState(state),
        orderDetailKPay: action.payload
      }
    case type.POST_WAVE_PAYMENT:
      return {
        ...getCommonState(state),
        orderDetailWavePay: action.payload
      }
    case type.GET_TRANSACTION_ID:
      return {
        ...getCommonState(state),
        transactionId: action.payload
      }
    case type.GET_POS_VOUCHER:
      return {
        ...getCommonState(state),
        posVoucher: action.payload
      }
    case type.GET_PAYMENT_SERVICE_BY_ID:
      return {
        ...getCommonState(state),
        paymentServiceDetail: action.payload
      }
    case type.GET_ORDER_MESSAGE:
      return {
        ...getCommonState(state),
        orderMessageList: action.payload
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
  errorMessage: '',
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

export const set_is_success = (data = false) => ({
  type: type.IS_SUCCESS,
  payload: data
})

export const set_order_detail = (order) => ({
  type: type.GET_ORDER_DETAIL,
  payload: order
})

export const set_error_message = (message = '') => ({
  type: type.ERROR_MESSAGE,
  payload: message
})

export const set_shopping_cart_detail = (cartDetail) => ({
  type: type.GET_CART_DETAIL,
  payload: cartDetail
})

export const set_bankList = (list = []) => ({
  type: type.GET_BANK_LIST,
  payload: list
})

export const get_city_list = (city = []) => ({
  type: type.CITY_LIST,
  payload: city
})

export const clear_city_list = () => ({
  type: type.CLEAR_CITY_LIST,
})

export const get_town_list = (town = []) => ({
  type: type.TOWNSHIP_LIST,
  payload: town
})

export const clear_town_list = () => ({
  type: type.CLEAR_TOWNSHIP_LIST
})

export const set_order_id = (orderid = '') => ({
  type: type.SET_ORDER_ID,
  payload: orderid
})

export const set_order_detail_kpay = (orderDetailKPay) => ({
  type: type.POST_KBZ_PAYMENT,
  payload: orderDetailKPay
})

export const set_order_detail_wavepay = (orderDetailWavePay = {}) => ({
  type: type.POST_WAVE_PAYMENT,
  payload: orderDetailWavePay
})

export const set_transaction_id = (transactionId = '') => ({
  type: type.GET_TRANSACTION_ID,
  payload: transactionId
})

export const set_pos_voucher = (voucher) => ({
  type: type.GET_POS_VOUCHER,
  payload: voucher
})

export const set_payment_service_detail = (paymentServiceDetail) => ({
  type: type.GET_PAYMENT_SERVICE_BY_ID,
  payload: paymentServiceDetail
})

export const set_data_exist_default = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: type.SET_DATA_EXIST,
      payload: true
    })
  }
}

export const set_order_message = (message_list = []) => ({
  type: type.GET_ORDER_MESSAGE,
  payload: message_list
})