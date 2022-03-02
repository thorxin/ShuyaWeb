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
import CategoryCardMobile from './CategoryCardMobile'
import ProductCardHeading from "./productCardHeading";


const MainCategories = ({ categoryArray = [] }) => {
  const { t } = useTranslation();
  const history = useHistory();

  console.log(categoryArray)

  const goToByCategory = () => {
    let propsData = {
      id: categoryArray[0].id,
      name: categoryArray[0].name,
    };
    goToSpecificPathNameWithData(history, BY_CATEGORY, propsData);
  };

  return (
    <>
       <ProductCardHeading
        Heading={t("Home.brand")}
        ViewAll={t("Common.view-more")}
        /**
         * action
         */
        onClickViewMore={goToByCategory}
        productLength={categoryArray}
      />
      {/* Seven product for web view */}
      <div className='hidden md:block'>
      {categoryArray.length < 14 ? (
        <div className='rounded-xl pt-4'>
          <div className=' mx-auto'>
            <div className='grid grid-rows-1 grid-flow-col grid-cols-7 space-x-2'>
              <div className='grid grid-cols-7 col-span-7 space-x-2'>
                {Array.isArray(categoryArray) &&
                  categoryArray
                    .slice(0, 14)
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
        <div className='rounded-xl pt-4'>
          <div className=' mx-auto'>
            <div className='grid grid-rows-1 grid-flow-col grid-cols-7 space-x-2'>
              <div className='grid grid-cols-7 col-span-7 space-x-2'>
                {Array.isArray(categoryArray) &&
                  categoryArray
                    .slice(0, 14)
                    .map((products) => (
                      <CategoryCard
                        key={products.productId}
                        productData={products}
                      />
                    ))}
                {categoryArray.length >= 14 && (
                  <div
                  className="cursor-pointer w-24 md:w-auto group"
                >
                  <div className="w-full mx-auto h-auto ">
                    <div className=" py-4 pl-2 bg-name-price -mt-2">
                      <p className="flex justify-center items-center text-md font-bold w-full h-12 text-color-primary custom-font-bold group-hover:text-color-secondary">
                        ViewAll
                      </p>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      {/* For Mobile */}
      <div className='block md:hidden'>
      <div className="pb-2 md:pb-0">
       <div className=" pb-4 md:py-4 md:mt-1">
        <div className="w-full h-auto mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-x-2 md:mx-auto mx-2">
            {Array.isArray(categoryArray) &&
              categoryArray.slice(0,8).map((products) => (
                <CategoryCardMobile key={products.productId} productData={products} />
              ))}
          </div>
        </div>
      </div>
      {/* <div className="mx-2 -mt-5 py-2 bg-gray-100 rounded-full text-center flex justify-center block md:hidden">
       <p className="primary-font text-color-primary ml-2 my-auto">{t("Common.view-more")}</p>
        </div> */}
      </div>
      </div>
    </>
  );
};

export default MainCategories;
