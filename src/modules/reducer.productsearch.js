import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,
  tagList: [],

  searchProductList: [],
  searchProductCount: 0,

  productSuggestionList: null,
  boughtTogetherProductList: [],
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
    case type.GET_TAG_LIST:
      return {
        ...getCommonState(state),
        tagList: action.payload,
      };
    case type.GET_PRODUCT_SEARCH_LIST:
      return {
        ...getCommonState(state),
        searchProductList: action.payload,
      };
    case type.IS_ERROR: {
      return {
        ...getCommonState(state),
        searchProductList: [],
        searchProductCount: 0
      }
    }
    case type.GET_PRODUCT_SEARCH_COUNT:
      return {
        ...getCommonState(state),
        searchProductCount: action.payload,
      };
    case type.GET_PRODUCT_SUGGESTION_LIST:
      return {
        ...getCommonState(state),
        productSuggestionList: action.payload,
      };
    case type.CLEAR_DATA_LIST:
      return {
        ...getCommonState(state),
        productSuggestionList: null,
        searchProductList: []
      };
    case type.BOUGHT_TOGETHER_PRODUCT_LIST:
      return {
        ...getCommonState(state),
        boughtTogetherProductList: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;

const getCommonState = (state) => ({
  ...state,
  isLoading: false,
  isSecondaryLoading: false,
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

export const set_tag_list = (data = []) => ({
  type: type.GET_TAG_LIST,
  payload: data,
});

export const set_search_product_list = (list = []) => ({
  type: type.GET_PRODUCT_SEARCH_LIST,
  payload: list,
});

export const set_search_product_count = (count = 0) => ({
  type: type.GET_PRODUCT_SEARCH_COUNT,
  payload: count,
});

export const set_product_suggestion_list = (list = []) => ({
  type: type.GET_PRODUCT_SUGGESTION_LIST,
  payload: list,
});

export const set_clear_data_list = () => ({
  type: type.CLEAR_DATA_LIST,
});

export const set_bought_together_product_list = (list = []) => ({
  type: type.BOUGHT_TOGETHER_PRODUCT_LIST,
  payload: list,
});

export const set_is_error = () => ({
  type: type.IS_ERROR
})
