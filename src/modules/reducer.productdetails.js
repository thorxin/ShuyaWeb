import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,
  isSuccess: false,
  details: {},
  relatedProductByCategoryList: [],
  variantValue: [],
  shoppingCart: null,
  questionAndAnswerList: [],
  questionAndAnswerListByUser: [],
  questionCount: {},

  productOfferList: [],
  save_qa_id: 0
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
        isSuccess: false
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
    case type.PRODUCT_DETAILS:
      return {
        ...getCommonState(state),
        details: action.payload,
      };
    case type.CLEAR_PRODUCT_DETAILS:
      return initialState;
    case type.RELATED_PRODUCT_BY_CATEGORY:
      return {
        ...getCommonState(state),
        relatedProductByCategoryList: action.payload,
      };
    case type.GET_VARIANT_VALUE:
      return {
        ...getCommonState(state),
        variantValue: action.payload,
      };
    case type.GET_CART_DETAIL:
      return {
        ...getCommonState(state),
        shoppingCart: action.payload,
      };
    case type.GET_Q_AND_A_LIST:
      return {
        ...getCommonState(state),
        questionAndAnswerList: action.payload,
      };
    case type.GET_Q_AND_A_LIST_BY_USER:
      return {
        ...getCommonState(state),
        questionAndAnswerListByUser: action.payload
      }
    case type.GET_QUESTION_COUNT:
      return {
        ...getCommonState(state),
        questionCount: action.payload
      }
    case type.GET_TERMS:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.GET_SHIPPING:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.GET_WARRANTY:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.GET_POLICY:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.GET_PREORDER:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.GET_INSTALLATION:
      return {
        ...getCommonState(state),
        productOfferList: action.payload
      }
    case type.SAVE_QA_ID: {
      return {
        ...getCommonState(state),
        save_qa_id: action.payload
      }
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

export const set_is_success = (data) => ({
  type: type.IS_SUCCESS,
  payload: data
})

export const set_details = (data = {}) => ({
  type: type.PRODUCT_DETAILS,
  payload: data,
});

export const clear_product_details = () => ({
  type: type.CLEAR_PRODUCT_DETAILS
})

export const set_related_product_by_category = (data = []) => ({
  type: type.RELATED_PRODUCT_BY_CATEGORY,
  payload: data,
});

export const set_variant_value = (data = []) => ({
  type: type.GET_VARIANT_VALUE,
  payload: data,
});

export const set_shopping_cart_detail = (cartDetail) => ({
  type: type.GET_CART_DETAIL,
  payload: cartDetail,
});

export const set_q_and_a_list = (list = []) => ({
  type: type.GET_Q_AND_A_LIST,
  payload: list
})

export const set_q_and_a_list_by_buyer = (list = []) => ({
  type: type.GET_Q_AND_A_LIST_BY_USER,
  payload: list
})

export const set_question_count = (data = {}) => ({
  type: type.GET_QUESTION_COUNT,
  payload: data
})

export const set_termsconditions = (productOfferList = []) => ({
  type: type.GET_TERMS,
  payload: productOfferList
})

export const set_shippingInformation = (productOfferList = []) => ({
  type: type.GET_SHIPPING,
  payload: productOfferList
})

export const set_warranty = (productOfferList = []) => ({
  type: type.GET_WARRANTY,
  payload: productOfferList
})

export const set_policy = (productOfferList = []) => ({
  type: type.GET_POLICY,
  payload: productOfferList
})

export const set_preordertc = (productOfferList = []) => ({
  type: type.GET_PREORDER,
  payload: productOfferList
})

export const set_installation = (productOfferList = []) => ({
  type: type.GET_INSTALLATION,
  payload: productOfferList
})

export const set_save_QA_id = (id) => ({
  type: type.SAVE_QA_ID,
  payload: id
})