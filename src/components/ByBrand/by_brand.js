import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//images
import LeftArrowImage from '../../assets/productSearch/left_arrow_image.png'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
import { Hook } from './hook'
import ProductCard from './Products/productCard'
import placeholder from '../../assets/common/placeholder_icon.svg'
import Loading from '../CommonComponent/Loading/main_loading'
import LoadMoreButton from '../CommonComponent/LoadMoreButton'

// components
import { SubHeadingWithBackArrow } from '../CommonComponent/SubHeading/sub_heading_with_back_arrow'

const By_brand = (props) => {
  const [page, setPage] = useState(1)
  const [goBack] = Hook({ ...props, page })
  const {
    productsByBrand = {},
    products = [],
    isLoading,
    product_count,
  } = props
  const history = useHistory()
  const { t } = useTranslation()

  if (isLoading) return <Loading />

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-5 md:pt-20">
        <NavigationWeb />

        <div
          className="default-margin-layout flex space-x-2 items-center cursor-pointer py-2 px-4 md:p-0"
          onClick={() => goBack(history)}
        >
          <div className="w-3 h-auto">
            <img
              src={LeftArrowImage}
              className="w-full h-full"
              alt="Back Arrow Icon"
            />
          </div>
          <p className="tertiary-font text-color-default">{t('Common.back')}</p>
        </div>

        <div className="default-margin-layout">
          <div className="bg-white mx-auto space-y-5">
            <div className="relative">
              <img
                src={productsByBrand?.url}
                className="w-full h-52 object-cover object-top"
              />
              <div className="absolute inset-x-0 top-40">
                <div className="flex justify-center">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={
                      productsByBrand?.brandLogo
                        ? productsByBrand?.brandLogo
                        : placeholder
                    }
                    alt="Brand Logo"
                    onError={(e) => (e.target.src = placeholder)}
                  />
                </div>
              </div>
            </div>

            {/* Brand name and description  */}
            <div className="pt-8">
              <p className="sub-heading-font-h3 custom-font-bold text-color-default  text-center">
                {productsByBrand?.brandName}
              </p>
              <p className="primary-font md:mx-8 mx-4">
                {productsByBrand?.description}
              </p>
              <p className="mx-4 md:mx-8  pt-2 border-b-2 border-gray-200"></p>
            </div>
            {/* Brand name and description */}

            <div className="bg-white h-auto">
              {/* Product Brands  */}
              <p className="sub-heading-font-h3 text-color-default custom-font-bold pb-3 uppercase md:mx-8 mx-4">
                Products
              </p>
              <div className="w-full h-auto mx-auto">
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:mx-8 mx-4">
                    {products.length > 0 &&
                      products.map((products) => (
                        <ProductCard
                          key={products.productId}
                          productData={products}
                        />
                      ))}
                  </div>

                  {page >= 1 && product_count > 5 ? (
                    <div className="w-full h-4 md:-ml-12 -ml-6 pb-20 md:pb-0">
                      <LoadMoreButton
                        IsLoading={false}
                        IsLoadMore={true}
                        /**
                         * action
                         */
                        ClickingOnLoadMoreBtn={() =>
                          setPage((prev) => prev + 1)
                        }
                      />
                    </div>
                  ) : (
                    <p className="primary-font text-color-secondary text-center  pb-20 md:pb-0">
                      No More Data
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-200 h-4"></div>
          </div>
        </div>
      </div>
      <FooterWeb />
      <FooterMobile />
    </>
  )
}

export default By_brand
