/** @format */

import {
  logInUser,
  registrationUser,
  registrationVerify,
  resendCode,
  getCity,
  getTownship,
  addAndChangeUserAddress,
  forgotPassword,
  refreshToken,
  LoginWithFaceBook,
} from '../services/service.auth';

import {
  set_error_message,
  set_start_loading,
  set_stop_loading,
  set_start_secondary_loading,
  set_stop_secondary_loading,
  set_start_resend_loading,
  set_stop_resend_loading,
  set_city_list,
  set_township_list,
} from './reducer.auth';

import {
  OPEN_POST_CONFIG,
  OPEN_POST_CONFIG_MULTIPART_FORM,
  GET_CONFIG_WITH_TOKEN,
  POST_CONFIG_WITH_TOKEN,
} from '../constant/header';

import {
  goToSpecificPathNameWithData,
  goToSpecificAfterAuth,
} from '../util/goToSpecificPathName';

import {
  setLocalStorageTokenAndUserInfo,
  GET_STORED_ACCESS_TOKEN,
  GET_STORED_REFRESH_TOKEN,
  ACCESS_TOKEN,
  removeLocalStorage,
  REFRESH_TOKEN,
  GET_STORED_USER_ID,
  saveFacebookLogin,
} from '../util/storage';

import { APPLICATION_CONFIG_ID } from '../constant/applicationConfig';
import { ACCOUNT_VERIFICATION } from '../constant/locationPathName';

/**
 * LogIn
 */
export const auth_login = (auth = {}) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    setTimeout(async () => {
      try {
        const response = await logInUser(
          OPEN_POST_CONFIG(JSON.stringify(auth))
        );
        const body = await response.json();
        if (response.ok) {
          setLocalStorageTokenAndUserInfo(
            body.token.accessToken,
            body.token.refreshToken,
            body.user
          );
          goToSpecificAfterAuth();
        } else {
          dispatch(set_error_message(body));
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };
};

/**
 * Registration
 */
export const auth_registration = (history, dataForm) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await registrationUser(
        OPEN_POST_CONFIG_MULTIPART_FORM(dataForm)
      );
      const body = await response.json();
      if (response.ok) {
        let propsData = {
          userId: body.user.id,
          phoneNo: body.user.phoneNo,
        };
        // let pathName = "/accountverification";
        goToSpecificPathNameWithData(history, ACCOUNT_VERIFICATION, propsData);
      } else {
        console.log(body?.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      console.log(error);
    }
  };
};
// export const auth_account_verify = (history, Data) => {
//   return async (dispatch) => {
//     dispatch(set_start_loading());
//     try {
//       const response = await registrationVerify(
//         OPEN_POST_CONFIG(JSON.stringify(Data))
//       );
//       const body = await response.json();
//       if (response.ok) {
//         let propsData = {
//           accessBody: body,
//         };
//         let pathName = "/registrationaddress";
//         goToSpecificPathNameWithData(history, pathName, propsData);
//       } else {
//         alert(body?.message);
//       }
//       dispatch(set_stop_loading());
//     } catch (error) {
//       alert(error);
//     }
//   };
// };

export const auth_resend_code = (Data = {}) => {
  return async (dispatch) => {
    dispatch(set_start_resend_loading());
    try {
      const response = await resendCode(OPEN_POST_CONFIG(JSON.stringify(Data)));
      const body = await response.json();
      if (!response.ok) {
        alert(body?.message);
      }
      dispatch(set_stop_resend_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const auth_get_city_list = (token = '') => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getCity(GET_CONFIG_WITH_TOKEN(token));
      const body = await response.json();
      if (response.ok) {
        dispatch(set_city_list(body?.cityList));
      } else {
        alert(body);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const auth_get_township_list = (city_id = null, token = '') => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await getTownship(city_id, GET_CONFIG_WITH_TOKEN(token));
      const body = await response.json();
      if (response.ok) {
        dispatch(set_township_list(body?.townList));
      } else {
        alert(body);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

export const auth_add_and_change_user_address = (
  data = {},
  userInfo = null
) => {
  return async (dispatch) => {
    dispatch(set_start_loading());
    try {
      const response = await addAndChangeUserAddress(
        POST_CONFIG_WITH_TOKEN(JSON.stringify(data), data.token)
      );
      const body = await response.json();
      if (response.ok) {
        // setLocalStorageTokenAndUserInfo(
        //   GET_STORED_ACCESS_TOKEN,
        //   GET_STORED_REFRESH_TOKEN,
        //   userInfo
        // );
        goToSpecificAfterAuth();
      } else {
        alert(body?.message);
      }
      dispatch(set_stop_loading());
    } catch (error) {
      alert(error);
    }
  };
};

//Order Detail

// Order Detail

export const refresh_token = async () => {
  if (
    !GET_STORED_USER_ID ||
    !GET_STORED_ACCESS_TOKEN ||
    !GET_STORED_REFRESH_TOKEN
  )
    return null;

  try {
    const body = JSON.stringify({
      applicationConfigId: APPLICATION_CONFIG_ID,
      accessToken: GET_STORED_ACCESS_TOKEN,
      refreshToken: GET_STORED_REFRESH_TOKEN,
    });
    const response = await refreshToken(POST_CONFIG_WITH_TOKEN(body));
    if (response.ok) {
      const body = await response.json();

      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);

      setLocalStorageTokenAndUserInfo(body.accessToken, body.refreshToken);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * facebook login
 */

export const login_with_facebook = (body) => {
  return async (dispatch, getState) => {
    dispatch(set_start_secondary_loading());
    try {
      const response = await LoginWithFaceBook(
        OPEN_POST_CONFIG(JSON.stringify(body))
      );
      if (response.ok) {
        const data = await response.json();
        saveFacebookLogin(true);
        console.log('data', data);
        if (data.user.phoneNo) {
          setLocalStorageTokenAndUserInfo(
            data.token.accessToken,
            data.token.refreshToken,
            data.user
          );
          goToSpecificAfterAuth();
        } else {
          setLocalStorageTokenAndUserInfo(
            data.token.accessToken,
            data.token.refreshToken,
            data.user
          );
          window.history.pushState(data, '', '/myaccount/changeemailorphone');
          window.location.reload(true);
        }
      }
      dispatch(set_stop_secondary_loading());
    } catch (error) {
      console.log(error);
    }
  };
};
