import React from "react";

//images
import RightArrowIcon from "../../../../assets/productDetail/right_arrow_icon.svg";
import { SELECT_VARIANT } from "../../../../constant/variantSelectionConfig";

const HeadingLayout = ({
  HeadingName = "",
  ViewMoreName = "",
  /**
   * action
   */
  onClickViewMore,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="sub-heading-font"> {HeadingName} </p>
        <div className="flex space-x-2 items-center" onClick={() => onClickViewMore(SELECT_VARIANT)}>
          <p className="secondary-font text-color-secondary cursor-pointer">
            {ViewMoreName}
          </p>
          <div>
            <img
              src={RightArrowIcon}
              className="w-2 h-auto"
              alt="RightArrowIcon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingLayout;
