import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_TOWNSHIP } from "../../../constant/defaultTownship";
import HeadingLayout from "../CommonUI/heading_layout";

//images
import AddressIcon from "../../../assets/orderDetail/address_icon.PNG"

const DeliverSection = ({ DeliveryInfo = {} }) => {
  const { t } = useTranslation();
  const [isMoreDeliveryAddress, setIsMoreDeliveryAddress] = useState(true);

  return (
    <>
      <div className="bg-white mt-2 pt-3 pb-2 md:mt-0 md:py-0 ">
        <div className="mx-4 md:mx-0 space-y-4 ">
          <HeadingLayout
            HeadingText={` ${t("AddFixed.deilvery-address")}`}
            isShow={isMoreDeliveryAddress}
            /**
             * action
             */
            clickOnArrowIcon={() =>
              setIsMoreDeliveryAddress(!isMoreDeliveryAddress)
            }
          />
         
          {isMoreDeliveryAddress && (
            <div>
            {/* <div className=" h-0.5 bg-gray-200 block md:hidden mb-2" /> */}
              <div className="bg-gray-100 py-3 px-2 md:px-4">
                <img
                          src={AddressIcon}
                          className="w-10 h-full cursor-pointer mr-2 "
                          alt="Voucher Icon"
                            />
                <div className="flex">
                  
                    <p className="primary-font text-color-default">
                    {DeliveryInfo?.address}{" "}
                    {DeliveryInfo.townshipName === DEFAULT_TOWNSHIP
                      ? ""
                      : DeliveryInfo.townshipName}{" "}
                    {DeliveryInfo.cityName}
                    </p>
                </div>
              <p className="primary-font text-color-default">
                {DeliveryInfo?.phNo}
              </p>
              </div>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliverSection;
