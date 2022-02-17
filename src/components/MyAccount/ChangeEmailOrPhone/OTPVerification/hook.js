import { useState } from "react";
import { useHistory, useLocation } from "react-router";

//components
import { verifyChangedPhoneNumber } from "../../../../services/service.myaccount";
import { resendCode } from "../../../../services/service.auth";
import { APPLICATION_CONFIG_ID } from "../../../../constant/applicationConfig";
import { POST_CONFIG } from "../../../../constant/header";
import { goToSpecificPathName } from "../../../../util/goToSpecificPathName";
import { MY_ACCOUNT } from "../../../../constant/locationPathName";
import { GET_STORED_USER_ID } from "../../../../util/storage";

export function Hook() {
  const history = useHistory();
  const location = useLocation();
  const propsState = location.state;

  const [OTPCode, setOTPCode] = useState("");
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);

  const [isSuccessChanged, setIsSuccessChanged] = useState(false);

  const verifyConfirm = async (OTPCode = "") => {
    if (OTPCode.length < 6) {
      setIsError(true);
      return;
    }
    setIsError(false);
    let postData = {
      userId: GET_STORED_USER_ID,
      code: OTPCode,
      emailOrPhoneNo: propsState?.emailOrPhone,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    setIsLoading(true);
    try {
      const response = await verifyChangedPhoneNumber(
        POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        setIsSuccessChanged(true);
      } else {
        setOTPCode("");
        alert(body?.message);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const clickOnSendAgain = async () => {
    setIsResendLoading(true);
    let postData = {
      userId: GET_STORED_USER_ID,
      emailOrPhoneNo: propsState?.emailOrPhone,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    try {
      const response = await resendCode(POST_CONFIG(JSON.stringify(postData)));
      const body = await response.json();
      if (response.ok) {
        setIsResendLoading(false);
        return null;
      } else {
        alert(body.message);
      }
      setIsResendLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const goTo = () => {
    goToSpecificPathName(history, MY_ACCOUNT);
  }

  return [
    isResendLoading,
    isLoading,
    OTPCode,
    setOTPCode,
    isError,
    isSuccessChanged, setIsSuccessChanged,
    /**
     * action
     */
    verifyConfirm,
    clickOnSendAgain,
    goTo
  ];
}
