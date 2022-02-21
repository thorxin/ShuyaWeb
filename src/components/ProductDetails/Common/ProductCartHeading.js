/** @format */

import React from "react";

const ProductCartHeading = ({
  HeadingName = "",
  TextColor_HeadingName,
  ViewMore = "",
  TextColor_ViewMore,

  /**
   * action
   */
  onClickViewMore,
  productLength,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        {/* <div className='hidden md:block'></div> */}

        <p
          className={`sub-heading-font-h3 section-title-font ${TextColor_HeadingName}`}
        >
          {HeadingName}
        </p>
        <div
          className="hidden md:block md:flex cursor-pointer"
          onClick={onClickViewMore}
        >
          <p className="primary-font text-color-secondary  md:px-2  md:py-1  md:cursor-pointer">
            {productLength.length > 4 && ViewMore}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCartHeading;
