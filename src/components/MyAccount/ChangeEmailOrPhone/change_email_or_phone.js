import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import { Hook } from "./hook";
import DefaultAuthContainer from "../../WrapperComponents/default_auth_container";
import { ErrorMessageBoxValidation } from "../../CommonComponent/error_box";
import AuthenticationLoading from "../../CommonComponent/Loading/auth_loading";

export default function ChangeEmailOrPhone() {
  const [
    isLoading,
    /**
     * action
     */
    onSubmit,
  ] = Hook();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <DefaultAuthContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <p className="sub-heading-font text-center md:my-auto">
            {t("MyAccount.change-phone")}
          </p>
          <input
            type="tel"
            className="auth-text-box"
            placeholder={t("Authentication.fill-phone")}
            {...register("PhoneNumber", {
              required: `${t("Authentication.error-message-en")} ${t(
                "Authentication.require-phone"
              )} ${t("Authentication.error-message")}`,
            })}
          />
          {errors.PhoneNumber && (
            <ErrorMessageBoxValidation
              errorMessage={errors.PhoneNumber.message}
            />
          )}
          <div>
            <button type="submit" className="auth-btn">
              {isLoading ? (
                <AuthenticationLoading />
              ) : (
                <p>{t("Authentication.confirm")}</p>
              )}
            </button>
          </div>
        </form>
      </DefaultAuthContainer>
    </>
  );
}
