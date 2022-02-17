import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import ScrollToTop from "./util/scrollToTop";

/**
 * Connected with Reudux
 */
import Home from "./containers/container.home";

import Notification from "./containers/container.notification";

//#region - product detail
import ProductDetails from "./containers/container.productdetails";
import QuestionAndAnswer from "./containers/ProductDetail/container.questionandanswer";
import ProductOfferInfo from "./containers/ProductDetail/container.productofferinfo";

//#region - product search
import ProductSearch from "./containers/container.productsearch";
import ResultList from "./containers/container.productsearchresultlist";
import ByCategory from "./containers/container.bycategory";
//#endregion

//#region - product byBrand
import ByBrand from "./containers/container.bybrand";
//#endregion
/**  For Authentication */
import Login from "./containers/Authentication/container.login";
import Registration from "./containers/Authentication/container.registration";
import AccountVerification from "./containers/Authentication/container.accountverification";
import RegistrationAddress from "./containers/Authentication/container.registrationaddress";
import RegistrationAddress_V2 from "./containers/Authentication/container.v2_registrationaddress";
/** End Authentication */

/** For Order */
import ShoppingCart from "./containers/Order/container.shoppingcart";
import PayWithAgents from "./containers/Order/container.paywithagent";
import PayWithBank from "./containers/Order/container.paywithbank";
import OrderHistory from "./containers/Order/container.order_history";
import OrderDetail from "./containers/Order/container.orderdetail";
import DeliveryAddressChange from "./containers/Order/container.deliveryaddresschage";

/** For Order */
import POSVoucherPrint from "./containers/Order/container.posvoucher";

import ChooseLanguage from "./components/Language/language";

//#region - MyAccount
import MyAccount from "./containers/MyAccount/container.my_account";
import ChangePasswordByMyAccount from "./components/MyAccount/ChangePassword/change_password";
import ChangeEmailOrPhoneByMyAccount from "./components/MyAccount/ChangeEmailOrPhone/change_email_or_phone";
import OTPVerificationByMyAccount from "./components/MyAccount/ChangeEmailOrPhone/OTPVerification/otp_verification";
import ChangeAddress from "./containers/Authentication/container.changeaddress";
import V2_CHANGE_ADDRESS from "./containers/MyAccount/container.v2_changeaddress";
import TermsCondition from "./containers/MyAccount/container.terms";
import WishList from "./containers/container.wishlist";
//#endregion

//#region - ForgotPassword
import ForgotPassword from "./components/Authentication/ForgotPassword/forgot_password";
import ChangeEmailOrPhone from "./components/MyAccount/ChangeEmailOrPhone/change_email_or_phone";
import OTPVerification from "./components/Authentication/ForgotPassword/OTPVerification/otp_verification";
import ChangePassword from "./components/Authentication/ForgotPassword/ChangePassword/change_password";
//#endregion

//#region - ForgotPassword
import ProductOfferDetail from "./components/ProductOffer/product_card_detail";
//#endregion

import {
  CHOOSE_LANGUAGE,
  MY_ACCOUNT,
  CHANGE_EMAIL_OR_PHONE_BY_MY_ACCOUNT,
  OTP_VERIFICATION_BY_MY_ACCOUNT,
  BY_CATEGORY,
  SHOPPING_CART,
  LOGIN,
  PRODUCT_SEARCH_RESULT,
  QUESTION_AND_ANSWER,
  TERMS_CONDITION,
  CHANGE_PASSWORD_BY_MY_ACCOUNT,
  ORDER_HISTORY,
  CHANGE_ADDRESS,
  ACCOUNT_VERIFICATION,
  REGISTRATION_CHANGE_ADDRESS,
  REGISTRATION_CHANGE_ADDRESS_V2,
  PAY_WITH_BANK,
  PAY_WITH_AGENT,
  BY_BRAND,
  DELIVERY_ADDRESS_CHANGE,
  CHANGE_ADDRESS_V2,
} from "./constant/locationPathName";
import {
  ADD_TO_CART,
  GET_STORED_ACCESS_TOKEN,
  removeLocalStorage,
  SHOPPING_CART_TYPE,
} from "./util/storage";
import { fetch_ShopCartDetail } from "./modules/action.shoppingcart";
import { fetch_notification } from "./modules/action.notification";

function Routing() {
  const dispatch = useDispatch();

  //#region - need to refactoring - to remove shopCartItem local storage for buy now product
  const location = useLocation();
  const pathName = location.pathname.toLowerCase() || "";
  useEffect(() => {
    if (pathName === SHOPPING_CART || pathName === LOGIN || pathName === PAY_WITH_BANK || pathName === PAY_WITH_AGENT)
      return;
    removeLocalStorage(ADD_TO_CART);
    removeLocalStorage(SHOPPING_CART_TYPE);
  }, [pathName]);
  //#endregion

  //#region - ShopCart Count
  useEffect(() => {
    if (pathName === SHOPPING_CART || !GET_STORED_ACCESS_TOKEN) return;
    dispatch(fetch_ShopCartDetail());
  }, [pathName, GET_STORED_ACCESS_TOKEN]);
  //#endregion

  //#region - Notification
  useEffect(() => {
    if(!GET_STORED_ACCESS_TOKEN) return;
    dispatch(fetch_notification({ page_number: 1, is_removed_state: false, only_noti_count: true }));
  }, [pathName]);
  // #endregion

  return (
    <ScrollToTop>
      <Switch>
        <Route path={CHOOSE_LANGUAGE} exact component={ChooseLanguage} />

        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/productdetails" exact component={ProductDetails} />
        <Route path="/notification" component={Notification} />

        {/* For MyAccount */}
        <Route path={MY_ACCOUNT} exact component={MyAccount} />
        <Route path={CHANGE_ADDRESS_V2} exact component={V2_CHANGE_ADDRESS} />
        <Route
          path={CHANGE_PASSWORD_BY_MY_ACCOUNT}
          component={ChangePasswordByMyAccount}
        />
        <Route
          path={CHANGE_EMAIL_OR_PHONE_BY_MY_ACCOUNT}
          component={ChangeEmailOrPhoneByMyAccount}
        />
        <Route
          path={OTP_VERIFICATION_BY_MY_ACCOUNT}
          component={OTPVerificationByMyAccount}
        />
        <Route path={CHANGE_ADDRESS} component={ChangeAddress} />
        <Route path={TERMS_CONDITION} component={TermsCondition} />

        <Route path="/productsearch" component={ProductSearch} />
        <Route path={PRODUCT_SEARCH_RESULT} component={ResultList} />
        <Route path={BY_CATEGORY} component={ByCategory} />

        <Route path={BY_BRAND} component={ByBrand} />

        {/* For Product Detail */}
        <Route path={QUESTION_AND_ANSWER} component={QuestionAndAnswer} />
        <Route path="/productoffer/:name" children={<ProductOfferDetail />} />

        {/* For Footer Item */}
        <Route path="/footer/:name" children={<ProductOfferInfo />} />

        {/* For Authentication */}
        <Route path={LOGIN} exact component={Login} />

        {/* For Registration */}
        <Route path="/registration" exact component={Registration} />
        <Route path={ACCOUNT_VERIFICATION} component={AccountVerification} />
        <Route
          path={REGISTRATION_CHANGE_ADDRESS}
          component={RegistrationAddress}
        />
        <Route 
          path={REGISTRATION_CHANGE_ADDRESS_V2}
          component={RegistrationAddress_V2}
        />

        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/otpverification" component={OTPVerification} />

        <Route path="/changepassword" component={ChangePassword} />

        {/* For Order */}
        <Route path={SHOPPING_CART} component={ShoppingCart} />
        <Route path={DELIVERY_ADDRESS_CHANGE} component={DeliveryAddressChange} />
        <Route path="/paywithbank" component={PayWithBank} />
        <Route path="/paywithagent" exact component={PayWithAgents} />
        <Route path={ORDER_HISTORY} component={OrderHistory} />
        <Route path="/orderdetail" component={OrderDetail} />

        {/* For Voucher*/}
        <Route path="/voucherprint" exact component={POSVoucherPrint} />

        {/* For WishList */}
        <Route path="/wishlist" component={WishList} />
      </Switch>
    </ScrollToTop>
  );
}
export default Routing;
