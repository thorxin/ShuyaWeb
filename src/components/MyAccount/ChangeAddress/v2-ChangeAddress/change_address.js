/** @format */

import React, { useState } from 'react';
// lib
import { useTranslation } from 'react-i18next';
import FooterWeb from '../../../CommonComponent/Footer/web_footer';
import FooterMobile from '../../../CommonComponent/Footer/mobile_footer';
import NavigationWeb from '../../../CommonComponent/Navigation/NavigationWeb';

//images
import LeftArrowImage from '../../../../assets/productSearch/left_arrow_image.png';
import DeleteIcon from '../../../../assets/Images/delete.svg';

// hook
import { Hook } from './hook';
import { DEFAULT_TOWNSHIP } from '../../../../constant/defaultTownship';
import AuthenticationLoading from '../../../CommonComponent/Loading/auth_loading';
import Loading from '../../../CommonComponent/Loading/main_loading';
import AddNewAddress from '../../../../containers/MyAccount/container.addnewaddress';
import {
  HOME_LABEL,
  OTHER_LABEL,
  WORK_LABEL,
} from '../../../../constant/deliveryLabelConfig';
import { LabelIcon } from './label_icon';
import DefaultChangeAddressContainer from '../../../WrapperComponents/default_change_address_container';
import ConfirmationBox from '../../../CommonComponent/DialogBox/confirmation_box';

export default function ChangeAddress(props) {
  const [
    selectedVal,
    setSelectedVal,
    originVal,
    /**
     * action
     */
    goBack,
    changedSelectedDeliveryAddress,
    fetchDeleteDeliveryAddress,
  ] = Hook(props);
  const { t } = useTranslation();
  const {
    deliveryAddress = [],
    isTeritaryLoading = false,
    isSecondaryLoading = false,
  } = props;
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const checkEditSaveDisabled = parseInt(originVal) === parseInt(selectedVal);
  const [labelFilter, setLabelFilter] = useState(HOME_LABEL);

  //   const [isShowDeleteBox, setIsShowDeleteBox] = useState(false);

  //   const clickingClear = () => {
  //     setIsShowDeleteBox(true);
  //   };

  const deleteDeliveryAddress = (question_id = 0, labelName) => {
    if (question_id <= 0 || labelName === 'Home') return;
    let postData = {
      DeliveryAddressId: question_id,
    };
    fetchDeleteDeliveryAddress(postData.DeliveryAddressId);
  };

  if (isTeritaryLoading) return <Loading />;

  return (
    <DefaultChangeAddressContainer
      openAddAddress={openAddAddress}
      setOpenAddAddress={setOpenAddAddress}
    >
      <div>
        <p className='sub-heading-font text-center'>
          {openAddAddress ? 'Add New Address' : 'Select Address'}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-y-4 bg-white py-4 px-4'>
        {!openAddAddress ? (
          <>
            <div className='flex flex-col gap-y-7 pt-4'>
              {deliveryAddress.map((data) => (
                <label
                  key={data.id}
                  htmlFor={data.id}
                  className='flex cursor-pointer justify-between'
                >
                  <div className='flex gap-2.5'>
                    {/* Icon  */}
                    <LabelIcon labelName={data.labelName} />
                    <div className='flex flex-col'>
                      <p className='uppercase h-auto tertiary-font font-semibold text-color-default'>
                        {data.labelName}
                      </p>
                      <p className='text-base font-semibold break-words'>
                        {data.address},
                        {data.townshipName !== DEFAULT_TOWNSHIP && (
                          <span>{data.townshipName},</span>
                        )}{' '}
                        {data.cityName}
                      </p>
                      {data.landmark && (
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
                          <span className='font-semibold text-color-secondary text-sm'>
                            {data.landmark}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex'>
                    <input
                      className='w-3.5 h-3.5 md:mr-8 mr-4 mt-1'
                      checked={data.id === parseInt(selectedVal)}
                      value={data.id}
                      onChange={(e) => setSelectedVal(e.target.value)}
                      type='radio'
                      name='deliveryAddress'
                      id={data.id}
                    />
                    <div
                      className='w-3.5 h-3.5 ml-2 mt-0.5'
                      onClick={() =>
                        deleteDeliveryAddress(data.id, data.labelName)
                      }
                    >
                      <img src={DeleteIcon} className='w-full h-auto' />
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <span className='text-color-secondary font-semibold pt-7 text-sm'>
              or
            </span>
            <button
              onClick={() => setOpenAddAddress(true)}
              className=' text-color-link text-sm items-center flex font-bold mt-2 gap-2'
            >
              {/* Add Svg  */}
              <svg
                className='text-color-link'
                xmlns='http://www.w3.org/2000/svg'
                height='17px'
                viewBox='0 0 24 24'
                width='17px'
                fill='currentColor'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
              </svg>
              Add New Address
            </button>
            <div className='w-8/12 ml-auto pt-7 pb-4'>
              <div className='grid grid-cols-2 gap-x-2'>
                <div>
                  <button
                    className='secondary-btn tertiary-font py-2'
                    onClick={goBack}
                  >
                    {t('Common.not-do')}
                  </button>
                </div>
                <div>
                  <button
                    disabled={checkEditSaveDisabled}
                    className={`primary-btn tertiary-font py-2 ${
                      checkEditSaveDisabled && 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={changedSelectedDeliveryAddress}
                  >
                    {isSecondaryLoading ? (
                      <AuthenticationLoading />
                    ) : (
                      <p>Save</p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex gap-x-2.5 pt-4'>
              <button
                onClick={() => setLabelFilter(HOME_LABEL)}
                className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                  labelFilter === HOME_LABEL
                    ? 'bg-custom-orange text-color-white '
                    : 'bg-gray-200'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setLabelFilter(WORK_LABEL)}
                className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                  labelFilter === WORK_LABEL
                    ? 'bg-custom-orange text-color-white '
                    : 'bg-gray-200'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setLabelFilter(OTHER_LABEL)}
                className={`py-1.5 px-3 rounded-full uppercase text-sm font-semibold ${
                  labelFilter === OTHER_LABEL
                    ? 'bg-custom-orange text-color-white '
                    : 'bg-gray-200'
                }`}
              >
                Other
              </button>
            </div>
            <AddNewAddress
              setLabelFilter={setLabelFilter}
              labelFilter={labelFilter}
              setOpenAddAddress={setOpenAddAddress}
            />
          </>
        )}
      </div>
    </DefaultChangeAddressContainer>
  );
}
