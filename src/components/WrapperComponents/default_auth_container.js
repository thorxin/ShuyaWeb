/** @format */

import React from 'react';
import { useHistory } from 'react-router';

//components
import { goBack } from '../../util/goToSpecificPathName';

//images
import Logo from '../../assets/home/logo.png';
import AppLogo from '../../assets/home/app_logo.png';
import BackArrowIcon from '../../assets/common/back_arrow.svg';

export default function DefaultContainer({ children }) {
  const history = useHistory();
  return (
    <section>
      <div className='w-full h-screen'>
        <div className='flex flex-wrap content-center w-full h-screen'>
          <div className='default-margin-layout max-w-screen-sm auth-backdrop-filter py-6 md:py-0'>
            <div className='md:py-10'>
              <div className='w-11/12 h-auto md:w-8/12 mx-auto space-y-8'>
                <div
                  onClick={() => goBack(history)}
                  className='p-4 cursor-pointer absolute top-5 md:top-0 left-0'
                >
                  <img
                    src={BackArrowIcon}
                    className='w-3 h-auto'
                    alt='Back Arrow'
                  />
                </div>
                <div className='flex justify-center'>
                  <div>
                    <img src={Logo} className='w-28 h-auto' alt='Logo' />
                  </div>
                  {/* <div>
                    <img
                      src={AppLogo}
                      className="w-28 md:w-32 h-auto"
                      alt="AppLogo"
                    />
                  </div> */}
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
