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
      <div className="flex justify-start hidden md:block">
        {productLength.length > 0 && (
          <p className="section-title-font text-xl md:text-2xl  h-auto ">
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
