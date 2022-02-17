import { useHistory } from "react-router";
import { useState } from "react";

//components
import { forgotPassword } from "../../../services/service.auth";
import { OPEN_POST_CONFIG } from "../../../constant/header";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import { OTP_VERIFICATION } from "../../../constant/locationPathName";
import { APPLICATION_CONFIG_ID } from "../../../constant/applicationConfig";
import { getLanguageTypeForAuth } from "../../../util/storage";

export function Hook() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value) => {
    setIsLoading(true);
    let language_config = getLanguageTypeForAuth();
    let postData = {
      emailOrPhoneNo: value.PhoneNumber,
      language: language_config,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    try {
      const response = await forgotPassword(
        OPEN_POST_CONFIG(JSON.stringify(postData))
      );
      const body = await response.json();
      if (response.ok) {
        let propsState = {
          emailorPhone: value.PhoneNumber,
          userId: body.user.id,
        };
        goToSpecificPathNameWithData(history, OTP_VERIFICATION, propsState);
      } else {
          alert(body?.message)
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return [
    isLoading,
    /**
     * action
     */
    onSubmit,
  ];
}
