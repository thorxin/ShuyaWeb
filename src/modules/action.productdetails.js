/** @format */

import {
  getProductDetail,
  getProductByRelatedCategory,
  getVariantValue,
  addToCart,
  getQAndAByBuyer,
  getQAndAByUserId,
  saveQuestion,
  deleteQuestion,
  getTotalQuestionByProductId,
  getTerms,
  getShipping,
  getWarranty,
  getPolicy,
  getProductPreOrderTC,
  getInstallation,
} from '../services/service.productdetails';

import {
  set_start_loading,
  set_stop_loading,
  set_start_secondary_loading,
  set_stop_secondary_loading,
  set_is_success,
  set_details,
  set_related_product_by_category,
  set_variant_value,
  set_q_and_a_list,
  set_q_and_a_list_by_buyer,
  set_question_count,
  set_termsconditions,
  set_shippingInformation,
  set_warranty,
  set_policy,
  set_preordertc,
  set_installation,
  set_save_QA_id,
} from './reducer.productdetails';

import {
  GET_CONFIG,
  OPEN_GET_CONFIG,
  OPEN_POST_CONFIG,
  POST_CONFIG,
  PUT_CONFIG,
} from '../constant/header';
import { GET_STORED_ACCESS_TOKEN } from '../util/storage';
import { set_shop_cart_detail } from './reducer.shoppingcart';
import { getCartDetail } from '../services/service.order';

export const fetch_productDetails = (product_id = 0) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const header = GET_STORED_ACCESS_TOKEN ? GET_CONFIG : OPEN_GET_CONFIG;
      const response = await getProductDetail(product_id, header);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_details(body));
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_VariantValue = (data) => {
  return async (dispatch) => {
    dispatch(set_start_secondary_loading());
    try {
      const response = await getVariantValue(
        OPEN_POST_CONFIG(JSON.stringify(data))
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_variant_value(body));
      } else {
        console.log('Hre!');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetch_relatedProductByCategory = (
  category_id = 0,
  page_number = 0,
  page_size = 0
) => {
  return async (dispatch) => {
    try {
      let response;
      if (!GET_STORED_ACCESS_TOKEN) {
        response = await getProductByRelatedCategory(
          category_id,
          page_number,
          page_size,
          OPEN_GET_CONFIG
        );
      } else {
        response = await getProductByRelatedCategory(
          category_id,
          page_number,
          page_size,
          GET_CONFIG
        );
      }

      const body = await response.json();
      if (response.ok) {
        dispatch(set_related_product_by_category(body));
      } else {
        alert(body);
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const add_ToCart = (postData) => {
  return async (dispatch) => {
    try {
      const response = await addToCart(POST_CONFIG(JSON.stringify(postData)));
      const body = await response.json();
      if (response.ok) {
        //need to refactor - MK
        const response = await getCartDetail(GET_CONFIG);
        const body = await response.json();
        if (response.ok) {
          dispatch(set_shop_cart_detail(body));
        }
      } else {
        alert(body);
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_QuestionAndAnswerList = (
  product_id = 0,
  page_number = 0,
  page_size = 0,
  isRemoveQuestionList = false
) => {
  return async (dispatch, getState) => {
    dispatch(set_start_secondary_loading());
    try {
      let question_list = getState().productDetails.questionAndAnswerList;
      if (isRemoveQuestionList) {
        question_list = [];
      }
      const response = await getQAndAByBuyer(
        product_id,
        page_number,
        page_size,
        OPEN_GET_CONFIG
      );
      const body = await response.json();
      if (response.ok) {
        question_list = question_list.concat(body);
        dispatch(set_q_and_a_list(question_list));
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_secondary_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_GetQAndAByUserId = (product_id = 0) => {
  return async (dispatch) => {
    dispatch(set_start_secondary_loading());
    try {
      const response = await getQAndAByUserId(product_id, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_q_and_a_list_by_buyer(body));
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_secondary_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_SaveQuestion = (propsData) => {
  return async (dispatch) => {
    dispatch(set_start_secondary_loading());
    try {
      const response = await saveQuestion(
        POST_CONFIG(JSON.stringify(propsData))
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_save_QA_id(body.id));
        dispatch(set_is_success(true));
      } else {
        dispatch(set_is_success(false));
      }
    } catch (error) {
      dispatch(set_is_success(false));
    }
    dispatch(set_stop_secondary_loading());
  };
};

export const delete_Question = (propsData) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await deleteQuestion(
        PUT_CONFIG(JSON.stringify(propsData))
      );
      const body = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.log('Fail');
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_questionCount = (productId = 0) => {
  return async (dispatch) => {
    try {
      const response = await getTotalQuestionByProductId(
        productId,
        OPEN_GET_CONFIG
      );
      const body = await response.json();
      if (response.ok) {
        dispatch(set_question_count(body));
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_terms = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getTerms(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_termsconditions(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_shipping = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getShipping(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_shippingInformation(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_warranty = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getWarranty(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_warranty(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_policy = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getPolicy(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_policy(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_preordertc = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getProductPreOrderTC(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_preordertc(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const fetch_installation = () => {
  return async (dispatch, getState) => {
    dispatch(set_start_loading());
    try {
      const response = await getInstallation(GET_CONFIG);
      if (response.ok) {
        const body = await response.json();
        dispatch(set_installation(body));
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};
