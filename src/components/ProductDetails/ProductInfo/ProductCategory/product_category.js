/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

//images
import RightArrowIcon from '../../../../assets/productDetail/right_arrow_icon.svg';

const ProductCategory = ({ CategoryArray = [] }) => {
  const { t } = useTranslation();

  if (CategoryArray.length > 0)
    return (
      <>
        <div className='bg-white pb-2 md:-mt-4 ml-4 md:ml-8'>
          <div className='flex items-center space-x-2'>
            {CategoryArray.map((category, index) => (
              <React.Fragment key={index}>
                <p className='primary-font custom-font-bold text-color-secondary'>
                  {category}
                </p>
                {CategoryArray.length - 1 !== index && (
                  <div className='w-2 flex flex-shrink-0 h-auto'>
                    /
                    {/* <img
                          src={RightArrowIcon}
                          className="w-full h-full"
                          alt="RightArrowIcons"
                        /> */}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );

  return null;
};

export default ProductCategory;
