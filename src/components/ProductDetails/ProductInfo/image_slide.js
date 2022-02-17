import React from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import './customize-carousel.css'
//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'

//images
import PlaceHolderIcon from '../../../assets/common/placeholder_icon.svg'

const ProductImageSlide = ({
  ProductImageArray = [],
  openImageVariantBox,
  defaultImage = [],
  IsGetOne,
}) => {
  return (
    <Carousel
      showThumbs={true}
      infiniteLoop={true}
      showStatus={false}
      showIndicators={false}
    >
      {ProductImageArray.length > 0
        ? ProductImageArray.map((image) => (
            <div
              key={image.id}
              className={`w-full h-96 md:border-2 cursor-pointer ${
                IsGetOne ? 'bg-yellow-300' : 'bg-gray-50'
              }`}
              onClick={openImageVariantBox}
            >
              <img
                src={image.url}
                className="w-full h-full object-contain"
                alt="ADSlide"
              />
            </div>
          ))
        : defaultImage.map((image) => (
            <div
              key={image.id}
              className="w-full h-96 bg-gray-50  md:border-2 cursor-pointer"
              onClick={openImageVariantBox}
            >
              <img
                src={image.url}
                className="w-full h-full object-contain"
                alt="ADSlide"
              />
            </div>
          ))}
    </Carousel>
  )
}

export default ProductImageSlide
