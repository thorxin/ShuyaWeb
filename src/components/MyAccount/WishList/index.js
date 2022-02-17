import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

//images
import leftArrow from '../../../assets/productSearch/left_arrow_image.png'
import LeftArrowImage from '../../../assets/productSearch/left_arrow_image.png'

// components
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb'
import Loading from '../../CommonComponent/Loading/main_loading'
import FooterWeb from '../../CommonComponent/Footer/web_footer'
import FooterMobile from '../../CommonComponent/Footer/mobile_footer'
import ConfirmationBox from '../../CommonComponent/DialogBox/confirmation_box'
import SuccessBox from '../../CommonComponent/DialogBox/success_box'
import List from './List/index'
import { Hook } from './hook'

const Index = (props) => {
  const [
    isLoading,
    errorMessage,
    WishListProduct = [],
    isShowDeleteBox,
    setIsShowDeleteBox,

    // action
    deleteWishList,
    goBack,
    confirmDeleteAll,
    clickingClear,
  ] = Hook(props)

  const history = useHistory()
  const { t } = useTranslation()

  const sortedActivities = WishListProduct.slice().sort(
    (a, b) => b.date - a.date,
  )

  if (isLoading) return <Loading />

  return (
    <>
      <div className="md:bg-gray-200 w-full h-auto md:space-y-5">
        <NavigationWeb />
        <div className=" mx-auto space-y-5 mb-20 md:mb-0">
          <div className="default-margin-layout h-auto mx-auto">
            <div className="md:mb-4 mb-2">
              <div
                className="flex items-center space-x-3 cursor-pointer mt-4 ml-4 md:ml-auto"
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
            <div className="bg-white pb-5 min-h-screen">
              <div className="flex justify-between items-center mx-4 md:mx-8 py-3">
                <p className="truncate h-auto sub-heading-font text-color-default">
                  WishList ({WishListProduct.length})
                </p>
                {WishListProduct.length > 0 && (
                  <p
                    className="float-right text-color-secondary primary-font cursor-pointer"
                    onClick={clickingClear}
                  >
                    {t('Common.clear-all')}
                  </p>
                )}
              </div>
              <div className="md:h-auto">
                {Array.isArray(WishListProduct) &&
                  WishListProduct.length > 0 &&
                  sortedActivities.map((product, index) => (
                    <List
                      key={index}
                      Product={product}
                      RemoveWishList={deleteWishList}
                    />
                  ))}
              </div>
              {WishListProduct.length > 0 ? (
                <p></p>
              ) : (
                <div className="flex h-screen">
                  <div className="m-auto">
                    <p>{t('WishList.no_data')}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-200 h-4"></div>
          </div>
        </div>
      </div>
      <FooterWeb />
      <FooterMobile />
      <ConfirmationBox
        isOpenBox={isShowDeleteBox}
        ConfirmationMessage={t('WishList.are-you-sure-to-clear-all')}
        /**
         * action
         */
        cancelBox={() => setIsShowDeleteBox(false)}
        confirmBox={confirmDeleteAll}
      />
    </>
  )
}

export default Index
