import React from "react";
import { useTranslation } from "react-i18next";

//images
import QRScanIcon from "../../../assets/myaccount/QR_scan_icon.svg";

const ReceivedPoints = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-4 rounded-lg md:rounded-none shadow-lg md:shadow-none">
        <div className="flex justify-center space-x-3">
          <img src={QRScanIcon} className="w-5 h-auto" alt="" />
          <p className="tertiary-font"> {t("MemberPoint.accept-point")} </p>
        </div>
    </div>
  );
};

export default ReceivedPoints;
