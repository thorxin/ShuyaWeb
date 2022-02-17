/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { BY_CATEGORY } from '../../../constant/locationPathName';
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName';

//images
import ViewMore from '../../../assets/home/view_more_icon.svg';

//component
import CategoryCard from './CategoryCard';
import ProductCardHeading from './productCardHeading';

const MainCategories = ({ categoryArray = [] }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const goToByCategory = () => {
    let propsData = {
      id: categoryArray[0].id,
      name: categoryArray[0].name,
    };
    goToSpecificPathNameWithData(history, BY_CATEGORY, propsData);
  };

  return (
    <>
      {/* <ProductCardHeading
        Heading={t("Home.categories")}
        ViewAll={t("Common.view-more")}
        
         * action
        
        onClickViewMore={goToByCategory}
        productLength={categoryArray}
      /> */}
      {/* Six product for web view */}
      {categoryArray.length < 5 ? (
        <div className='hidden md:block rounded-xl pt-4'>
          <div className=' mx-auto'>
            <div className='grid grid-rows-1 grid-flow-col grid-cols-5 space-x-2'>
              <div className='grid grid-cols-5 col-span-5 space-x-2'>
                {Array.isArray(categoryArray) &&
                  categoryArray
                    .slice(0, 5)
                    .map((products) => (
                      <CategoryCard
                        key={products.productId}
                        productData={products}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='hidden md:block rounded-xl pt-4'>
          <div className=' mx-auto'>
            <div className='grid grid-rows-1 grid-flow-col grid-cols-5 space-x-2'>
              <div className='grid grid-cols-5 col-span-5 space-x-2'>
                {Array.isArray(categoryArray) &&
                  categoryArray
                    .slice(0, 5)
                    .map((products) => (
                      <CategoryCard
                        key={products.productId}
                        productData={products}
                      />
                    ))}
              </div>
              {/* {categoryArray.length >= 5 && (
                <div className="w-full mx-auto h-auto cursor-pointer col-span-1" onClick={goToByCategory}>
              <div className="flex justify-center">
                <img src={ViewMore} className="w-10 h-10 rounded-full" alt="Product" />
              </div> */}
              {/* <PlaceHolderImage /> */}
              {/* <div className=" py-4 pl-2 bg-name-price h-20 -mt-2" >
                <p className="tertiary-font  text-color-secondary  text-center break-words">
                  View All
                </p>
              </div> */}
              {/* </div>
              )} */}
            </div>
          </div>
        </div>
      )}
      {/* For mobile */}
      <div className='block md:hidden rounded-xl'>
        <div className='mx-auto'>
          <div className='overflow-x-auto hide-scroll-bar'>
            <div className='inline-flex -space-x-4'>
              {Array.isArray(categoryArray) &&
                categoryArray.map((products) => (
                  <CategoryCard
                    key={products.productId}
                    productData={products}
                  />
                ))}
            </div>
            {/* {categoryArray.length >=7 && 
          <div className="w-full mx-auto h-auto cursor-pointer col-span-1" onClick={goToByCategory}>
              <div className="flex justify-center">
                <img src={ViewMore} className="w-12 h-12" alt="Product" />
              </div>
              </div>
            } */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCategories;
