import { useState } from "react";
import { useLocation } from "react-router";

//components
import { POST_CONFIG_ } from "../../../../constant/header";
import { APPLICATION_CONFIG_ID } from "../../../../constant/applicationConfig";
import { resetPassword } from "../../../../services/service.auth";
import { goToSpecificAfterAuth } from "../../../../util/goToSpecificPathName";
import { setLocalStorageTokenAndUserInfo } from "../../../../util/storage";

export function Hook() {
  const location = useLocation();
  const propsState = location.state;

  const [isLoading, setIsLoading] = useState(false);

  const [newPasswordLength, setNewPasswordLength] = useState("");
  const [isRequiredCharacter, setIsRequiredCharacter] = useState(true);
  const [isRequiredNumber, setIsRequiredNumber] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccessChanged, setIsSuccessChanged] = useState(false);

  const numberIdentifier = /(?=.*\d)/;
  const alphabetIdentifier = /([a-zA-Z])/;

  const matchingPasswordStrength = (text = "") => {
    if (text.match(alphabetIdentifier)) {
      setIsRequiredCharacter(false);
    } else {
      setIsRequiredCharacter(true);
    }
    if (text.match(numberIdentifier)) {
      setIsRequiredNumber(false);
    } else {
      setIsRequiredNumber(true);
    }
  };

  const changeOnNewPassword = (event) => {
    setNewPasswordLength(event.target.value.length);
    matchingPasswordStrength(event.target.value);
  };

  const clickingOnTermsCheck = () => {
    setIsChecked(!isChecked);
  };

  const sendPassword = async (data) => {
    setIsLoading(true);
    const Data = {
      emailOrPhoneNo: propsState?.emailorPhone,
      password: data.NewConfirmPassword,
      applicationConfigId: APPLICATION_CONFIG_ID,
    };
    let access_token = `Bearer ${propsState.token}`;
    try {
      const response = await resetPassword(
        POST_CONFIG_(JSON.stringify(Data), access_token)
      );
      const body = await response.json();
      if (response.ok) {
        setIsSuccessChanged(true);
        setLocalStorageTokenAndUserInfo(
          body.token.accessToken,
          body.token.refreshToken,
          body.user
        );
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error.errorMessage);
    }
    setIsLoading(false);
  };

  const goTo = () => {
    goToSpecificAfterAuth();
  };

  return [
    isLoading,
    newPasswordLength,
    isRequiredCharacter,
    isRequiredNumber,
    isChecked,
    isSuccessChanged,
    setIsSuccessChanged,
    /**
     * action
     */
    changeOnNewPassword,
    clickingOnTermsCheck,
    sendPassword,
    goTo,
  ];
}
