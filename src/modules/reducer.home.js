import * as type from "./type";

export const initialState = {
  isLoading: false,
  isSecondaryLoading: false,
  errorMessage: '',
  dataExist: true,
  promotionProducts: [],
  latestProducts: [],
  bestSellingProducts: [],
  productListByCategory: [],
  bannerList: [],
  ADList: [],
  shoppingCart: null,

  mainCategory: [],
  subCategoryList: [],
  mainCategoryDetail: [],
  brandById: {},
  selectedCategory: null,
  buyOneGetOneList: [],
  popUpBanner: {},
  homeBrand:[]
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
        ...getCommonState(state)
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
    case type.ERROR_MESSAGE:
      return {
        ...getCommonState(state),
        errorMessage: action.payload,
      };
    case type.MAIN_CATEGORY:
      return {
        ...getCommonState(state),
        mainCategory: action.payload,
      };
    case type.PROMOTION_PRODUCT:
      return {
        ...getCommonState(state),
        promotionProducts: action.payload,
      };
    case type.LATEST_PRODUCT:
      return {
        ...getCommonState(state),
        latestProducts: action.payload,
      };
    case type.GET_BRAND:
      return {
        ...getCommonState(state),
        homeBrand: action.payload,
      }
    case type.BEST_SELLING_PRODICT:
      return {
        ...getCommonState(state),
        bestSellingProducts: action.payload,
      }
    case type.PRODUCT_BY_CATEGORY:
      return {
        ...getCommonState(state),
        productListByCategory: action.payload,
      };
    case type.BANNER_LIST:
      return {
        ...getCommonState(state),
        bannerList: action.payload,
      };
    case type.AD_LIST:
      return {
        ...getCommonState(state),
        ADList: action.payload,
      };
    case type.SET_SUB_CATEGORY_LIST:
      return {
        ...getCommonState(state),
        selectedCategory: action.category,
        subCategoryList: action.payload,
      };
    case type.SET_MAIN_CATEGORYDETAIL:
      return {
        ...getCommonState(state),
        mainCategoryDetail: action.payload,
      };
    case type.SET_PRODUCT_BY_BRAND:
      return {
        ...getCommonState(state),
        brandById: action.payload,
      };
    case type.SET_MAIN_CATEGORY:
      return {
        ...getCommonState(state),
        mainCategory: action.payload,
      };
    case type.GET_CART_DETAIL:
      return {
        ...getCommonState(state),
        shoppingCart: action.payload,
      };
    case type.BUY_ONE_GET_ONE_LIST:
      return {
        ...getCommonState(state),
        buyOneGetOneList: action.payload,
      };
    case type.POP_UP_BANNER: {
      return {
        ...getCommonState(state),
        popUpBanner: action.payload
      }
    }
    default:
      return state;
  }
};
export default Reducer;

const getCommonState = (state) => ({
  ...state,
  dataExist: true,
  isLoading: false,
  isSecondaryLoading: false
});

/**
 * Action
 */
export const set_start_loading = () => ({
  type: type.START_LOADING
});

export const set_stop_loading = () => ({
  type: type.STOP_LOADING
})

export const set_secondary_start_loading = () => ({
  type: type.START_SECONDARY_LOADING,
});

export const set_secondary_stop_loading = () => ({
  type: type.STOP_SECONDARY_LOADING,
});

export const set_error_message = (message = '') => ({
  type: type.ERROR_MESSAGE,
  payload: message,
});

export const set_main_categories = (data = []) => ({
  type: type.MAIN_CATEGORY,
  payload: data,
});

export const set_promotion_products = (data = []) => ({
  type: type.PROMOTION_PRODUCT,
  payload: data,
});

export const set_latest_products = (data = []) => ({
  type: type.LATEST_PRODUCT,
  payload: data,
});

export const set_get_brand = (data = []) => ({
  type: type.GET_BRAND,
  payload:data
})

export const set_bestselling_products = (data = []) => ({
  type: type.BEST_SELLING_PRODICT,
  payload: data,
})

export const set_product_list_by_category = (data = []) => ({
  type: type.PRODUCT_BY_CATEGORY,
  payload: data,
});


export const set_banner_list = (data = []) => ({
  type: type.BANNER_LIST,
  payload: data,
});

export const set_AD_list = (data = []) => ({
  type: type.AD_LIST,
  payload: data,
});

export const set_sub_category_list = (list = [], category = {}) => ({
  type: type.SET_SUB_CATEGORY_LIST,
  payload: list,
  category: category,
});

export const set_main_categorydetail = (category = []) => ({
  type: type.SET_MAIN_CATEGORYDETAIL,
  payload: category,
});

export const set_product_by_brand = (branddata = {}) => ({
  type: type.SET_PRODUCT_BY_BRAND,
  payload: branddata,
});

export const set_main_category = (category = []) => ({
  type: type.SET_MAIN_CATEGORY,
  payload: category,
});

export const set_shopping_cart_detail = (cartDetail) => ({
  type: type.GET_CART_DETAIL,
  payload: cartDetail
})

export const set_buyOne_getOne_list = (data = []) => ({
  type: type.BUY_ONE_GET_ONE_LIST,
  payload: data,
});

export const set_pop_up_banner = (data = {}) => ({
  type: type.POP_UP_BANNER,
  payload: data
})