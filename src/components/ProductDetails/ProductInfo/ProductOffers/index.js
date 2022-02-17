import React from "react";

//images
import ShippingInfoIcon from "../../../../assets/productDetail/shipping_info_icon.svg";
import ReturnPolicyIcon from "../../../../assets/productDetail/return_policy_icon.svg";
import WarrantyIcon from "../../../../assets/productDetail/warranty_icon.svg";
import InstallationIcon from "../../../../assets/productDetail/installation_icon.svg";
import PreOrderTAndCIcon from "../../../../assets/productDetail/pre_order_t_c.svg";
import RightArrowIcon from "../../../../assets/productDetail/right_arrow_icon.svg";

import { useHistory } from "react-router";
import { useLocation } from "react-router";
import {
  GET_STORED_ACCESS_TOKEN,
  PRODUCT_OFFER_ID,
  saveLocalStorage,
} from "../../../../util/storage";
import {
  goToSpecificPathName,
  goToSpecificPathNameWithData,
} from "../../../../util/goToSpecificPathName";
import { LOGIN,PRODUCT_OFFER_INFO } from "../../../../constant/locationPathName";

export const ListItem = ({ Icons, Title, Text, Id }) => {
  
  const history = useHistory();
  const goToDetail = () => {
    let pathname = `/productoffer/${Title}`;
    let propsState = {
      title: Title,
      description: Text,
    };
    goToSpecificPathNameWithData(history, pathname, propsState);
  };

  return (
    <>
      <div className="col-span-1">
        <img src={Icons} className="w-6 h-auto" alt="Shipping Info Icon" />
      </div>
      <div className="col-span-6">
        <p className="primary-font text-color-default">{Title}</p>
        <p className="primary-font text-color-secondary text-justify font-normal">
          {Text.substring(0, 50)}......
        </p>
      </div>
      <div className="col-span-1 cursor-pointer" onClick={goToDetail}>
        <img src={RightArrowIcon} className="w-2 h-auto" alt="Right Arrow" />
      </div>
    </>
  );
};


const ProductOffers = ({
  ShippingInfo = null,
  ReturnPolicy = null,
  Warranty = null,
  PreOrderTAndC = null,
  Installation = null,
}) => {


  if (ShippingInfo || ReturnPolicy || Warranty || PreOrderTAndC || Installation)
    return (
      <>
        <div className="bg-white  py-4 border-b-2 border-gray-200">
          <div className="mx-4 space-y-4">
            <p className="primary-font custom-font-bold text-color-secondary">
              Product Offers
            </p>
            <div className="grid grid-cols-8 gap-x-5 gap-y-6">
              {ShippingInfo && (
                <ListItem
                  Icons={ShippingInfoIcon}
                  Title={ShippingInfo.title}
                  Text={ShippingInfo.description}
                  Id={ShippingInfo.id}
                />
              )}
              {ReturnPolicy && (
                <ListItem
                  Icons={ReturnPolicyIcon}
                  Title={ReturnPolicy.title}
                  Text={ReturnPolicy.description}
                  Id={ReturnPolicy.id}
                />
              )}
              {Warranty && (
                <ListItem
                  Icons={WarrantyIcon}
                  Title={Warranty.title}
                  Text={Warranty.description}
                  Id={Warranty.id}
                />
              )}
              {PreOrderTAndC && (
                <ListItem
                  Icons={PreOrderTAndCIcon}
                  Title={PreOrderTAndC.title}
                  Text={PreOrderTAndC.description}
                  Id={PreOrderTAndC.id}
                />
              )}

              {Installation && (
                <ListItem
                  Icons={InstallationIcon}
                  Title={Installation.title}
                  Text={Installation.description}
                  Id={Installation.id}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );

  return null;
};

export default ProductOffers;
