import React from "react";
import { useTranslation } from "react-i18next";

//images
import TrashIcon from "../../../assets/common/trash_icon_white.svg";
import CrossIcon from "../../../assets/common/cancel_cross_icon.svg";
import PaymentCheckingIcon from "../../../assets/orderDetail/payment_checking_icon.svg";
import PaymentSuccessIcon from "../../../assets/orderDetail/payment_success_icon.svg";
import PaymentFailIcon from "../../../assets/orderDetail/payment_fail_icon.svg";

//components
import {
  PAYMENT_CHECKING,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  DELETED,
} from "../../../constant/order";

const OrderStatusBanner = ({ OrderStatusId = 0, PaymentStatusId = 0 }) => {
  const { t } = useTranslation();

  let payment_status_message = "";
  let icon;
  switch (PaymentStatusId) {
    case PAYMENT_CHECKING:
      payment_status_message = t("OrderDetail.payment-checking");
      icon = PaymentCheckingIcon;
      break;
    case PAYMENT_SUCCESS:
      payment_status_message = t("OrderDetail.payment-success");
      icon = PaymentSuccessIcon;
      break;
    case PAYMENT_FAIL:
      payment_status_message = t("OrderDetail.payment-fail");
      icon = PaymentFailIcon;
      break;
    default:
      break;
  }

  const clickOnCrossIcon = () => {
    document.getElementById("banner").style.display = "none";
  };

  if (OrderStatusId === DELETED)
    return (
      <>
      <div id="banner" className="w-full h-auto bg-red-500 rounded-md">
        <div className="mx-4 md:space-y-4 space-y-1 md:py-3 py-1">
          <img
            src={CrossIcon}
            className="w-3 h-auto float-right cursor-pointer md:mr-auto mr-4"
            alt="Cross Icon"
            onClick={() => clickOnCrossIcon()}
          />
          <div className="flex justify-center">
            <img src={TrashIcon} className="w-4 h-auto" alt="Payment Status Icon" />
          </div>
          <p className="primary-font text-center text-color-white">
          {t("OrderDetail.order-deleted")}
          </p>
        </div>
      </div>
        {/* <div className="w-full h-auto bg-red-500">
          <div className="flex space-x-3 items-center justify-center">
            <div>
              <img src={TrashIcon} className="w-4 h-auto" alt="Trash Icon" />
            </div>
            <p className="tertiary-font text-color-white py-2">
              {t("OrderDetail.order-deleted")}
            </p>
          </div>
        </div> */}
      </>
    );

  return (
    <>
      <div id="banner" className="w-full h-auto bg-gray-100 rounded-md">
        <div className="mx-4 md:space-y-4 space-y-1 md:py-3 py-1">
          <img
            src={CrossIcon}
            className="w-3 h-auto float-right cursor-pointer md:mr-auto"
            alt="Cross Icon"
            onClick={() => clickOnCrossIcon()}
          />
          <div className="flex justify-center">
            <img src={icon} className="w-9 h-auto" alt="Payment Status Icon" />
          </div>
          <p className="primary-font text-center text-color-default">
            {payment_status_message}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderStatusBanner;
