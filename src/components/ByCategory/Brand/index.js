import React from 'react'

import defaultIcon from "../../../assets/notification/default.svg"

const index = ({ filterBrand = [], byBrandid }) => {
  return (
    <>
      <div>By Brand</div>
      <div className="flex">
        {filterBrand.map((brand, index) => (
          <div key={index} onClick={() => byBrandid(brand.brandId)}>

            <img
              src={brand.url ? brand.url : defaultIcon}
              alt='lotion'
              className="w-5 h-5"
            />
            <p className=''>
              {brand.brandName}
            </p>

          </div>
        ))}
      </div>
    </>
  )
}

export default index
