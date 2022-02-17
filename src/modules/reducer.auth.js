import * as type from "./type";

export const initialState = {
  isLoading: false,
  isResendLoading: false,
  isSecondaryLoading: false,
  errorMessage: "",
  cityList: [],
  townshipList: [],
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
    case type.START_RESEND_LOADING:
      return {
        ...getCommonState(state),
        isResendLoading: true,
      };
    case type.STOP_RESEND_LOADING:
      return {
        ...getCommonState(state),
      };
    case type.ERROR_MESSAGE:
      return {
        ...getCommonState(state),
        errorMessage: action.payload,
      };
    case type.CITY_LIST:
      return {
        ...getCommonState(state),
        cityList: action.payload,
      };
    case type.TOWNSHIP_LIST:
      return {
        ...getCommonState(state),
        townshipList: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;

const getCommonState = (state) => ({
  ...state,
  isLoading: false,
  isResendLoading: false,
  isSecondaryLoading: false,
  dataExist: true,
  errorMessage: "",
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
  type: type.START_SECONDARY_LOADING
})

export const set_stop_secondary_loading = () => ({
  type: type.STOP_SECONDARY_LOADING
})

export const set_start_resend_loading = () => ({
  type: type.START_RESEND_LOADING,
});

export const set_stop_resend_loading = () => ({
  type: type.STOP_RESEND_LOADING,
});

export const set_error_message = (data = "") => ({
  type: type.ERROR_MESSAGE,
  payload: data,
});

export const set_city_list = (data = []) => ({
  type: type.CITY_LIST,
  payload: data,
});

export const set_township_list = (data = []) => ({
  type: type.TOWNSHIP_LIST,
  payload: data,
});
