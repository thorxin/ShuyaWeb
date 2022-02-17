import React from "react";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";

//components
import DefaultAuthContainer from "../../WrapperComponents/default_auth_container";

//images
import ResendLoading from "../../../assets/Authentication/Loading/resend_loading.gif";
import ResendIcon from "../../../assets/Authentication/Verification/resend_icon.svg";
import { ErrorMessageBoxValidation } from "../error_box";

export default function OTPVerification({
  isResendLoading,
  OTP,
  setOTP,
  isError,
  /**
   * action
   */
  verifyConfirm,
  sendCodeAgain,
}) {
  const { t } = useTranslation();

  return (
    <DefaultAuthContainer>
      <div className="default-margin-layout">
        <p className="primary-font text-center">
          {t("Verification.code-has-been-sent")}
        </p>
        <p className="primary-font text-center">
          {t("Verification.enter-the-code")}
        </p>
      </div>
      <div className="default-margin-layout">
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
            errorMessage={`${t("Authentication.error-message-en")}${t(
              "Authentication.require-code"
            )}${t("Authentication.error-message")}
                    `}
          />
        </div>
      </div>
      <div className="default-margin-layout">
        <button className="auth-btn" onClick={() => verifyConfirm(OTP)}>
          <p> {t("Verification.confirm")} </p>
        </button>
      </div>
      <div className="default-margin-layout flex justify-between items-center">
        <p className="tertiary-font text-color-secondary">
          {t("Verification.didn't-get-code")}
        </p>
        <div className="flex items-center space-x-2">
          <div>
            {isResendLoading ? (
              <img
                src={ResendLoading}
                className="w-5 h-auto"
                alt="Resend Icon"
              />
            ) : (
              <img src={ResendIcon} className="w-5 h-auto" alt="Resend Icon" />
            )}
          </div>
          <button onClick={() => sendCodeAgain()}>
            <p className="tertiary-font">{t("Verification.resend")}</p>
          </button>
        </div>
      </div>
    </DefaultAuthContainer>
  );
}
