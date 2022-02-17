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
    <div className="bg-white py-4 md:py-3 mx-2 md:mx-0">
      <div className="flex justify-between items-center">
        <div></div>
        {productLength.length > 0 && (
          <p className="sub-heading-font text-color-primary truncate w-9/12 h-auto">
            {Heading}
          </p>
        )}
        {productLength.length >= 6 && (
          <div className="flex cursor-pointer" onClick={onClickViewMore}>
            <p className="primary-font text-color-secondary  md:px-2  md:py-1  md:cursor-pointer">
              {ViewAll}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductCardHeading
