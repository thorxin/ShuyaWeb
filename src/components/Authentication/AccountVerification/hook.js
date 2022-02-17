import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

//components
import { APPLICATION_CONFIG_ID } from "../../../constant/applicationConfig";
import { OPEN_POST_CONFIG } from "../../../constant/header";
import { REGISTRATION_CHANGE_ADDRESS_V2 } from "../../../constant/locationPathName";
import { registrationVerify } from "../../../services/service.auth";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import {
  GET_STORED_ACCESS_TOKEN,
  setLocalStorageTokenAndUserInfo,
} from "../../../util/storage";

export function Hook({
  errorMessage,
  isResendLoading,
  /**
   * action
   */
  authResendCode,
}) {
  const history = useHistory();
  const location = useLocation();
  const propsState = location.state;

  const [OTP, setOTP] = useState("");
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSuccessBox, setIsOpenSuccessBox] = useState(false);

  const verifyConfirm = async (OTPCode = "") => {
    if (OTPCode.length < 6) {
      setIsError(true);
      return;
    }
    setIsError(false);
    let data = {
      userId: propsState?.userId,
      code: OTPCode,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    setIsLoading(true);
    try {
      const response = await registrationVerify(
        OPEN_POST_CONFIG(JSON.stringify(data))
      );
      const body = await response.json();
      if (response.ok) {
        setToken(body.token.accessToken);
        setLocalStorageTokenAndUserInfo(
          body.token.accessToken,
          body.token.refreshToken,
          body.user
        );
        setIsOpenSuccessBox(true);
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  const sendCodeAgain = async () => {
    const Data = {
      userId: propsState?.userId,
      emailOrPhoneNo: propsState?.phoneNo,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    await authResendCode(Data);
  };

  const goToRegisterAddress = () => {
    if (!token) return;
    let propsData = {
      token: token,
      userId: propsState?.userId
    }
    goToSpecificPathNameWithData(history, REGISTRATION_CHANGE_ADDRESS_V2, propsData);
    window.location.reload();
  };

  return [
    isLoading,
    errorMessage,
    isResendLoading,
    OTP,
    isError,
    isOpenSuccessBox,
    setIsOpenSuccessBox,
    /**
     * action
     */
    setOTP,
    verifyConfirm,
    sendCodeAgain,
    goToRegisterAddress,
  ];
}
