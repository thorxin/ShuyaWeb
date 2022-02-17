/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
//components
import { DEFAULT_TOWNSHIP } from '../../constant/defaultTownship';

//images
import LocationPinIcon from '../../assets/common/location_pin_icon.svg';
import EditPen from '../../assets/shoppingcart/edit_pen_icon.svg';
import { DELIVERY_ADDRESS_CHANGE } from '../../constant/locationPathName';
import { LabelIcon } from '../DeliveryAddressChange/label_icon';

const DeliverAddressAndPhoneNumber = ({ DeliveryInfo = {} }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const goPage = (page) => {
    history.push(page);
  };
  return (
    <>
      <div className='space-y-4 md:mx-6 mx-4'>
        <div className='flex items-center justify-between'>
          <p className='text-lg custom-font-bold text-color-default'>
            Delivery Address
          </p>
          <p
            onClick={() => goPage(DELIVERY_ADDRESS_CHANGE)}
            className='caption-font text-color-link font-semibold text-md cursor-pointer'
          >
            Edit
          </p>
        </div>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-auto'>
              <img
                src={LocationPinIcon}
                className='w-full h-full'
                alt='LocationPin'
              />
            </div>
            <p className='tertiary-font text-color-secondary'>
              {t('ShoppingCart.your-address')}
            </p>
          </div>
          {/* <div className="flex">
            <LabelIcon labelName="" />
          </div> */}
          <p className='primary-font text-color-default'>
            {DeliveryInfo.address},
            {DeliveryInfo.townshipName !== DEFAULT_TOWNSHIP && (
              <span>{DeliveryInfo.townshipName},</span>
            )}{' '}
            {DeliveryInfo.cityName}
          </p>
          {DeliveryInfo.landmark && (
            <div className='flex items-center gap-1.5'>
              <svg
                height='14px'
                width='14px'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='gray'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z' />
              </svg>
              <span className='font-semibold text-color-secondary text-base'>
                {DeliveryInfo.landmark}
              </span>
            </div>
          )}
          <div>
            <p className='primary-font text-color-default'>
              {DeliveryInfo.phoNo}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliverAddressAndPhoneNumber;
