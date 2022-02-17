/** @format */

import React from 'react';

/**
 * components
 */
import CategoryCard2 from './CategoryCard2';

const HomeCategory = ({ categoryArray = [] }) => {
  if (categoryArray.length > 0)
    return (
      <>
        <div className='bg-white py-4 md:py-3  my-4 mx-2 md:mx-0 block'>
          <div className='text-center'>
            <p className='sub-heading-font text-color-brown h-auto'>Category</p>
          </div>
        </div>
        <div className='pb-2'>
          <div className='pb-2 px-2 md:px-0'>
            <div className=' overflow-x-auto pb-2 md:pb-0 hide-scroll-bar'>
              <div className=' ml-20 md:inline-flex grid grid-cols-4 md:space-x-4 md:space-x-0 md:gap-x-4 gap-x-2 gap-y-4'>
                {Array.isArray(categoryArray) &&
                  categoryArray
                    .slice(0, 6)
                    .map((cat) => (
                      <CategoryCard2 key={cat.productId} categoryData={cat} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return null;
};
export default HomeCategory;
