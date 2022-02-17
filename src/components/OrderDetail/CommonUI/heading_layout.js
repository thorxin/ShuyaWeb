import React from "react";

//images
import DownArrowIcon from "../../../assets/common/down_arrow.svg";
import UpArrowIcon from "../../../assets/common/up_arrow.svg";

const HeadingLayout = ({
  HeadingText = "",
  isShow = true,
  /**
   * action
   */
  clickOnArrowIcon,
}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="price-font text-color-secondary custom-font-bold">{HeadingText}</p>
      <div className="md:hidden">
        <img
          src={isShow ? UpArrowIcon : DownArrowIcon}
          className="w-4 h-auto"
          alt="ArrowIcon"
          onClick={clickOnArrowIcon}
        />
      </div>
    </div>
  );
};

export default HeadingLayout;
