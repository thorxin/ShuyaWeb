import React from "react";

//images
import RightArrowIcon from "../../../assets/common/right_arrow_icon.svg";

const HeadingLayout = ({
    HeadingText = "",
ViewMoreText = "",
/**
 * action
 */
clickOnViewMore
}) => {
  return (
    <>
      <div className="flex justify-between items-center md:mx-auto mx-4">
        <p className="sub-heading-font text-color-default ">{HeadingText}</p>
        <div className="w-2 h-auto block md:hidden" onClick={clickOnViewMore}>
          <img
            src={RightArrowIcon}
            className="w-full h-full"
            alt="Right Arrow Icon"
          />
        </div>
        <p className="primary-font  text-color-default hidden md:block cursor-pointer" onClick={clickOnViewMore}>
          {ViewMoreText}
        </p>
      </div>
    </>
  );
};

export default HeadingLayout;
