/** @format */

import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

//components
import { composePaymentInfo, composePostOrderData } from '../util';

export function Hook({
  isLoading,
  isSecondaryLoading,
  bankList,
  orderId,
  /**
   * action
   */
  fetchBankList,
  postOrder,
  postPaymentAgain,
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const propsState = location.state;
  const cartInfo = propsState?.cart_info;
  const paymentServiceId = propsState?.payment_service_id;
  const productInfo = propsState?.available_product;
  // const productInfoPostOrder = [
  //   {"productId": productInfo.productId, "skuId": productInfo.skuId,"price": productInfo.price, "qty": productInfo.qty}
  // ]
  const deliveryFee = cartInfo?.deliveryFee  === 0 ? cartInfo?.deliveryInfo?.mainDeliveryService[0].deliveryFee : cartInfo?.deliveryFee
  const netAmt = propsState?.total_amount + deliveryFee;
  const netAmt_Again = propsState?.total_amount;
  const mainDeliveryService = cartInfo?.deliveryInfo.mainDeliveryService;
  const selectedDeliveryInfo = {
    id: mainDeliveryService?.length > 0 ? mainDeliveryService[0].id : 0,
    isMain: true,
    deliveryServiceId:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].deliveryServiceId
        : 0,
    deliveryServiceName:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].deliveryServiceName
        : '',
    deliveryServiceEmail:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].deliveryCompEmail
        : '',
    deliveryServicePhno:
      mainDeliveryService?.length > 0 ? mainDeliveryService[0].contactPh : '',
    logoPath:
      mainDeliveryService?.length > 0 ? mainDeliveryService[0].imgPath : '',
    deliveryFee:
    cartInfo?.deliveryFee  === 0 ? cartInfo?.deliveryInfo?.mainDeliveryService[0].deliveryFee : cartInfo?.deliveryFee,
      // cartInfo?.deliveryFee,
    fromEstDeliveryDay:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].fromEstDeliveryDay
        : cartInfo?.fromEstDeliveryDay,
    toEstDeliveryDay:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].toEstDeliveryDay
        : cartInfo?.toEstDeliveryDay,
  };
  // const selectedDeliveryInfo =  {
  //   "id": 0,
  //   "isMain": true,
  //   "deliveryServiceId": 0,
  //   "deliveryServiceName": "string",
  //   "deliveryServiceEmail": "string",
  //   "deliveryServicePhno": "string",
  //   "logoPath": "string",
  //   "deliveryFee": cartInfo?.deliveryFee,
  //   "fromEstDeliveryDay": 0,
  //   "toEstDeliveryDay": 0
  // }
  const isPaymentAgain = propsState?.is_payment_again || false;
  /**
   * life cycle
   */
  useEffect(() => {
    fetchBankList();
  }, []);

  useEffect(() => {
    if (bankList.length <= 0) return;
    setSelectedBank(bankList[0]);
  }, [bankList]);

  useEffect(() => {
    if (!orderId) return;
    setSuccessOrderMessageBox(true);
  }, [orderId]);

  const [imageFile, setImageFile] = useState(null);
  const [imageObj, setImageObj] = useState();

  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [Remark, setRemark] = useState();

  const [isImage, setIsImage] = useState(false);
  const [validateMessage, setValidateMessage] = useState('');

  const [confirmMessageBox, setConfirmMessageBox] = useState(false);
  const [successOrderMessageBox, setSuccessOrderMessageBox] = useState(false);

  //#region - Uploaded Image Section
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const handleImageUpload = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setImageObj(current.src);
      };
      reader.readAsDataURL(file);
      setImageFile(file.type);
    }
  };
  //#endregion

  const [selectedBank, setSelectedBank] = useState(null);

  const clickingBank = (bank) => {
    setSelectedBank(bank);
  };

  //#region - Make Purchase Section
  const checkBankInfo = () => {
    if (!imageFile) {
      setIsImage(true);
      setValidateMessage(t('ShoppingCart.require-bank-slip-image'));
      return true;
    }
    return false;
  };
  const makePurchase = (data) => {
    if (checkBankInfo()) return;

    setBankAccountNumber(data.BankAccountNumber);
    setRemark(data.Remark);
    setConfirmMessageBox(true);
  };
  const confirmMakePurchase = () => {
    let clone_selectedBank = _.cloneDeep(selectedBank);
    let clone_Remark = _.cloneDeep(Remark || '');
    let clone_imageFile = _.cloneDeep(imageFile);
    let clone_imageObject = _.cloneDeep(imageObj);

    let imageExtString = clone_imageFile.slice(6, clone_imageFile.length);
    let imageString = clone_imageObject.slice(
      imageExtString.length + 19,
      clone_imageObject.length
    );
    let paymentInfo = composePaymentInfo(
      paymentServiceId,
      clone_selectedBank.id,
      bankAccountNumber,
      clone_Remark,
      imageString,
      imageExtString
    );
    setConfirmMessageBox(false);
    if (isPaymentAgain) {
      let postData = {
        orderId: propsState.order_id,
        paymentServiceId: paymentServiceId,
        phoNo: bankAccountNumber,
        remark: clone_Remark,
        bankId: clone_selectedBank.id,
        approvalImage: {
          approvalImage: imageString,
          approvalImageExtension: imageExtString,
        },
      };
      postPaymentAgain(postData);
      return;
    }
    let postData = composePostOrderData(
      cartInfo,
      productInfo,
      paymentInfo,
      propsState?.total_amount,
      selectedDeliveryInfo
    );
    // console.log(productInfo)
    postOrder(postData);
  };
  //#endregion

  return [
    isLoading,
    isSecondaryLoading,
    bankList,
    selectedBank,
    uploadedImage,
    imageUploader,
    netAmt,
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
  ];
}
