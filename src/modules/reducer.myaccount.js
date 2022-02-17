import * as type from "./type";

export const initialState = {
  isLoading: false,
  errorMessage: '',
  successMessage: '',
  isShowSuccessBox: false,

  userAccountInfo: {},
  termsAndConditions: [],

  wishList: [],
  isFavourite: [],
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
      };
    case type.USER_ACCOUNT_INFO:
      return {
        ...getCommonState(state),
        userAccountInfo: action.payload,
      };
    case type.GET_TERMS_AND_CONDITIONS:
      return {
        ...getCommonState(state),
        termsAndConditions: action.payload
      }
    case type.SET_SUCCESS_MESSAGE:
      return {
        ...getCommonState(state),
        successMessage: action.payload,
        isFavourite: action.isFav,
      };
    case type.GET_WISH_LIST_PRODUCT:
      return {
        ...getCommonState(state),
        wishList: action.payload
      };
    default:
      return state;
  }
};
export default Reducer;

/**
 * 
 * @param {*} state - Initial State Value 
 * @returns 
 */
const getCommonState = (state) => ({
  ...state,
  isLoading: false,
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

export const set_error_message = (message = '') => ({
  type: type.ERROR_MESSAGE,
  payload: message
});

export const set_user_account_info = (data = {}) => ({
  type: type.USER_ACCOUNT_INFO,
  payload: data,
});

export const set_terms_and_conditions = (data = []) => ({
  type: type.GET_TERMS_AND_CONDITIONS,
  payload: data
})

export const set_wish_list_product = (product = []) => ({
  type: type.GET_WISH_LIST_PRODUCT,
  payload: product
});

export const set_success_message = (message = '', isFav = {}) => ({
  type: type.SET_SUCCESS_MESSAGE,
  payload: message,
  isFav: isFav,
});