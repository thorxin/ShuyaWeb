/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
//components
import NotiList from './NotiList'
import FooterMobile from '../CommonComponent/Footer/mobile_footer'
import Loading from '../CommonComponent/Loading/main_loading'
import { Hook } from './hook'

export default function Notification(props) {
  const [
    isLoading,
    NotificationList,
    noMoreData,
    isLoadMore,
    isNoMoreData,
    /**
     * action
     */
    LoadMoreNotiList,
    clickOnNotification,
    pageNumber,
    isScrollLoading,
    setPageNumber,
  ] = Hook(props)

  const { t } = useTranslation()

  if (isLoading) return <Loading />

  return (
    <>
      <div className="bg-white md:border md:rounded-md overflow-hidden h-screen pb-16 md:pb-0 md:h-auto mx-auto">
        <div className="shadow-sm md:shadow-none py-3 flex default-margin-layout md:w-auto">
          <div className="mx-4">
            <p className="text-xl md:text-md cursor-default custom-font-regular text-color-primary font-semibold ">
              {' '}
              {t('Notification.notification')}{' '}
            </p>
          </div>
        </div>
        <div className="h-full overflow-y-auto md:w-custom-noti-width-web md:h-custom-noti-height-web custom-scroll">
          {NotificationList.length > 0 ? (
            <div className="mb-16 md:mb-0">
              <NotiList
                Loading={isLoading}
                notificationArray={NotificationList}
                IsLoadMore={isLoadMore}
                IsNoMoreData={isNoMoreData}
                /**
                 * action
                 */
                setPageNumber={setPageNumber}
                clickingOnNotification={clickOnNotification}
                isScrollLoading={isScrollLoading}
                pageNumber={pageNumber}
              />
            </div>
          ) : isScrollLoading ? (
            <div className="flex flex-col bg-black h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            <p className="text-color-white tertiary-font text-center mt-10">
              {t('Notification.no_data')}
            </p>
          )}
        </div>
      </div>
      <FooterMobile />
    </>
  )
}
