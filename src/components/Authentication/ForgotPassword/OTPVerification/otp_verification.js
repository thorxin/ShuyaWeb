import React from "react";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-i18next";

//component
import { Hook } from "./hook";
import DefaultContainer from "../../../WrapperComponents/default_auth_container";
import AuthenticationLoading from "../../../CommonComponent/Loading/auth_loading";
import { ErrorMessageBoxValidation } from "../../../CommonComponent/error_box";

//images
import ResendLoading from "../../../../assets/Authentication/Loading/resend_loading.gif";
import ResendIcon from "../../../../assets/Authentication/Verification/resend_icon.svg";

export default function OTPVerification(props) {
  const [
    isResendLoading,
    isLoading,
    OTP,
    setOTP,
    isError,
    /**
     * action
     */
    verifyConfirm,
    clickOnSendAgain
  ] = Hook(props);
 const {t} = useTranslation()
  return (
    <>
      <DefaultContainer>
        <div>
          <p className="secondary-font text-center">
            {t("Verification.code-has-been-sent")}
          </p>
          <p className="secondary-font text-center">
            {t("Verification.enter-the-code")}
          </p>
        </div>
        <OtpInput
          isInputNum={true}
          shouldAutoFocus={true}
          value={OTP}
          onChange={setOTP}
          numInputs={6}
          containerStyle={"justify-evenly"}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            fontSize: "1rem",
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.20)",
            margin: "auto",
          }}
        />
        <div className={`${isError ? "block" : "hidden"} `}>
          <ErrorMessageBoxValidation
            errorMessage={`${t("Authentication.error-message-en")} ${t(
              "Authentication.require-code"
            )}${t("Authentication.error-message")}
                    `}
          />
        </div>
        <button onClick={() => verifyConfirm(OTP)} className="auth-btn">
          {isLoading ? (
            <AuthenticationLoading />
          ) : (
            <p> {t("Verification.confirm")} </p>
          )}
        </button>
      
      <div className="default-margin-layout flex justify-between items-center">
        <p className="tertiary-font text-color-secondary">
          {t("Verification.didn't-get-code")}
        </p>
        <div className="flex items-center space-x-2">
          <div>
            {isResendLoading ? (
              <img
                src={ResendLoading}
                className="w-4 h-auto"
                alt="Resend Icon"
              />
            ) : (
              <img src={ResendIcon} className="w-4 h-auto" alt="Resend Icon" />
            )}
          </div>
          <button onClick={() => clickOnSendAgain()}>
            <p className="tertiary-font">{t("Verification.resend")}</p>
          </button>
        </div>
        </div>
        </DefaultContainer>
    </>
  );
}
