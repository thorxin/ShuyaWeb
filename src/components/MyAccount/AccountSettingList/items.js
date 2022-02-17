import React from "react";

//images
import RightArrow from "../../../assets/myaccount/right_arrow_icon.svg";

const SettingItems = ({
  Icon = "",
  Label = "",
  LabelNoData = "",
  /**
   * action
   */
  clickingItem,
}) => {

  return (
    <div className="flex justify-between py-5 2xl:py-10 border-b cursor-pointer hover:text-color-link" onClick={clickingItem}>
      <div className="flex space-x-4">
        <div>
          <img src={Icon} className="w-4 h-auto my-1" alt="Icon" />
        </div>
        <div>
          <p className="secondary-font"> {Label ? Label : LabelNoData } </p>
        </div>
      </div>
      <div className="my-auto">
        <img src={RightArrow} className="w-2 h-auto" alt="RightArrowIcon" />
      </div>
    </div>
  );
};

export default SettingItems;
