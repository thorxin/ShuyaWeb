/** @format */

import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';

//components
import {
  goToSpecificPathName,
  goToSpecificPathNameWithData,
} from '../../util/goToSpecificPathName';
import {
  ORDER_HISTORY,
  PAY_WITH_BANK,
  PAY_WITH_AGENT,
  VOUCHER_PAGE,
} from '../../constant/locationPathName';
import {
  BANK_PAYMENT_TYPE,
  CASH_ON_DELIVERY_PAYMENT_TYPE,
  SERVICE_PAYMENT_TYPE,
} from '../ShoppingCart/util';

export function Hook({
  isLoading,
  isSuccess,
  posVoucher,
  OrderDetail,
  Message,
  orderMessageList,
  shoppingCart,
  /**
   * actions
   */
  fetchOrderDetail,
  OrderCancel,
  MakePaymentAgain,
  clearOrderId,
  postPaymentAgain,
  // sendOrderNoteMessage,
  // fetchOrderMessageList,
}) {
  const location = useLocation();
  const history = useHistory();
  const orderId = location.state;
  const willGoBack = location.goback || false;

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [showPopUP, setShowPopUP] = useState(false);

  const [isShowCancelOrderBox, setIsShowCancelOrderBox] = useState(false);
  const [isShowSuccessOrderBox, setIsShowSuccessOrderBox] = useState(false);
  const [isShowSuccessCODBox, setIsShowSuccessCODBox] = useState(false);
  const [isPaymentServiceBox, setIsPaymentServiceBox] = useState(false);
  const [serviceGatewayArray, setServiceGatewayArray] = useState(null);
  const checkAndGoBack = () => {
    if (willGoBack) history.goBack();
    else
      history.push({
        pathname: '/order-history',
      });
  };

  /**
   * Life Cycle
   */
  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId);
      // fetchOrderMessageList(orderId, 1, 1);
      clearOrderId();
    }
  }, [orderId]);

  useEffect(() => {
    if (!isSuccess) return;
    setIsShowSuccessOrderBox(true);
  }, [isSuccess]);

  const clickingPayment = (paymentId) => {
    switch (paymentId) {
      case 1:
        alert('Coming Soon!');
        break;

      case 2:
        alert('Coming Soon!');
        break;

      case 5:
        history.push({
          pathname: '/shoppingcart/paywithbank',
          state: {
            isPayAgain: true,
            netAmt: OrderDetail.netAmt,
            orderID: OrderDetail.orderId,
          },
        });
        break;
    }
  };
  /**
   * Cash On Delivery is 7
   */
  const clickingCashOnDelivery = () => {
    if (orderId) {
      const requestBody = {
        orderId: orderId,
        paymentServiceId: 7,
        phoNo: '',
        remark: '',
        bankId: 0,
        approvalImage: {
          approvalImage: '',
          approvalImageExtension: '',
        },
      };
      MakePaymentAgain(requestBody);
    }
  };

  useEffect(() => {
    if (Message) {
      setShowPopUP(true);
    }
  }, [Message]);

  const handleClose = () => {
    setShowPopUP(false);
    window.history.back();
  };

  const goToBack = () => {
    goToSpecificPathName(history, ORDER_HISTORY);
  };
  const goToVoucherPrintPage = () => {
    if (!orderId) return;
    goToSpecificPathNameWithData(history, VOUCHER_PAGE, orderId);
  };
  const clickingCancelOrder = () => {
    setIsShowCancelOrderBox(true);
  };
  const confirmCancelOrder = () => {
    let propsData = {
      orderId: orderId,
      cancelNote: '',
    };
    OrderCancel(propsData);
  };
  const clickingOnSuccess = () => {
    window.location.reload();
  };
  /**
   * check Payment Service - Auto Payment or Manual Payment(Pay Slip)
   * @param {Array} service_gateway
   */
  const checkPaymentServiceGateWay = (service_gateway = []) => {
    if (service_gateway.length <= 0) return;

    let gateway = _.cloneDeep(service_gateway);
    let size = gateway.length;
    if (size === 1) {
      onClickServiceGateWay(gateway[0].isPaymentGateWay, gateway[0].id);
      return;
    }
    if (size > 1) {
      setIsPaymentServiceBox(true);
      setServiceGatewayArray(gateway);
      return;
    }
    if (size <= 0) {
      if (gateway[0].isPaymentGateWay == true) {
        alert('Coming Soon!');
        return;
      }
      if (gateway[0].isPaymentGateWay === false) {
        console.log('Service');
        // let service_id = gateway[0].id;
        // let composeOrderData = composeOrderDataPayWith(
        //   shopCartDetail,
        //   service_id,
        //   clone_availableProduct
        // );
        // goToSpecificPathNameWithData(history, PAY_WITH_AGENT, composeOrderData);
        return;
      }
    }
  };

  const onClickServiceGateWay = (is_gateway, id) => {
    setIsPaymentServiceBox(false);
    if (is_gateway) {
      alert('Coming Soon!');
      return;
    }
    let propsData = {
      order_id: OrderDetail.orderId,
      payment_service_id: id,
      total_amount: OrderDetail.netAmt,
      delivery_fee: OrderDetail.deliveryFee,
      is_payment_again: true,
    };
    goToSpecificPathNameWithData(history, PAY_WITH_AGENT, propsData);
    // let composeOrderData = composeOrderDataPayWith(
    //   shopCartDetail,
    //   id,
    //   availableProductList,
    //   totalAmount
    // );
    // goToSpecificPathNameWithData(history, PAY_WITH_AGENT, composeOrderData);
  };

  const clickingOnPaymentService = async (
    payment_type = '',
    payment_id = 0,
    payment_service_gateway = []
  ) => {
    switch (payment_type) {
      case SERVICE_PAYMENT_TYPE:
        checkPaymentServiceGateWay(payment_service_gateway);
        break;
      case BANK_PAYMENT_TYPE:
        let propsData = {
          order_id: OrderDetail.orderId,
          payment_service_id: payment_id,
          total_amount: OrderDetail.netAmt,
          delivery_fee: OrderDetail.deliveryFee,
          is_payment_again: true,
        };
        goToSpecificPathNameWithData(history, PAY_WITH_BANK, propsData);
        break;
      case CASH_ON_DELIVERY_PAYMENT_TYPE:
        let postData = {
          orderId: OrderDetail.orderId,
          paymentServiceId: payment_id,
          phoNo: '',
          remark: '',
          bankId: 0,
          approvalImage: {
            approvalImage: '',
            approvalImageExtension: '',
          },
        };
        await postPaymentAgain(postData);
        setIsShowSuccessCODBox(true);
        break;
      default:
        break;
    }
  };
  return [
    isLoading,
    posVoucher,
    OrderDetail,
    OrderDetail?.paymentInfo[OrderDetail.paymentInfo.length - 1],
    // deliveryInfo,
    // status,
    willGoBack,
    deliveryAddress,
    // Cancel,
    clickingPayment,
    showPopUP,
    handleClose,
    orderId,
    orderMessageList,
    isShowCancelOrderBox,
    setIsShowCancelOrderBox,
    isShowSuccessOrderBox,
    setIsShowSuccessOrderBox,
    isPaymentServiceBox,
    setIsPaymentServiceBox,
    serviceGatewayArray,
    isShowSuccessCODBox,
    setIsShowSuccessCODBox,
    /**
     * action
     */
    clickingCashOnDelivery,
    goToVoucherPrintPage,
    goToBack,
    clickingCancelOrder,
    confirmCancelOrder,
    clickingOnSuccess,
    onClickServiceGateWay,
    clickingOnPaymentService,
    // sendOrderNoteMessage,
  ];
}
