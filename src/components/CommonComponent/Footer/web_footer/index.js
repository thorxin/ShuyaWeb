/** @format */

import React from 'react';

//component
import FooterItems from './footer_items';

const FooterWeb = () => {
  return (
    <>
      <div className='hidden md:block'>
        <div className='w-full h-auto bg-custom-main py-7'>
          <div className='mx-auto'>
            <div className='default-margin-layout'>
              <div className=' h-auto mx-auto'>
                <div className='flex justify-between'>
                  <FooterItems />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white py-2'>
          <p className='tertiary-font text-center'>
            All rights reserved. Made with all the love in ShopDoora Co., Ltd.
          </p>
        </div>
      </div>
    </>
  );
};

export default FooterWeb;
