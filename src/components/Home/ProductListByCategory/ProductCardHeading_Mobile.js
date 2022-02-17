/** @format */

import React from 'react'

// images
// import ViewMore from "../../../assets/home/more_view.svg"

const ProductCardHeading_Mobile = ({
  Url,
  Heading = '',
  ViewAll = '',
  /**
   * action
   */
  onClickViewMore,
  productLength,
}) => {
  return (
    <div className="md:bg-white bg-gray-100 py-4 md:py-3 md:w-9/12 2xl:w-9/12 m-auto">
      <div className="md:flex md:justify-between md:items-center ">
        <div className="flex md:flex-row md:justify-center md:mx-0 mx-2">
          {/* <img src={Url} className="w-10 h-10 rounded-full  border-2" /> */}
          <p className="custom-font-regular text-xl md:text-2xl  h-auto text-color-primary">
            {Heading}
          </p>
        </div>
        {productLength.length > 6 && (
          <div
            className="cursor-pointer hidden md:block"
            onClick={onClickViewMore}
          >
            <p className="primary-font text-color-secondary  md:px-2  md:py-1  md:cursor-pointer">
              {ViewAll}
            </p>
            {/* <img src={ViewMore} className="w-auto h-4 my-auto hidden md:block"></img> */}
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductCardHeading_Mobile
