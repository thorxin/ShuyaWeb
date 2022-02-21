/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import { Hook } from "./hook";
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";
import FooterWeb from "../CommonComponent/Footer/web_footer";
import { SubHeadingWithBackArrow } from "../CommonComponent/SubHeading/sub_heading_with_back_arrow";

//images
import LeftArrowImage from "../../assets/productSearch/left_arrow_image.png";
import DeliveryService from "../../assets/shoppingcart/deliveryService.svg";

import DefaultContainer from "../WrapperComponents/default_container_no_footer";
import MyCart from "./MyCart";
import DialogBox from "../CommonComponent/DialogBox/dialog_box";
import DeliverAddressAndPhoneNumber from "./delivery_address_phone";
import Payment from "./Payment/payment";
import PaymentOther from "./PaymentOther/payment";
import Loading from "../CommonComponent/Loading/main_loading";
import NoProductShoppingCart from "./no_product_shopping_cart";
import { CheckCartBox } from "./CommonUI/check_cart_box";
import { RemovedCartBox } from "./CommonUI/removed_cart_box";
import { SuccessOrderBox } from "./CommonUI/success_order_box";
import { PaymentServiceBox } from "./CommonUI/payment_service_box";
import { useHistory } from "react-router";

export default function ShoppingCart(props) {
  const [
    isLoading,
    shopCartDetail,
    availableProduct,
    stockLeftProduct,
    outOfStockProduct,
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
  ] = Hook(props);

  // const deliFee =
  //   shopCartDetail?.deliveryInfo?.mainDeliveryService.length > 0
  //     ? shopCartDetail?.deliveryInfo?.mainDeliveryService[0].deliveryFee
  //     : 0;

  const { t } = useTranslation();

  if (isLoading) return <Loading />;

  if (
    availableProduct.length <= 0 &&
    stockLeftProduct.length <= 0 &&
    outOfStockProduct.length <= 0
  )
    return <NoProductShoppingCart />;

  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-4">
        <NavigationWeb />
        <div className="mx-auto md:space-y-4 md:pt-20">
          <SubHeadingWithBackArrow goTo={goBack} />
          <div className="default-margin-layout hidden md:block">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={goBack}
            >
              <div className="w-4 h-auto">
                <img
                  src={LeftArrowImage}
                  className="w-full h-full"
                  alt="Left Arrow"
                />
              </div>
              <p className="tertiary-font text-color-secondary">
                {t("Common.back")}
              </p>
            </div>
          </div>
          <div className="w-full h-auto min-h-screen">
            <div className="default-margin-layout grid grid-cols-1 md:grid-cols-8 md:gap-x-4">
              <div className="md:col-span-5">
                <MyCart
                  AvailableProduct={availableProduct}
                  StockLeftProduct={stockLeftProduct}
                  OutOfStockProduct={outOfStockProduct}
                  /**
                   * action
                   */
                  clickClearAll={onClickClearAll}
                  clickTrashIcon={onClickTrashIcon}
                  IncreaseProductCount={increasingProductQty}
                  DecreaseProductCount={decreaseProductQty}
                />
              </div>
              <div className="md:col-span-3 mt-3 md:mt-0">
                <div className="bg-white w-full h-auto py-3 md:py-4">
                  <DeliverAddressAndPhoneNumber
                    DeliveryInfo={shopCartDetail?.deliveryInfo}
                  />
                </div>
              </div>
            </div>

            {shopCartDetail?.deliveryInfo?.mainDeliveryService.length === 0 &&
            (shopCartDetail?.deliveryInfo.cityId === 260 ||
              shopCartDetail?.deliveryInfo.cityId === 104) ? (
              <div className="w-full md:w-9/12 2xl:w-9/12 h-auto md:mx-auto grid grid-cols-1 md:grid-cols-8 md:gap-x-4 mt-3 md:mt-2">
                <div className="md:col-span-5 px-5 bg-white py-4">
                  <div className="flex items-center gap-2 pb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 0 24 24"
                      width="28px"
                      fill="blue"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                    <h1 className="w-full sub-heading-font text-color-default">
                      Delivery Service
                    </h1>
                  </div>
                  <div className="border py-3 items-center gap-3 flex mt-1 px-2 bg-red-50 border-red-400 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 0 24 24"
                      width="28px"
                      fill="red"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>

                    <div>
                      <span className="text-base font-semibold">
                        We are sorry!
                      </span>
                      <p className="text-sm text-color-secondary">
                        No delivery service for your selected address.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-color-secondary pt-1">
                    Contact to our customer service: 09 795026555
                  </span>
                </div>
              </div>
            ) : (
              <div className="default-margin-layout grid grid-cols-1 md:grid-cols-8 md:gap-x-4 mt-3 md:mt-2">
                <div className="md:col-span-5">
                  <Payment
                    DeliveryInfo={shopCartDetail?.deliveryInfo}
                    DeliveryInfoNoDelivery={shopCartDetail}
                    TotalAmount={totalAmount}
                    NetAmount={totalAmount + shopCartDetail?.deliveryFee}
                    DeliveryFee={
                      shopCartDetail?.deliveryFee === 0
                        ? shopCartDetail?.deliveryInfo?.mainDeliveryService[0]
                            .deliveryFee
                        : shopCartDetail?.deliveryFee
                    }
                    CommercialTax={shopCartDetail?.commercialTax}
                    Discount={shopCartDetail?.discount}
                    // Discount={shopCartDetail.productInfo.reduce((a,v) =>  a = a +( v.qty * (v.promotePrice > 0 && (v.price-v.promotePrice))) , 0 )}
                    PaymentService={shopCartDetail?.newPaymentService}
                    /**
                     * action
                     */
                    clickingPayment={clickPayment}
                  />
                </div>
                <div className="md:col-span-3"></div>
              </div>
            )}
          </div>
        </div>
        <FooterWeb />
        <RemovedCartBox
          isOpenBox={isShowRemoveCartBox}
          boxMessage={boxMessage}
          /**
           * action
           */
          cancelBox={() => setIsShowRemoveCartBox(false)}
          confirmBox={confirmRemoveProductFromCart}
        />
        <SuccessOrderBox
          isOpenBox={isSuccessOrderBox}
          OrderId={orderId}
          setIsOpenBox={setSuccessOrderBox}
          /**
           * action
           */
          closeBox={() => setSuccessOrderBox(false)}
        />
        <PaymentServiceBox
          isOpenBox={isPaymentServiceBox}
          GateWay={serviceGatewayArray}
          /**
           * action
           */
          closeBox={() => setIsPaymentServiceBox(false)}
          clickServiceGateWay={onClickServiceGateWay}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          limit={3}
          closeOnClick
          draggable
          hideProgressBar={true}
        />
      </div>
    </>
  );
}
