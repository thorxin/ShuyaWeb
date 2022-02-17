/** @format */

import React from 'react';

const ProductCardHeading = ({
  Heading = '',
  ViewAll = '',
  /**
   * action
   */
  onClickViewMore,
  productLength,
}) => {
  return (
    <div className='bg-white py-4 md:py-3 mx-2 md:mx-0 block md:hidden'>
      <div className='text-center'>
        {productLength.length > 0 && (
          <p className='sub-heading-font custom-font-header text-color-default h-auto'>
            {Heading}
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductCardHeading;
