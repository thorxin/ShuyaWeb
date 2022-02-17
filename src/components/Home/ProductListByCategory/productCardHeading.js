import React from 'react'

// images
// import ViewMore from "../../../assets/home/more_view.svg"

const ProductCardHeading = ({
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
    <div className=" py-4 md:py-3 mx-2 md:mx-0">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row bg-custom-secondary px-4 py-1.5 rounded-md cursor-pointer hover:border-red-500 border">
          <img
            src={Url}
            className="w-10 h-10 rounded-full  border-2"
            alt="ProductListImage"
          />
          <p className="pl-2 primary-font text-color-default my-auto">
            {Heading}
          </p>
        </div>
        {productLength.length > 6 && (
          <div
            className="flex cursor-pointer bg-custom-secondary rounded-md px-4 py-1.5"
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
export default ProductCardHeading
