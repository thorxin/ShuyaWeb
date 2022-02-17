import { GET_CONFIG, POST_CONFIG, OPEN_GET_CONFIG } from "../constant/header";

import {
  getMyAccount,
  updateWishList,
  getTermsAndConditions,
} from "../services/service.myaccount";

import {
  set_start_loading,
  set_stop_loading,
  set_error_message,
  set_user_account_info,
  set_terms_and_conditions,
} from "./reducer.myaccount";

import { addAndChangeUserAddress } from "../services/service.auth";

import {
  GET_STORED_ACCESS_TOKEN,
  GET_STORED_REFRESH_TOKEN,
  setLocalStorageTokenAndUserInfo,
} from "../util/storage";

import { goToSpecificPathName } from "../util/goToSpecificPathName";

import { MY_ACCOUNT } from "../constant/locationPathName";
import { set_secondary_start_loading, set_secondary_stop_loading } from "./reducer.productsearch";

export const fetch_userAccountInfo = (user_id = 0) => {
  return async (dispatch) => {
    try {
      const response = await getMyAccount(user_id, GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_user_account_info(body));
      } else {
        console.log(body);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetch_termsAndConditions = () => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getTermsAndConditions(OPEN_GET_CONFIG);
      const body = await response.json();
      if (response.ok) {
        dispatch(set_terms_and_conditions(body));
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const myAccount_change_user_address = (
  data = {},
  userInfo = null,
) => {
  return async (dispatch) => {
    dispatch(set_secondary_start_loading());
    try {
      const response = await addAndChangeUserAddress(
        POST_CONFIG(JSON.stringify(data))
      );
      const body = await response.json();
      if (response.ok) {
        setLocalStorageTokenAndUserInfo(
          GET_STORED_ACCESS_TOKEN,
          GET_STORED_REFRESH_TOKEN,
          userInfo
        );
        window.location.replace(MY_ACCOUNT);
        // goToSpecificPathName(history, MY_ACCOUNT);
      } else {
        alert(body?.message);
      }
      dispatch(set_secondary_stop_loading());
    } catch (error) {
      dispatch(set_error_message(error));
    }
  };
};

export const update_ProductWishList = (productId = 0, isFav = false) => {
  return async (dispatch) => {
    try {
      const response = await updateWishList(productId, isFav, POST_CONFIG({}));
      const body = await response.json();
      if (response.ok) {
        console.log("Success");
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
  };
};
