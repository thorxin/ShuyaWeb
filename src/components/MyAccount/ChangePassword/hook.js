import { useState } from "react";
import { useHistory } from "react-router";

//components
import { POST_CONFIG_ } from "../../../constant/header";
import { APPLICATION_CONFIG_ID } from "../../../constant/applicationConfig";
import { changePassword } from "../../../services/service.myaccount";
import {
  goToSpecificPathName,
} from "../../../util/goToSpecificPathName";
import {
  GET_STORED_USER_ID,
} from "../../../util/storage";
import { MY_ACCOUNT } from "../../../constant/locationPathName";

export function Hook() {
const history = useHistory();

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
      userId: GET_STORED_USER_ID,
      oldPassword: data.OldPassword,
      newPassword: data.NewPassword,
      applicationConfigId: APPLICATION_CONFIG_ID,
      language: 1
    };

    try {
      const response = await changePassword(POST_CONFIG_(JSON.stringify(Data)));
      const body = await response.json();
      if (response.ok) {
        setIsSuccessChanged(true);
      } else {
        alert(body?.message);
      }
    } catch (error) {
      alert(error.errorMessage);
    }
    setIsLoading(false);
  };

  const goTo = () => {
    goToSpecificPathName(history, MY_ACCOUNT);
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
