/** @format */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

//components
import {
  composeDataRemoveFromCart,
  SERVICE_PAYMENT_TYPE,
  BANK_PAYMENT_TYPE,
  CASH_ON_DELIVERY_PAYMENT_TYPE,
  composeOrderDataPayWith,
  composePaymentInfo,
  composePostOrderData,
} from './util';
import {
  PAY_WITH_BANK,
  PAY_WITH_AGENT,
  HOME_DEFAULT,
} from '../../constant/locationPathName';
import {
  goToSpecificPathName,
  goToSpecificPathNameWithData,
} from '../../util/goToSpecificPathName';
import { ADD_TO_CART, getLocalStorage } from '../../util/storage';

export function Hook({
  isLoading,
  isSuccess,
  isError,
  shopCartDetail,
  availableProductList,
  outOfStockProductList,
  stockLeftProductList,
  totalAmount,
  orderId,
  /**
   * action
   */
  fetchShopCartDetail,
  fetchShopCartDetailForBuyNow,
  increasingProductQty,
  decreaseProductQty,
  removeFromCart,
  removeAllFromCart,
  postOrder,
}) {
  const history = useHistory();
  const { t } = useTranslation();

  const cartInfo = getLocalStorage(ADD_TO_CART);

  /**
   * Life Cycle
   */
  useEffect(() => {
    if (cartInfo) {
      fetchShopCartDetailForBuyNow(JSON.parse(cartInfo));
      return;
    }
    fetchShopCartDetail();
  }, []);

  useEffect(() => {
    if (!isError) return;
    toast.error('Exceed Qty', {
      theme: 'colored',
    });
  }, [isError]);

  useEffect(() => {
    if (orderId <= 0) return;
    setSuccessOrderBox(true);
  }, [orderId]);

  const [availableProduct, setAvailableProduct] = useState([]);
  const [stockLeftProduct, setStockLeftProduct] = useState([]);
  const [outOfStockProduct, setOutOfStockProduct] = useState([]);

  const [isCheckShopCartMessageBox, setIsCheckShopCartMessageBox] =
    useState(false);
  const [checkShopCartMessage, setCheckShopCartMessage] = useState('');

  const [isSuccessOrderBox, setSuccessOrderBox] = useState(false);

  const [isPaymentServiceBox, setIsPaymentServiceBox] = useState(false);
  const [serviceGatewayArray, setServiceGatewayArray] = useState(null);

  //#region - Remove Product Section
  const [removeProductInfo, setRemoveProductInfo] = useState(null);
  const [isClearAll, setIsClearAll] = useState(false);
  const [isShowRemoveCartBox, setIsShowRemoveCartBox] = useState(false);
  const [boxMessage, setBoxMessage] = useState('');
  /**
   * Clicking Trash Icon - remove one product
   */
  const onClickTrashIcon = (message = '', product_id, sku_id, product_type) => {
    if (!message) return;

    let info = {
      productId: product_id,
      skuId: sku_id,
      productType: product_type,
    };
    setRemoveProductInfo(info);
    setBoxMessage(message);
    setIsShowRemoveCartBox(true);
  };
  /**
   * Clicking Clear All
   */
  const onClickClearAll = (message = '', type) => {
    if (!message) return;
    let info = {
      productId: 0,
      skuId: 0,
      productType: type,
    };
    setRemoveProductInfo(info);
    setIsClearAll(true);
    setBoxMessage(message);
    setIsShowRemoveCartBox(true);
  };
  /**
   * Confirm Remove Product From Your Shopping Cart
   */
  const confirmRemoveProductFromCart = () => {
    setIsShowRemoveCartBox(false);

    let clone_isClearAll = _.cloneDeep(isClearAll);
    if (clone_isClearAll) {
      removeAllFromCart();
      return;
    }

    let clone_removeProductInfo = _.cloneDeep(removeProductInfo || null);

    if (!clone_removeProductInfo) return;

    let postData = composeDataRemoveFromCart(
      clone_removeProductInfo.productId,
      clone_removeProductInfo.skuId,
      clone_removeProductInfo.productType
    );
    removeFromCart(postData); //api call fun:
  };
  //#endregion

  const checkShopCartMessageBox = (message = '') => {
    if (!message) return;
    setIsCheckShopCartMessageBox(true);
    setCheckShopCartMessage(message);
  };

  /** Check Your Shopping Cart
   * we can't post order when stock left or out of stock products into cart */
  const checkShoppingCart = () => {
    if (stockLeftProduct.length > 0)
      return checkShopCartMessageBox(
        t('ShoppingCart.warning-edit-stock-left-product')
      );

    if (outOfStockProduct.length > 0)
      return checkShopCartMessageBox(
        t('ShoppingCart.warning-edit-stock-out-of-stock')
      );

    return true;
  };

  /**
   * check Payment Service - Auto Payment or Manual Payment(Pay Slip)
   * @param {Array} service_gateway
   */
  const checkPaymentServiceGateWay = (service_gateway = []) => {
    if (service_gateway.length <= 0) return;

    let clone_availableProduct = _.cloneDeep(availableProduct || []);
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
        let service_id = gateway[0].id;
        let composeOrderData = composeOrderDataPayWith(
          shopCartDetail,
          service_id,
          clone_availableProduct,
          totalAmount,
          shopCartDetail.deliveryInfo?.deliveryAmt
        );
        goToSpecificPathNameWithData(history, PAY_WITH_AGENT, composeOrderData);
        return;
      }
    }
  };
  /**
   * on clicking Payment - Services and Buy Now
   * @param {string} payment_type - Service, Bank, Cod
   * @param {int} payment_id - New PaymentService Id
   * @returns
   */
  const clickPayment = (payment_type, payment_id, payment_service_gateway) => {
    if (!checkShoppingCart()) return;
    switch (payment_type) {
      case SERVICE_PAYMENT_TYPE:
        checkPaymentServiceGateWay(payment_service_gateway);
        break;

      case BANK_PAYMENT_TYPE:
        if(shopCartDetail.deliveryInfo?.mainDeliveryService){
          let composeOrderData = composeOrderDataPayWith(
            shopCartDetail,
            payment_id,
            availableProductList,
            totalAmount,
            shopCartDetail.deliveryInfo?.deliveryAmt
          );
          goToSpecificPathNameWithData(history, PAY_WITH_BANK, composeOrderData);
        }
        else {
          let composeOrderData = composeOrderDataPayWith(
            shopCartDetail,
            payment_id,
            availableProductList,
            totalAmount,
            shopCartDetail.deliveryInfo?.deliveryAmt
          );
          goToSpecificPathNameWithData(history, PAY_WITH_BANK, composeOrderData);
        }
        break;

      case CASH_ON_DELIVERY_PAYMENT_TYPE:
        let paymentInfo = composePaymentInfo(payment_id);
        let postOrderData = composePostOrderData(
          shopCartDetail,
          availableProductList,
          paymentInfo,
          totalAmount
        );
       
        postOrder(postOrderData);
        break;

      default:
        return null;
    }
  };
  /**
   * Click Each Service Gateway - Auto Payment or PaySlip(Manual Payment)
   * @param {boolean} is_gateway
   * @param {int} id
   */
  const onClickServiceGateWay = (is_gateway, id) => {
    setIsPaymentServiceBox(false);
    if (is_gateway) {
      alert('Coming Soon!');
      return;
    }
    let composeOrderData = composeOrderDataPayWith(
      shopCartDetail,
      id,
      availableProductList,
      totalAmount,
      shopCartDetail.deliveryInfo?.deliveryAmt
    );
    goToSpecificPathNameWithData(history, PAY_WITH_AGENT, composeOrderData);
  };

  const goBack = () => {
    goToSpecificPathName(history, HOME_DEFAULT);
  };

  return [
    isLoading,
    shopCartDetail,
    availableProductList,
    stockLeftProductList,
    outOfStockProductList,
    totalAmount,
    isShowRemoveCartBox,
    setIsShowRemoveCartBox,
    boxMessage,
    isCheckShopCartMessageBox,
    setIsCheckShopCartMessageBox,
    checkShopCartMessage,
    isSuccessOrderBox,
    setSuccessOrderBox,
    orderId,
    isPaymentServiceBox,
    setIsPaymentServiceBox,
    serviceGatewayArray,
    /**
     * action
     */
    onClickClearAll,
    onClickTrashIcon,
    confirmRemoveProductFromCart,
    increasingProductQty,
    decreaseProductQty,
    clickPayment,
    onClickServiceGateWay,
    goBack,
  ];
}
