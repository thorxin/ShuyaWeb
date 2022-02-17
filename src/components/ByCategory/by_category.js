/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
//images
import placeholder from '../../assets/common/placeholder_icon.svg'
import LeftArrowImage from '../../assets/productSearch/left_arrow_image.png'
//components
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb'
import Loading from '../CommonComponent/Loading/main_loading'
import FooterWeb from '../CommonComponent/Footer/web_footer'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import { Hook } from './hook'

const By_category = (props) => {
  const [
    isLoading,
    mainCategory,
    mainCategoryDetail,
    selectedCategory,
    /**
     * actions
     */
    onSelectCategory,
    goToSearch,
    CategoryDetailList,
    goBack,
  ] = Hook(props)

  const history = useHistory()
  const { t } = useTranslation()

  if (isLoading) return <Loading />
  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-5 md:pt-20">
        <NavigationWeb />
        <div className="mx-auto space-y-5 mb-20 md:mb-0">
          <div className="default-margin-layout">
            <div className="md:-mt-2 py-2 md:pt-0 pl-2 md:pl-0 sticky top-0">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => goBack(history)}
              >
                <div className="w-4 h-auto">
                  <img
                    src={LeftArrowImage}
                    className="w-full h-full"
                    alt="Left Arrow"
                  />
                </div>
                <p className="primary-font text-color-default">
                  {t('Common.back')}
                </p>
              </div>
            </div>
            <div className="bg-white min-h-screen">
              {/*ByCategory  */}
              <div className="grid grid-cols-3 gap-0 h-screen">
                <div className="overflow-auto">
                  <div className="md:my-4 sub-heading-font-h3 text-color-default text-center md:text-left md:pl-6 hidden md:block">
                    {t('ByCategory.view-by-category')}
                  </div>
                  <div className="block md:hidden -mt-3.5"></div>
                  {mainCategoryDetail.map((item, index) => (
                    <div
                      key={index}
                      className={`flex my-4 md:space-x-2 flex-col md:flex-row items-center cursor-pointer md:pl-4
                       ${
                         selectedCategory.id === item.id
                           ? 'bg-custom-orange'
                           : ''
                       }`}
                      onClick={() => {
                        onSelectCategory(item)
                      }}
                    >
                      <div
                        className={`${
                          selectedCategory.id === item.id ? 'py-2 ' : 'py-2'
                        }`}
                      >
                        <img
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                              'http://mypage.shopdoora.com/static/media/app_logo.5009884d.svg'
                          }}
                          src={item.url ? item.url : placeholder}
                          className="w-10 h-15 ml-1"
                          alt="CatImg"
                        />
                      </div>

                      <div
                        className={`text-center md:text-left text-sm md:text-md custom-font-regular ${
                          selectedCategory.id === item.id
                            ? 'md:pr-6 pr-1 my-auto text-color-brown line-clamp-2'
                            : 'md:pr-6 pr-1 my-auto text-color-default line-clamp-2 '
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Sub Category */}
                <div className="col-span-2 bg-gray-50 overflow-auto">
                  <div>
                    {mainCategoryDetail.map(
                      (item, index) =>
                        item.id === selectedCategory.id && (
                          <img
                            src={
                              item.backgroundUrl
                                ? item.backgroundUrl
                                : placeholder
                            }
                            className="object-cover h-60 w-full"
                            alt="Img"
                            onError={(e) => (e.target.src = placeholder)}
                          />
                        ),
                    )}
                  </div>
                  {/* ByBrands SESSION START */}
                  {mainCategoryDetail.map(
                    (item, index) =>
                      item.id === selectedCategory.id && (
                        <div key={item.id}>
                          <div
                            className={`mx-6 ${
                              item.brand.length === 0 && 'hidden'
                            } mt-4 text-md custom-font-bold text-color-secondary`}
                          >
                            By Brands
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-7 gap-y-4 md:gap-x-3 mx-6 ">
                            {item.brand.map((_brand, index) => (
                              <div
                                onClick={() =>
                                  history.push(`bybrand/${_brand.brandId}`)
                                }
                                key={_brand.id}
                                className="my-4 cursor-pointer flex flex-col items-center "
                              >
                                <img
                                  src={_brand.url ? _brand.url : placeholder}
                                  className="w-12 h-12 rounded-md"
                                  alt="SubCatImg"
                                  onError={(e) => (e.target.src = placeholder)}
                                />
                                <p className=" w-20 text-center md:pl-0 primary-font text-color-default custom-font-bold pt-1">
                                  {_brand.brandName}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                  )}
                  {/* ByBrands SESSION END */}
                  <div className="border border-gray-200"></div>
                  {/* SUBCATEGORY SESSION START */}
                  {mainCategoryDetail.map(
                    (item, index) =>
                      item.id === selectedCategory.id && (
                        <div key={index}>
                          {item.subCategory1.map((_subOne, index) => (
                            <div
                              className="cursor-pointer"
                              key={index}
                              onClick={() => goToSearch(_subOne)}
                            >
                              <div className="mx-6 mt-4 text-md custom-font-bold text-color-secondary">
                                {_subOne.name}
                              </div>
                              <div
                                className="grid grid-cols-2 md:grid-cols-7 gap-y-4 md:gap-x-3 mx-6 "
                                key={item.id}
                              >
                                {_subOne.subCategory2.map((_subTwo, index) => (
                                  <div
                                    key={index}
                                    className="my-4 flex flex-col items-center cursor-pointer"
                                    onClick={() => goToSearch(_subTwo)}
                                  >
                                    <img
                                      src={
                                        _subTwo.url ? _subTwo.url : placeholder
                                      }
                                      className="w-12 h-12 rounded-md"
                                      alt="SubCatImg"
                                      onError={(e) =>
                                        (e.target.src = placeholder)
                                      }
                                    />
                                    <p className=" w-20 text-center md:pl-0 primary-font text-color-default text-sm custom-font-bold pt-1">
                                      {_subTwo.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ),
                  )}
                  {/* SUBCATEGORY SESSION END */}
                </div>
                {/* End Sub Category */}
              </div>
              {/* End ByCategory */}
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

export default By_category

export const goBack = (history) => {
  history.goBack()
}
