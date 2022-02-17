/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//images
import LoadingGif from '../../../assets/Authentication/Loading/auth_loading_black.gif';

const LoadMoreButton = ({
  IsLoading,
  IsLoadMore,
  /**
   * action
   */
  ClickingOnLoadMoreBtn,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex justify-center '>
        {IsLoading ? (
          IsLoadMore && (
            <>
              <img src={LoadingGif} className='w-6 h-auto' alt='Loading Gif' />
            </>
          )
        ) : (
          <button
            className='bg-custom-orange w-48 font-normal tertiary-font hover:text-color-link py-2 px-5 border rounded-full'
            onClick={ClickingOnLoadMoreBtn}
          >
            <span className='text-color-white'>{t('Common.view-more')}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default LoadMoreButton;
