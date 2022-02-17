import { useState } from "react";
import { useHistory, useLocation } from "react-router";

//components
import { registrationVerify } from "../../../../services/service.auth";
import { resendCode } from "../../../../services/service.auth";
import { OPEN_POST_CONFIG, POST_CONFIG } from "../../../../constant/header";
import { APPLICATION_CONFIG_ID } from "../../../../constant/applicationConfig";
import { goToSpecificPathNameWithData } from "../../../../util/goToSpecificPathName";
import { CHANGE_PASSWORD } from "../../../../constant/locationPathName";

export function Hook() {
  const location = useLocation();
  const propsState = location.state;

  const history = useHistory();

  const [OTP, setOTP] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);

  const verifyConfirm = async (OTPCode = "") => {
    if (OTPCode.length < 6) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsLoading(true);

    let postData = {
      userId: propsState?.userId,
      code: OTP,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    try {
      const response = await registrationVerify(
        OPEN_POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        let data = {
          emailorPhone: propsState.emailorPhone,
          userID: propsState.userId,
          token: body.token.accessToken,
        };
        goToSpecificPathNameWithData(history, CHANGE_PASSWORD, data);
      } else {
        setOTP('');
        alert(body?.message);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  const clickOnSendAgain = async () => {
    setIsResendLoading(true);
    // 
    let postData = {
      userId: propsState?.userId,
      emailOrPhoneNo: propsState?.emailorPhone,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    try {
      const response = await resendCode(POST_CONFIG(JSON.stringify(postData)));
      const body = await response.json();
      if (response.ok) {
        setIsResendLoading(false);
        window.location.reload();
        return null;
      } else {
        alert(body.message);
      }
      setIsResendLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return [
    isResendLoading,
    isLoading,
    OTP,
    setOTP,
    isError,
    /**
     * action
     */
    verifyConfirm,
    clickOnSendAgain,
  ];
}
