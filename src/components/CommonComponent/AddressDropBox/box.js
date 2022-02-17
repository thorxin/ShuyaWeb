/** @format */

import React, { useRef } from 'react';

//components
import DialogBox from '../DialogBox/dialog_box';
import BoxItems from './box_items';

//images
import CrossSign from '../../../assets/common/cancel_cross_icon.svg';
import SecondaryLoading from '../../../assets/Authentication/Loading/auth_loading_black.gif';
import DownArrowIcon from '../../../assets/common/down_arrow.svg';
import SearchIcon from '../../../assets/common/search_icon.svg';

const Box = ({
  Loading,
  AddressTypeName,
  List = {},
  InitialSelectedData,
  SelectedData,
  IsNotHaveTownship = false,
  IsOpenBox = false,
  /**
   * action
   */
  OpenBox,
  CloseBox,
  SearchingValue,
  ClickingBoxItem,
}) => {
  const cancelButton = useRef(null);

  console.log('selected Data', SelectedData);

  if (!IsNotHaveTownship)
    return (
      <div>
        <div>
          <div className='border w-full h-auto rounded-sm bg-white shadow-lg py-2 px-4 cursor-pointer'>
            {Loading ? (
              <div className='py-1'>
                <img
                  src={SecondaryLoading}
                  className='w-6 h-auto mx-auto'
                  alt='Secondary Loading'
                />
              </div>
            ) : (
              <button className='w-full h-auto' onClick={OpenBox}>
                <div className='flex justify-between items-center'>
                  <div></div>
                  <p className='primary-font truncate py-1'>
                    {SelectedData
                      ? SelectedData?.name
                      : InitialSelectedData?.name}
                  </p>
                  <div>
                    <img
                      src={DownArrowIcon}
                      className='w-4 h-auto'
                      alt='DownArrowIcon'
                    />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
        {/* Start Dialog Box */}
        <DialogBox
          isOpen={IsOpenBox}
          closeModal={CloseBox}
          focusElement={cancelButton}
        >
          <div className='flex justify-center'>
            <div className='w-10/12 max-w-sm h-auto p-4 space-y-6 border shadow-xl rounded-md bg-white backdrop-filter backdrop-blur-0'>
              {/* Box Title */}
              <div className='flex justify-end items-center'>
                {/* <p className="sub-heading-font"> {AddressTypeName} </p> */}
                <button ref={cancelButton} className='focus:outline-none'>
                  <img
                    src={CrossSign}
                    className='w-3 h-auto cursor-pointer'
                    alt='Cross Sign'
                    onClick={CloseBox}
                  />
                </button>
              </div>
              {/* End Box Title */}

              <div className='w-full h-auto relative'>
                <input
                  type='text'
                  className='w-full h-auto shadow-md primary-font border border-gray-50 rounded-sm pl-10 pr-3 py-2 focus:outline-none focus:ring'
                  placeholder={`${AddressTypeName}`}
                  onChange={(e) => SearchingValue(e)}
                />
                <img
                  src={SearchIcon}
                  className='w-5 h-auto absolute top-3 left-3'
                  alt='Search Icon'
                />
              </div>

              <div className='w-auto h-64 overflow-y-auto space-y-1'>
                {Array.isArray(List) &&
                  List.length > 0 &&
                  List.map((data, index) => (
                    <BoxItems
                      key={index}
                      data_object={data}
                      selected_data={SelectedData}
                      clickBoxItems={ClickingBoxItem}
                    />
                  ))}
              </div>
            </div>
          </div>
        </DialogBox>
        {/* End Dialog Box */}
      </div>
    );

  return null;
};

export default Box;
