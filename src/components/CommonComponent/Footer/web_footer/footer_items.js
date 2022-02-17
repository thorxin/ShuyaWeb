/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  FONT_UNICODE,
  FONT_ENGLISH_US,
  FONT_ZAW_GYI,
} from '../../../../constant/languageConfig';

//images
import Facebook from '../../../../assets/home/facebook.png';
import Instagram from '../../../../assets/home/instagram.png';
import Twitter from '../../../../assets/home/twitter.png';
import { getLocalStorage, LANGUAGE_TYPE } from '../../../../util/storage';

const default_style = ' space-y-4';
const title_text_style = 'primary-lg-font custom-font-bold';
const label_text_style = 'tertiary-font space-y-2 mr-4';
const label_language_style = 'tertiary-font space-y-2 mr-4 cursor-pointer';
const label_text_active_style =
  'tertiary-font space-y-2 -ml-2 w-16 rounded-full border-0 px-2 py-1 text-center';

const FooterItems = (props) => {
  const unicode = FONT_UNICODE;
  const english = FONT_ENGLISH_US;

  const { i18n } = useTranslation();
  const lang = getLocalStorage(LANGUAGE_TYPE);

  const changeLanguage = (lang_value) => {
    i18n.changeLanguage(lang_value);
  };

  return (
    <>
      <div className={default_style}>
        <p className={title_text_style}> Customer Service </p>
        <div className={label_text_style}>
          <div className=' cursor-pointer '>
            <Link to='/footer/termsandcondition'>Terms and Privacy Policy</Link>
          </div>
          {/* <div className=" cursor-pointer">
            <Link to="/footer/policy">Return Policy</Link>
          </div> */}
        </div>
      </div>
      <div className={default_style}>
        <p className={title_text_style}> Language </p>
        <div className='cursor-pointer'>
          <Link
            to='/chooselanguage'
            onClick={() => changeLanguage('unicode')}
            className={`${
              lang === FONT_UNICODE ? label_text_active_style : label_text_style
            }`}
          >
            Myanmar(Unicode)
          </Link>
        </div>
        <div className='cursor-pointer'>
          <Link
            to='/chooselanguage'
            onClick={() => changeLanguage('zawgyi')}
            className={`${
              lang === FONT_ZAW_GYI ? label_text_active_style : label_text_style
            }`}
          >
            Myanmar(Zawgyi)
          </Link>
        </div>
        <div className='cursor-pointer'>
          <Link
            to='/chooselanguage'
            onClick={() => changeLanguage('en-US')}
            className={`${
              lang !== FONT_UNICODE && lang !== FONT_ZAW_GYI
                ? label_text_active_style
                : label_text_style
            }`}
          >
            English
          </Link>
        </div>
      </div>
      <div className={default_style}>
        <p className={title_text_style}> Contact Us </p>
        <div className={label_text_style}>
          <div>
            <p>
              {' '}
              I-15, Pan Hlaing Road, Sabel Street, <br></br>Pan Hlaing Housing,
              Sanchaung Tsp.<br></br>
              09-777001947 / 09-777001946
            </p>
          </div>
        </div>
      </div>
      {/* <div className="invisible">
        <p className={title_text_style}> Follow Us </p>
        <div className="flex space-x-4">
            <img src={Facebook} className="w-5 h-auto" alt="SocialMediaLogo" />
            <img src={Instagram} className="w-5 h-auto" alt="SocialMediaLogo" />
            <img src={Twitter} className="w-5 h-auto" alt="SocialMediaLogo" />
        </div>
      </div> */}
    </>
  );
};

export default FooterItems;
