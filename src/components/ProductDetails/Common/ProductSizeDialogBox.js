import React from 'react'

//components
import { Carousel } from 'react-responsive-carousel'
import PlaceHolderImage from '../../CommonComponent/placeholder_image'

//images
import BackArrowIcon from '../../../assets/common/back_arrow.svg';

const ProductSizeDialogBox = ({
  sizeChatimg = {},
  closeVariantBox,
}) => {
    console.log(sizeChatimg)
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
            <div className="w-full h-80 bg-gray-50">
                {sizeChatimg && 
                    <img
                    src={sizeChatimg.url}
                    className="w-full h-full object-contain"
                    alt="PlaceHolder Icon"
                    />
                }
                
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSizeDialogBox
