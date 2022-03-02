import { useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

//images
import EditPen from "../../../assets/myaccount/edit_pen.svg";
import DiamondIcon from "../../../assets/myaccount/diamond.svg";
import DiamondIconMobile from "../../../assets/myaccount/diamond.svg";
import WishIcon from '../../../assets/myaccount/wish_icon.svg';

//components
import { ErrorMessageBoxValidation } from "../../CommonComponent/error_box";
import {
  WISH_LIST
} from '../../../constant/locationPathName';
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";

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
  const history = useHistory();

  const [isEditName, setIsEditName] = useState(false);

  const clickingEditorCancel = (is_edit) => {
    setIsEditName(is_edit);
  };

  const goTo = (location = "", data) => {
    goToSpecificPathNameWithData(history, location, data);
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
        <div className="flex justify-between">
            <p className="text-xl font-bold cursor-pointer hidden md:block" onClick={() => clickingEditorCancel(true)}>{account_name}</p>
            <p className="primary-font custom-font-bold cursor-pointer block md:hidden" onClick={() => clickingEditorCancel(true)}>{account_name}</p>
            <p className="md:-mr-20 hidden md:block"><img
            src={WishIcon}
            className="w-5 h-auto cursor-pointer inline"
            alt="EditPen"
            onClick={() => clickingEditorCancel(true)}
            />
              <span className="pl-3 primary-font text-color-secondary cursor-pointer"  onClick={() => goTo(WISH_LIST)} >My Wishlist</span></p>
            <p className="block md:hidden"><img
            src={EditPen}
            className="w-3.5 h-auto cursor-pointer inline mb-2"
            alt="EditPen"
            onClick={() => clickingEditorCancel(true)}
            />
            </p>
        </div>
        <div className="flex space-x-1">
          <img src={DiamondIconMobile} className="w-5 h-auto block md:hidden" alt="DiamondIcon" />
          <img src={DiamondIcon} className="w-5 h-auto hidden md:block" alt="DiamondIcon" />
          <p className="caption-font text-color-verify block md:hidden">{t("MyAccount.verified-information")}</p>
          <p className="tertiary-font text-color-primary hidden md:block pl-2">{t("MyAccount.verified-information")}</p>
        </div>
        <div className="flex space-x-1 ml-2 mt-4 hidden md:block">
        <p className="md:-mr-20 hidden md:block"><img
            src={EditPen}
            className="w-3.5 h-auto cursor-pointer inline"
            alt="EditPen"
            onClick={() => clickingEditorCancel(true)}
            />
              <span className="pl-3 tertiary-font text-color-secondary "  onClick={() => clickingEditorCancel(true)} >Edit Profile</span></p>
            <p className="block md:hidden"><img
            src={EditPen}
            className="w-3.5 h-auto cursor-pointer inline mb-2"
            alt="EditPen"
            onClick={() => clickingEditorCancel(true)}
            />
            </p>
        </div>
        </div>
    </>
  );
};

export default AccountName;