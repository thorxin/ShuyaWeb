/** @format */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

//components
import PlaceHolderImage from '../../CommonComponent/placeholder_image';
import { BY_CATEGORY } from '../../../constant/locationPathName';
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName';

const CategoryCard2 = ({ categoryData = {} }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goToByCategory = () => {
    let propsData = {
      id: categoryData.id,
      name: categoryData.name,
    };
    goToSpecificPathNameWithData(history, BY_CATEGORY, propsData);
  };

  return (
    <div
      className='cursor-pointer relative flex flex-shrink-0 mb-1 group'
      onClick={() => goToByCategory()}
    >
      {/* Toggle Fav Btn */}

      <div className='w-44 md:w-full mx-auto h-auto relative'>
        <div className='relative'>
          <div className='overflow-hidden rounded-t-md'>
            {categoryData.url ? (
              <img
                src={categoryData.url}
                className='object-cover object-right h-24 md:h-34 lg:h-40 md:rounded-none rounded-xl transform group-hover:scale-110 duration-150'
                alt='Product'
              />
            ) : (
              <div className='w-full h-auto md:h-auto rounded-xl'>
                <div className='transform group-hover:scale-110 duration-150'>
                  <PlaceHolderImage />
                </div>
              </div>
            )}
          </div>
          <div className='absolute bottom-2 w-full text-center text-md text-color-white font-semibold'>
            {categoryData.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard2;
