/** @format */

import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UiLoading from '../../CommonComponent/Loading/auth_loading';

//component
import ListItem from './list_Item';

const NotiList = ({
  Loading,
  notificationArray,
  IsLoadMore = false,
  IsNoMoreData,
  /**
   * action
   */
  setPageNumber,
  clickingOnNotification,
  isScrollLoading,
  pageNumber,
}) => {
  const { t } = useTranslation();
  const observer = useRef();
  let lastNotiElementRef = useCallback(
    (node) => {
      if (isScrollLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !IsNoMoreData) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isScrollLoading, IsNoMoreData]
  );
  return (
    <>
      {notificationArray.map((notification, index) => (
        <div
          ref={lastNotiElementRef}
          key={index}
          className={`${
            !notification.isSeen && 'bg-gray-300'
          } py-2 md:py-3 hover:bg-gray-100 cursor-pointer`}
        >
          <div className='mx-4'>
            <ListItem
              noti={notification}
              key={index}
              /**
               * action
               */
              clickingOnNotification={() =>
                clickingOnNotification(notification)
              }
            />
          </div>
        </div>
      ))}
      <div className='py-5'>
        {IsNoMoreData ? (
          <p className='tertiary-font text-color-default text-center'>
            {t('Notification.no_more_notification')}
          </p>
        ) : (
          <>
            {isScrollLoading && (
              <div className='flex flex-col h-full w-full items-center justify-center'>
                <UiLoading />
                <p className='secondary-font text-color-default'>
                  Loading ....
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NotiList;
