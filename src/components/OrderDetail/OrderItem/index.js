import React from "react";
import { useTranslation } from "react-i18next";

//components
import Item from "./Item";

const OrderItem = ({ itemList = [], DiscountPrice }) => {
  const { t } = useTranslation();

  if (itemList.length > 0)
    return (
      <>
        <div className="bg-white pb-6 md:pb-0">
          <div className="mx-4 md:mx-auto space-y-4">
            <p className="primary-font text-color-secondary pt-2">
              {t("OrderDetail.order-items")}( {itemList.length} )
            </p>
            {itemList.map((item, index) => (
              <Item item={item} key={index} DiscountPrice={DiscountPrice}/>
            ))}
          </div>
        </div>
      </>
    );

  return null;
};

export default OrderItem;
