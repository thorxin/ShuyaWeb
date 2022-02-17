import React from "react";
import { useTranslation } from "react-i18next";
import { PopOverBox } from "../../CommonComponent/PopOverBox/pop_over_box";

//images
import LoadingIcon from "../../../assets/Authentication/Loading/auth_loading_black.gif";

export default function VoucherNoSuggestionDropDownItems({
  Loading,
  VoucherNoArrayList = [],
  /**
   * action
   */
  clickOnVoucherNo,
}) {
  const { t } = useTranslation();

  if (Loading)
    return (
      <PopOverBox>
        <img src={LoadingIcon} className="w-6 h-auto mx-auto" alt="LoadingGif" />
      </PopOverBox>
    );

  return (
    <>
      <PopOverBox>
        {VoucherNoArrayList.length > 0 ? (
          <div className="space-y-2">
            {VoucherNoArrayList.map((voucherNo, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => clickOnVoucherNo(voucherNo)}
              >
                <p className="primary-font hover:text-color-link">
                  {voucherNo}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="primary-font text-center text-color-secondary">
              {t("Common.no-result-found")}
            </p>
          </div>
        )}
      </PopOverBox>
    </>
  );
}
