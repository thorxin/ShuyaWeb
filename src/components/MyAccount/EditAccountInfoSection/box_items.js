import React from "react";
import { useTranslation } from "react-i18next";

const SuccessDialogBox = ({
  Text,
  /**
   * action
   */
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="md:w-8/12 w-11/12 h-auto max-w-sm transition-all transform bg-white shadow-xl rounded-lg space-y-5 py-4">
        <div>
          <p className="primary-font text-center">
            {Text} {t("MyAccount.profile_updated_successful")}
          </p>
        </div>
        <div className="flex justify-center mx-8">
          <button className="primary-btn tertiary-font py-3 px-10" onClick={closeModal}>
            <p> {t("MyAccount.ok")} </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialogBox;
