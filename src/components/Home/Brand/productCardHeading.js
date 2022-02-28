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
    <div className="bg-white py-4 md:py-3 mx-2 md:mx-0">
      <div className="justify-start hidden md:flex relative py-4">
        {productLength.length > 0 && (
          <p className="section-title-font text-xl md:text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-auto text-color-default font-bold">
            {Heading}
          </p>
        )}
      </div>
      <div className="text-center block md:hidden">
        {productLength.length > 0 && (
          <p className="section-title-font text-xl md:text-2xl  h-auto ">
            {Heading}
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductCardHeading;
