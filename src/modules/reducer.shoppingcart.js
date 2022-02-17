import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,

  isSuccess: false,
  isError: false,

  shopCartDetail: {},
  availableProductList: [],
  outOfStockProductList: [],
  stockLeftProductList: [],
  totalAmount: 0,

  orderId: 0,
  bankList: [],
  paymentServiceDetail: null
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
        isSuccess: false
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
    case type.IS_SUCCESS:
      return {
        ...getCommonState(state),
        isSuccess: true
      }
    case type.IS_ERROR:
      return {
        ...getCommonState(state),
        isError: action.payload
      }
    case type.SHOPPING_CART_DETAIL:
        return {
            ...getCommonState(state),
            shopCartDetail:action.payload
        }
    case type.AVAILABLE_PRODUCT_LIST:
      return {
        ...getCommonState(state),
        availableProductList: action.payload
      }
    case type.OUT_OF_STOCK_PRODUCT_LIST:
      return {
        ...getCommonState(state),
        outOfStockProductList: action.payload
      }
    case type.STOCK_LEFT_PRODUCT_LIST:
      return {
        ...getCommonState(state),
        stockLeftProductList: action.payload
      }
    case type.TOTAL_AMOUNT:
      return {
        ...getCommonState(state),
        totalAmount: action.payload
      }

    case type.ORDER_ID:
      return {
        ...getCommonState(state),
        orderId: action.payload
      }
    case type.BANK_LIST:
      return {
        ...getCommonState(state),
        bankList: action.payload
      }
    case type.PAYMENT_SERVICE_DETAIL:
      return {
        ...getCommonState(state),
        paymentServiceDetail: action.payload
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

export const set_secondary_start_loading = () => ({
  type: type.START_SECONDARY_LOADING,
});

export const set_secondary_stop_loading = () => ({
  type: type.STOP_SECONDARY_LOADING,
});

export const set_is_success = () => ({
  type: type.IS_SUCCESS
})

export const set_is_error = (data = false) => ({
  type: type.IS_ERROR,
  payload: data
})

export const set_shop_cart_detail = (cart = {}) => ({
    type: type.SHOPPING_CART_DETAIL,
    payload: cart
})

export const set_available_product_list = (product_list = []) => ({
  type: type.AVAILABLE_PRODUCT_LIST,
  payload: product_list
})
export const set_out_of_stock_product_list = (product_list = []) => ({
  type: type.OUT_OF_STOCK_PRODUCT_LIST,
  payload: product_list
})
export const set_stock_left_product_list = (product_list = []) => ({
  type: type.STOCK_LEFT_PRODUCT_LIST,
  payload: product_list
})
export const set_total_amount = (amount = 0) => ({
  type: type.TOTAL_AMOUNT,
  payload: amount
})

export const set_order_id = (id = 0) => ({
  type: type.ORDER_ID,
  payload: id
})

export const set_bank_list = (list = []) => ({
  type: type.BANK_LIST,
  payload: list
})

export const set_payment_service_detail = (detail = {}) => ({
  type: type.PAYMENT_SERVICE_DETAIL,
  payload: detail
})