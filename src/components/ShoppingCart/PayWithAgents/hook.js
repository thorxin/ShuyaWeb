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
  paymentServiceDetail,
  orderId,
  /**
   * action
   */
  fetchPaymentServiceDetail,
  postOrder,
  postPaymentAgain,
}) {
  const { t } = useTranslation();

  const location = useLocation();
  const propsState = location.state;
  const cart_detail = propsState?.cart_info;
  const serviceId = propsState?.payment_service_id;
  const productInfo = propsState?.available_product;
  const totalAmt = propsState?.total_amount;
  const deliveryFee = cart_detail?.deliveryFee  === 0 ? cart_detail?.deliveryInfo?.mainDeliveryService[0].deliveryFee : cart_detail?.deliveryFee
  const netAmt = propsState?.total_amount + deliveryFee ; 
  const netAmt_Again = propsState?.total_amount;
  const mainDeliveryService = cart_detail?.deliveryInfo.mainDeliveryService;
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
    cart_detail?.deliveryFee  === 0 ? cart_detail?.deliveryInfo?.mainDeliveryService[0].deliveryFee : cart_detail?.deliveryFee,
      // cartInfo?.deliveryFee,
    fromEstDeliveryDay:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].fromEstDeliveryDay
        : cart_detail?.fromEstDeliveryDay,
    toEstDeliveryDay:
      mainDeliveryService?.length > 0
        ? mainDeliveryService[0].toEstDeliveryDay
        : cart_detail?.toEstDeliveryDay,
  };
  // const selectedDeliveryInfo =  {
  //   "id": 0,
  //   "isMain": true,
  //   "deliveryServiceId": 0,
  //   "deliveryServiceName": "string",
  //   "deliveryServiceEmail": "string",
  //   "deliveryServicePhno": "string",
  //   "logoPath": "string",
  //   "deliveryFee": 0,
  //   "fromEstDeliveryDay": 0,
  //   "toEstDeliveryDay": 0
  // }

  /**
   * life cycle
   */
  useEffect(() => {
    fetchPaymentServiceDetail(serviceId);
  }, [serviceId]);

  useEffect(() => {
    if (!orderId) return;
    setSuccessOrderMessageBox(true);
  }, [orderId]);

  const [imageFile, setImageFile] = useState(null);
  const [imageObj, setImageObj] = useState();

  const [transferPhonNo, setTransferPhoneNo] = useState();
  const [Remark, setRemark] = useState();

  const [isImage, setIsImage] = useState(false);
  const [validateMessage, setValidateMessage] = useState('');

  const [selectedBank, setSelectedBank] = useState(null);

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const [confirmMessageBox, setConfirmMessageBox] = useState(false);
  const [successOrderMessageBox, setSuccessOrderMessageBox] = useState(false);
  const isPaymentAgain = propsState?.is_payment_again || false;

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

  const checkPaymentInfo = () => {
    if (!imageFile) {
      setIsImage(true);
      setValidateMessage(t('ShoppingCart.require-bank-slip-image'));
      return true;
    }

    return false;
  };

  const makePurchase = (data) => {
    if (checkPaymentInfo()) return;
    setTransferPhoneNo(data.TransferPhoneNumber);
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
      serviceId,
      clone_selectedBank?.id || 0,
      transferPhonNo,
      clone_Remark,
      imageString,
      imageExtString
    );
    setConfirmMessageBox(false);
    if (isPaymentAgain) {
      let postData = {
        orderId: propsState.order_id,
        paymentServiceId: serviceId,
        phoNo: transferPhonNo,
        remark: clone_Remark,
        bankId: clone_selectedBank?.id || 0,
        approvalImage: {
          approvalImage: imageString,
          approvalImageExtension: imageExtString,
        },
      };
      postPaymentAgain(postData);
      return;
    }
    let postData = composePostOrderData(
      cart_detail,
      productInfo,
      paymentInfo,
      totalAmt,
      selectedDeliveryInfo
    );
    postOrder(postData);
  };

  return [
    isLoading,
    isSecondaryLoading,
    paymentServiceDetail,
    netAmt,
    netAmt_Again,
    selectedDeliveryInfo,
    uploadedImage,
    imageUploader,
    isImage,
    validateMessage,
    confirmMessageBox,
    setConfirmMessageBox,
    orderId,
    successOrderMessageBox,
    setSuccessOrderMessageBox,
    /**
     * action
     */
    handleImageUpload,
    makePurchase,
    confirmMakePurchase,
  ];
}
