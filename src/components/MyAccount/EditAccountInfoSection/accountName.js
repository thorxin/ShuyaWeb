import { useState } from "react";
import { useTranslation } from "react-i18next";

//images
import EditPen from "../../../assets/myaccount/edit_pen.svg";
import DiamondIcon from "../../../assets/myaccount/diamond.svg";

//components
import { ErrorMessageBoxValidation } from "../../CommonComponent/error_box";

const AccountName = ({
  account_name = "",
  user_name = "",
  is_required_name,
  /**
   * action
   */
  changingName,
  clickingUpdate,
}) => {
  const { t } = useTranslation();

  const [isEditName, setIsEditName] = useState(false);

  const clickingEditorCancel = (is_edit) => {
    setIsEditName(is_edit);
  };

  return isEditName ? (
    <>
      <div>
        <input
          type="text"
          maxlength="25"
          className="primary-text-box px-3 py-2"
          value={user_name}
          onChange={(e) => changingName(e.target.value)}
          autoFocus
        />
        {is_required_name && (
          <ErrorMessageBoxValidation errorMessage="Required" />
        )}
      </div>
      <div className="flex space-x-5">
        <button
          className="primary-btn caption-font my-2 py-1 px-3"
          onClick={() => clickingEditorCancel(false)}
        >
          {t("Common.not-do")}
        </button>
        <button
          className="primary-btn caption-font my-2 py-1 px-3"
          onClick={clickingUpdate}
        >
          {t("Common.do")}
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="space-y-1">
        <div className="flex space-x-4">
          <p className="primary-font">{account_name}</p>
          <img
            src={EditPen}
            className="w-3.5 h-auto cursor-pointer"
            alt="EditPen"
            onClick={() => clickingEditorCancel(true)}
          />
        </div>
        <div className="flex space-x-1">
          <img src={DiamondIcon} className="w-5 h-auto" alt="DiamondIcon" />
          <p className="caption-font">{t("MyAccount.verified-information")}</p>
        </div>
      </div>
    </>
  );
};

export default AccountName;
