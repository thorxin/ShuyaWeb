import React from "react";
import { useTranslation } from "react-i18next";
import {useHistory} from "react-router-dom";

//components
import { SubHeadingWithBackArrow } from "../CommonComponent/SubHeading/sub_heading_with_back_arrow";
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";

//images
import NoShopCartIcon from "../../assets/shoppingcart/no_shop_cart_icon.png";
import MyShopCartIcon from "../../assets/shoppingcart/shop_cart_icon.svg";

const NoProductShoppingCart = () => {
  const { t } = useTranslation();
  const history  = useHistory();
  const clickOnBack = () => {
    history.goBack();
  }
  return (
    <>
      <div className="bg-gray-200 w-full h-auto min-h-screen md:space-y-4">
        <NavigationWeb />
        <div className="default-margin-layout  md:space-y-4">
          <SubHeadingWithBackArrow goTo={clickOnBack}>
            <div className="w-5 h-auto">
              <img
                src={MyShopCartIcon}
                className="w-full h-full"
                alt="MyShopCart"
              />
            </div>
            <p className="sub-heading-font text-color-default">
              {t("ShoppingCart.my-cart")}
            </p>
          </SubHeadingWithBackArrow>
          <div className="bg-gray-100 w-full h-screen flex justify-center flex-wrap content-center mt-2">
            <div className="mt-2">
              <img
                src={NoShopCartIcon}
                className="w-28 md:w-36 h-auto"
                alt="NoShoppingCartIcon"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoProductShoppingCart;
