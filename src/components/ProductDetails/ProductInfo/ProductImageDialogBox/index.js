import React from 'react'

//components
import PlaceHolderImage from '../../../CommonComponent/placeholder_image'
import { Carousel } from 'react-responsive-carousel'

//images
import BackArrowIcon from '../../../../assets/common/back_arrow.svg'

const ProductImageDialogBox = ({
  ProductImageArray = [],
  SelectedSku = [],
  closeVariantBox,
}) => {
  return (
    <>
      <div className="h-auto max-w-screen-sm md:mx-auto backdrop-filter backdrop-blur-sm">
        <div className="bg-transparent rounded-lg">
          <div
            className="w-3 h-auto cursor-pointer mx-2 pt-2"
            onClick={closeVariantBox}
          >
            {/* <img src={BackArrowIcon} className="w-full h-full" alt="Back Arrow Icon" /> */}
          </div>
          <div className="grid justify-items-center pb-6">
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={true}
            >
              {ProductImageArray.length > 0 ? (
                ProductImageArray.map((image) => (
                  <div key={image.id}>
                    <img
                      src={image.url}
                      className="w-full h-full object-contain"
                      alt="ADSlide"
                    />
                  </div>
                ))
              ) : (
                <div className="w-full h-80 bg-gray-50">
                  <img
                    src={PlaceHolderImage}
                    className="w-full h-full object-contain"
                    alt="PlaceHolder Icon"
                  />
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductImageDialogBox
