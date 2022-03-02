import React from "react";

const ProductCardHeading = ({
  Heading = "",
  ViewAll = "",
  /**
   * action
   */
  onClickViewMore,
  productLength
}) => {
  return (
    <div className="rounded-t-2xl py-2 md:py-3 px-2 md:px-0">
      <div className="flex justify-between items-center">
        {productLength.length > 0 && <p className="section-title-font text-xl md:text-2xl ml-14 mr-14  h-auto">{Heading}</p>}
      </div>
      <div className="text-center block md:hidden">
        {productLength.length > 0 && <p className="section-title-font h-auto">{Heading}</p>}
      </div>
    </div>
  );
};
export default ProductCardHeading;
