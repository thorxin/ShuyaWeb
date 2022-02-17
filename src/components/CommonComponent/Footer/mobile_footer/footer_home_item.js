/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../../../constant/locationPathName';
import {
  GET_STORED_ACCESS_TOKEN,
  saveLastRoute,
} from '../../../../util/storage';

const FooterItem = ({
  ROUTE = '',
  item_icon,
  item_icon_active,
  IS_ROUTE = false,
  item_name = '',
  count = 0,
}) => {
  const clickOnRoute = (routeName) => {
    if (GET_STORED_ACCESS_TOKEN) return;
    saveLastRoute(routeName);
  };

  return (
    <>
      <Link
        to={GET_STORED_ACCESS_TOKEN ? ROUTE : LOGIN}
        onClick={() => clickOnRoute(ROUTE)}
      >
        <div className='space-y-2 relative h-10'>
          <img
            src={IS_ROUTE ? item_icon_active : item_icon}
            className={`${IS_ROUTE ? 'w-6 h-6' : 'w-5 h-5'} mx-auto`}
            alt='FooterLogo'
          />
          {/* <p
            className={`caption-font text-center ${
              IS_ROUTE ? 'text-color-primary' : 'text-color-secondary'
            } `}
          >
            {item_name}
          </p> */}
          {count > 0 && (
            <div>
              <div className='rounded-full w-4 h-4 flex items-center justify-center absolute -top-2 left-7 bg-notification-count-color'>
                <p className='text-tiny text-color-white'>{count}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default FooterItem;
