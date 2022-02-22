import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//components
import { CASH_ON_DELIVERY_PAYMENT_TYPE, BANK_PAYMENT_TYPE } from "../util";
import { ErrorMessageBoxValidation } from "../../CommonComponent/error_box";

const PaymentService = ({
  Services = {},
  cityId,
  /**
   * action
   */
  onClickPayment,
  isPayAgain = false,
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  const [isChecked, setIsChecked] = useState(true);

  const clickChecked = () => {
    setIsChecked(!isChecked);
  };

  if (Services.paymentType !== CASH_ON_DELIVERY_PAYMENT_TYPE)
    return (
      <div className="col-span-3 md:col-span-2">
        <div
          className="w-full h-auto cursor-pointer"
          onClick={() =>
            onClickPayment(
              Services?.paymentType,
              Services?.id,
              Services?.paymentServiceGateWay
            )
          }
        >
          <img
            src={Services.url}
            className="w-full h-auto"
            alt="PaymentServiceImage"
          />
        </div>
      </div>
    );
  if (Services.paymentType === CASH_ON_DELIVERY_PAYMENT_TYPE)
    if (cityId === 260 || cityId === 104) {
      if (location.pathname !== "/orderdetail") {
        return (
          <div className="col-span-12 space-y-3">
            <div>
              <p className="caption-font text-color-secondary font-medium">
                ( {t("Common.Or")} )
              </p>
            </div>
            <div className="flex items-center space-x-2 ">
              <input
                type="checkbox"
                className="text-color-default cursor-pointer"
                onClick={clickChecked}
              />
              <p className="primary-font text-color-default">
                {t("ShoppingCart.cash-on-delivery")}
              </p>
            </div>
            <div className="w-full h-auto">
              <button
                className={`primary-btn primary-font py-3 md:py-2 ${
                  isChecked ? "bg-gray-500" : "bg-custom-primary"
                }`}
                disabled={isChecked}
                onClick={() =>
                  onClickPayment(Services?.paymentType, Services?.id)
                }
              >
                {t("Common.buy-now")}
              </button>
            </div>
          </div>
        );
      }
    }

  return null;
};

export default PaymentService;
