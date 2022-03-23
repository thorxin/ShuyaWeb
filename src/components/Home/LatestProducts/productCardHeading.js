/** @format */

import React from 'react'

const ProductCardHeading = ({
  Heading = '',
  ViewAll = '',
  /**
   * action
   */
  onClickViewMore,
  productLength,
}) => {
  return (
    <div className="bg-custom-main-light py-4 md:py-3 px-2 md:px-0">
      <div className="flex justify-end py-4 relative">
        {/* <div className='hidden md:block'></div> */}
        {productLength.length > 0 && (
          <p className="section-title-font text-xl md:text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-auto text-color-default font-bold">
            {Heading}
          </p>
        )}
        <div
          className="hidden md:block flex cursor-pointer"
          onClick={onClickViewMore}
        >
          <p className="viewmore--hover-animation primary-font text-color-secondary  md:px-2  md:py-1  md:cursor-pointer">
            {productLength.length > 4 && ViewAll}
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProductCardHeading
