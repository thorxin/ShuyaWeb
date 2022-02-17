import { useState } from "react";
import { useHistory, useLocation } from "react-router";

import { changePhoneNumber } from "../../../services/service.myaccount";
import { APPLICATION_CONFIG_ID } from "../../../constant/applicationConfig";
import { POST_CONFIG } from "../../../constant/header";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import { OTP_VERIFICATION_BY_MY_ACCOUNT } from "../../../constant/locationPathName";
import { getLanguageTypeForAuth, GET_STORED_USER_ID } from "../../../util/storage";

export function Hook() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let lang = getLanguageTypeForAuth();
    let postData = {
      userId: GET_STORED_USER_ID,
      emailOrPhoneNo: data.PhoneNumber,
      language: lang,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    try {
      const response = await changePhoneNumber(
        POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        let propsData = {
          emailOrPhone: data.PhoneNumber,
        };
        goToSpecificPathNameWithData(
          history,
          OTP_VERIFICATION_BY_MY_ACCOUNT,
          propsData
        );
      } else {
        alert(body.message);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return [
    isLoading,
    /**
     * action
     */
    onSubmit,
  ];
}
