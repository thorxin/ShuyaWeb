/** @format */

import React from 'react';
import { useHistory } from 'react-router';

//images
import LeftArrowImage from '../../../assets/productSearch/left_arrow_image.png';

//components
import { Hook } from './hook';
import Loading from '../../CommonComponent/Loading/main_loading';
import NavigationWeb from '../../CommonComponent/Navigation/NavigationWeb';
import { SubHeadingWithBackArrow } from '../../CommonComponent/SubHeading/sub_heading_with_back_arrow';
import { BankList } from './bank_list';

import DefaultContainerNoFooter from '../../WrapperComponents/default_container_no_footer';
import { RegisterBankInfo } from './RegisterBankInfo/register_bank_info';
import { MakePurchaseConfirmBox } from './confirm_purchase_box';
import { SuccessOrderBox } from '../CommonUI/success_order_box';
import { goBack } from '../../../util/goToSpecificPathName';
import FooterWeb from '../../CommonComponent/Footer/web_footer';

export default function PayWithBank(props) {
  const [
    isLoading,
    isSecondaryLoading,
    bankList,
    selectedBank,
    uploadedImage,
    imageUploader,
    totalAmt,
    netAmt_Again,
    selectedDeliveryInfo,
    isImage,
    validateMessage,
    confirmMessageBox,
    setConfirmMessageBox,
    successOrderMessageBox,
    setSuccessOrderMessageBox,
    orderId,
    productInfo,
    /**
     * action
     */
    clickingBank,
    handleImageUpload,
    makePurchase,
    confirmMakePurchase,
  ] = Hook(props);

  const history = useHistory();

  if (isLoading) return <Loading />;

  return (
    <>
      <div className='bg-gray-200 w-full h-auto min-h-screen md:space-y-4'>
        <NavigationWeb />
        <div className='mx-auto md:space-y-4'>
          <SubHeadingWithBackArrow goTo={() => goBack(history)}>
            <p className='sub-heading-font text-color-default'>Pay With Bank</p>
          </SubHeadingWithBackArrow>
          <div className='default-margin-layout hidden md:block'>
            <div
              className='flex items-center space-x-3 cursor-pointer'
              onClick={() => goBack(history)}
            >
              <div className='w-4 h-auto'>
                <img
                  src={LeftArrowImage}
                  className='w-full h-full'
                  alt='Left Arrow'
                />
              </div>
              <p className='primary-font text-color-default'> Back </p>
            </div>
          </div>
          <div className='default-margin-layout'>
            <div className='hidden md:block bg-white py-4'>
              <div className='mx-4 md:mx-8'>
                <p className='sub-heading-font text-color-default '>
                  Pay With Bank
                </p>
                {/* <p className='sub-heading-font text-color-default '>
                  {productInfo.map(product=><p>{product.price}</p>)}
                </p> */}
              </div>
            </div>
            <div className='bg-white w-full h-auto min-h-screen py-4 mt-1'>
              <div className='mx-4 md:mx-8 space-y-6'>
                <BankList
                  BankListArray={bankList}
                  IsLoading={isSecondaryLoading}
                  SelectedBank={selectedBank}
                  /**
                   * action
                   */
                  onClickBank={clickingBank}
                />
                <RegisterBankInfo
                  BankListArray={bankList}
                  IsLoading={isSecondaryLoading}
                  SelectedBank={selectedBank}
                  UploadedImage={uploadedImage}
                  ImageUploader={imageUploader}
                  TotalAmount={totalAmt}
                  NetAmount={netAmt_Again}
                  deliveryFee={selectedDeliveryInfo.deliveryFee}
                  ValidateImageMessage={validateMessage}
                  IsImage={isImage}
                  /**
                   * action
                   */
                  HandleImageUpload={handleImageUpload}
                  onSubmit={makePurchase}
                />
              </div>
            </div>
          </div>
        </div>
        <FooterWeb />
      </div>
      <MakePurchaseConfirmBox
        IsOpen={confirmMessageBox}
        closeBox={() => setConfirmMessageBox(false)}
        /**
         * action
         */
        confirmPurchase={confirmMakePurchase}
      />
      <SuccessOrderBox
        isOpenBox={successOrderMessageBox}
        setIsOpenBox={setSuccessOrderMessageBox}
        OrderId={orderId}
        /**
         * action
         */
        closeBox={() => setSuccessOrderMessageBox(false)}
      />
    </>
  );
}
