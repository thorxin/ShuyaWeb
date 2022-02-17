import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image'
import moneyFormatter from '../../../util/moneyFormatter'
import { goProductDetails } from '../../../util/goToSpecificPathName'
import { BY_CATEGORY } from '../../../constant/locationPathName'
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName'

const ProductCard = ({ productData = {} }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const goToByCategory = () => {
    let propsData = {
      id: productData.id,
      name: productData.name,
    }
    goToSpecificPathNameWithData(history, BY_CATEGORY, propsData)
  }
  return (
    <div
      className="cursor-pointer w-24 md:w-auto group"
      onClick={() => history.push(`bybrand/${productData.id}`)}
    >
      <div className="w-full mx-auto h-auto ">
        <div className="flex flex-shrink-0 justify-center">
          <img
            src={productData.logoUrl}
            className=" w-12 h-12 flex flex-shrink-0 group-hover:scale-110 transform duration-150"
            alt="Product"
          />
        </div>
        {/* <PlaceHolderImage /> */}
        <div className=" py-4 pl-2 bg-name-price -mt-2">
          <p className="tertiary-font text-color-default text-center line-clamp-2 custom-font-bold group-hover:text-color-secondary">
            {productData.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
