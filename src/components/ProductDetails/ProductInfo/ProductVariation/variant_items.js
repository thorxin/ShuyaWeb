/** @format */

import React from 'react';

export const Badge = ({
  v_image = '',
  value_name = '',
  is_selected = false,
  clickOnBadge,
}) => {
  if (v_image) {
    const color = v_image.slice(3);
    return (
      <>
        {is_selected ? (
          <div
            className='w-full bg-custom-primary-light text-center cursor-pointer'
            onClick={clickOnBadge}
          >
            {v_image.includes('https') ? (
              <img src={v_image} className='w-full h-auto mx-auto' />
            ) : (
              <div
                className='w-26 h-16'
                style={{ backgroundColor: `#${color}` }}
              ></div>
            )}
            <div
              className='w-26 h-16 mx-auto absolute'
              style={{ backgroundColor: '#ffe8b9ff' }}
            ></div>
            <p className='tertiary-font text-color-white py-1'>{value_name}</p>
          </div>
        ) : (
          <div
            className='w-full bg-gray-100 text-center cursor-pointer'
            onClick={() => clickOnBadge()}
          >
            {v_image.includes('https') ? (
              <img src={v_image} className='w-full h-auto mx-auto' />
            ) : (
              <div
                className='w-26 h-16'
                style={{ backgroundColor: `#${color}` }}
              ></div>
            )}
            <p className='tertiary-font text-color-default py-1'>
              {value_name}
            </p>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {is_selected ? (
        <div
          className='w-full  bg-custom-primary-light text-center cursor-pointer'
          onClick={clickOnBadge}
        >
          <img src={v_image} className='w-full h-auto mx-auto' />
          <p className='tertiary-font text-color-white py-1'>{value_name}</p>
        </div>
      ) : (
        <div
          className='w-full bg-gray-100 text-center cursor-pointer'
          onClick={() => clickOnBadge()}
        >
          <img src={v_image} className='w-full h-auto mx-auto' />
          <p className='tertiary-font text-color-default py-1'>{value_name}</p>
        </div>
      )}
    </>
  );
};

const VariantItems = ({
  value = {},
  isSelected = false,
  /**
   * action
   */
  ConfirmSelectedVariant,
}) => {
  return (
    <>
      <Badge
        v_image={value.url}
        value_name={value.valueName}
        is_selected={isSelected}
        clickOnBadge={ConfirmSelectedVariant}
      />
    </>
  );
};

export default VariantItems;
