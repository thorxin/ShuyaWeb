/** @format */

import React from "react";

const ProductCardHeading = ({
  Heading = "",
  ViewAll = "",
  /**
   * action
   */
  onClickViewMore,
  productLength,
}) => {
  return (
    <div className="rounded-t-2xl py-2 md:py-3 px-2 md:px-0">
      <div className="flex justify-between items-center">
        {/* <div className="hidden md:block"></div> */}
        {productLength.length > 0 && (
          <p className="section-title-font text-xl md:text-2xl  h-auto text-color-white">
            {Heading}
          </p>
        )}
        <div className="flex cursor-pointer" onClick={onClickViewMore}>
          <p className="primary-font text-color-secondary  md:px-2  md:py-1  md:cursor-pointer">
            {productLength.length > 4 && ViewAll}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductCardHeading;
