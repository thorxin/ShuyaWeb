import React from "react";
import { useTranslation } from "react-i18next";
import ConfirmationBox from "./DialogBox/confirmation_box";

//images
import RightArrow from "../../../assets/myaccount/right_arrow_icon.svg";

const SettingItems = ({
  Icon = "",
  Label = "",
  LabelNoData = "",
  /**
   * action
   */
  isShowLogoutBox,
  setIsShowLogoutBox,
  clickingLogout,
  confirmLogout
}) => {
    const { t } = useTranslation();

    return (
      <>
            <div className="flex justify-between py-5 2xl:py-10 border-b cursor-pointer hover:text-color-link" onClick={clickingLogout}>
            <div className="flex space-x-4">
                <div>
                <img src={Icon} className="w-4 h-auto my-1" alt="Icon" />
                </div>
                <div>
                <p className="secondary-font"> {Label ? Label : LabelNoData } </p>
                </div>
            </div>
            <div>
                <img src={RightArrow} className="w-2 h-auto" alt="RightArrowIcon" />
            </div>
            </div>
            <ConfirmationBox
                isOpenBox={isShowLogoutBox}
                ConfirmationMessage={t("MyAccount.are-you-sure-to-logout")}
                /**
                * action
                */
                cancelBox={() => setIsShowLogoutBox(false)}
                confirmBox={confirmLogout}
            />
       </>     
  );
};

export default SettingItems;
