/** @format */

import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// lib
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
//images
import Logo from "../../../../assets/home/app_logo.png";
import SearchIcon from "../../../../assets/home/search.png";
// import CartIcon from '../../../../assets/common/orderlist.png';
import OrderIcon from "../../../../assets/home/order_icon.png";
import NotiIcon from "../../../../assets/home/noti_icon.png";
import ProfileIcon from "../../../../assets/home/profile_icon.png";
//components
import Notification from "../../../Notification/notification";
import { Hook } from "./hook";
import {
  HOME_DEFAULT,
  ORDER_HISTORY,
  MY_ACCOUNT,
  SHOPPING_CART,
  LOGIN,
  PRODUCT_SEARCH,
} from "../../../../constant/locationPathName";
import { PopOverBox } from "../../PopOverBox/pop_over_box";
import ProductSuggestionList from "../../../ProductSearch/ProductSuggestionList/product_suggestion_list";
import {
  GET_STORED_ACCESS_TOKEN,
  saveLastRoute,
} from "../../../../util/storage";
// action
import {
  fetch_notification,
  notification_HideShowAction,
  seen_notification,
  set_PageDefault,
} from "../../../../modules/action.notification";
import UserOutsideClick from "../../../../util/outsideClickDetect";
import { change_noti_count } from "../../../../modules/reducer.notifications";

// const maximum_cart_count = 9;

const NavigationWeb = (props) => {
  const [
    cartCount,
    notiCount,
    isFocus,
    searchInputBox,
    searchPopUp,
    isLoading,
    productSuggestionList,
    isInputValue,
    /**
     * action
     */
    onFocus,
    onChangeText,
    handleKeyPress,
    setIsFocus,
    dispatchClearDataList,
  ] = Hook(props);

  const { t } = useTranslation();
  let history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const pathName = location.pathname.toLowerCase() || "";
  const { isShowNoti, notificationHideOrShowAction } = props;
  const onclickRoute = (routeName) => {
    if (GET_STORED_ACCESS_TOKEN) return;
    saveLastRoute(routeName);
  };
  // custom hook // control outside of end user noti zone
  const scopeOfNotiSpaceRef = useRef(null);
  UserOutsideClick(scopeOfNotiSpaceRef, () => {
    notificationHideOrShowAction(false);
  });
  const limitationForSearch =
    pathName === "/myaccount" ||
    pathName === "/bycategory" ||
    pathName === `/bybrand/${id}`;
  const limiationForNavBar = pathName === "/myaccount";

  const [animatedClass, setAnimatedClass] = useState("");

  useEffect(() => {
    setAnimatedClass("");
    setTimeout(() => {
      setAnimatedClass("custom-bounce-animation");
    }, 100);
  }, [cartCount]);

  return (
    <div className="hidden md:block bg-white h-20 py-3 fixed w-full top-0 shadow-md z-50">
      <div className="mx-auto">
        <div className="default-margin-layout">
          <div className="flex justify-between items-center">
            {/* Start Search Input */}
            <div className="relative w-1/4">
              <div>
                <input
                  type="text"
                  ref={searchInputBox}
                  id="SearchBox"
                  className="primary-lg-font bg-white rounded-sm w-full h-auto py-3 pl-10 pr-10 focus:outline-none focus:ring-2"
                  placeholder={t("Navigation.Search")}
                  onChange={(e) => {
                    e.target.value !== "" ? onFocus() : setIsFocus(false);
                    onChangeText(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
                <Link to={PRODUCT_SEARCH}>
                  <button className="w-5 h-auto absolute top-4 left-4 cursor-pointer">
                    <img src={SearchIcon} className="" alt="SearchIcon" />
                  </button>
                </Link>
              </div>
              <div
                ref={searchPopUp}
                className={`${isFocus ? "block" : "hidden"}`}
              >
                <PopOverBox>
                  <ProductSuggestionList
                    Loading={isLoading}
                    IsInputValue={isInputValue}
                    ProductList={productSuggestionList}
                    setIsFocus={setIsFocus}
                    dispatchClearDataList={dispatchClearDataList}
                  />
                </PopOverBox>
              </div>
            </div>
            {/* End Search Input */}

            {/* App Logo */}
            <Link to={HOME_DEFAULT}>
              <div className="flex items-center cursor-pointer">
                <div>
                  <img src={Logo} className=" w-40 py-2" alt="AppLogo" />
                </div>
              </div>
            </Link>
            {/* End App Logo */}

            <div className="flex items-center space-x-8">
              {/* End Order */}
              {/* Shopping Cart */}
              <div className={`relative py-3 ${animatedClass}`}>
                <Link
                  to={GET_STORED_ACCESS_TOKEN ? SHOPPING_CART : LOGIN}
                  onClick={() => onclickRoute(SHOPPING_CART)}
                >
                  {cartCount > 0 && pathName !== SHOPPING_CART && (
                    <div className="absolute top-0 -right-3 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <p className="text-color-white text-tiny">{cartCount}</p>
                    </div>
                  )}
                  <span className=" font-semibold text-color-brown">Cart</span>
                  {/* <img
                    src={OrderIcon}
                    alt='CartIcon'
                    className='h-full w-5 mt-0.5'
                  /> */}
                </Link>
              </div>
              {/* End Order */}
              {/* Shopping Cart */}
              <div className="py-3">
                <Link
                  to={GET_STORED_ACCESS_TOKEN ? ORDER_HISTORY : LOGIN}
                  onClick={() => onclickRoute(ORDER_HISTORY)}
                >
                  <span className=" font-semibold text-color-brown">
                    Orders
                  </span>
                  {/* <img src={CartIcon} alt='OrderIcon' className='h-full w-5' /> */}
                </Link>
              </div>
              {/* End Shopping Cart */}

              {/* Notification */}
              <div
                ref={scopeOfNotiSpaceRef}
                className="relative py-3 cursor-pointer"
              >
                <div
                  onClick={() => {
                    if (GET_STORED_ACCESS_TOKEN) {
                      notificationHideOrShowAction(!isShowNoti);
                    } else {
                      history.push(LOGIN);
                    }
                  }}
                >
                  <span className=" font-semibold text-color-brown">
                    Notifications
                  </span>
                  {/* <img src={NotiIcon} alt='NotiIcon' className='h-full w-4' /> */}
                  {/* notiCount > 0 */}
                  {notiCount > 0 && (
                    <span className="absolute top-0 -right-3 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-color-white text-tiny">
                        {notiCount}
                      </span>
                    </span>
                  )}
                </div>
                {/* Notification  */}
                {isShowNoti && (
                  <div className="top-11 absolute mt-3 -right-10 z-30 shadow-md ">
                    <Notification {...props} />
                  </div>
                )}
              </div>
              {/* End Notification */}

              {/* My Account */}
              <div className="py-3 pr-0">
                <Link
                  to={GET_STORED_ACCESS_TOKEN ? MY_ACCOUNT : LOGIN}
                  onClick={() => onclickRoute(MY_ACCOUNT)}
                >
                  <span className=" font-semibold text-color-brown">
                    Profile
                  </span>
                  {/* <img
                    src={ProfileIcon}
                    alt='ProfileIcon'
                    className='h-full w-4'
                  /> */}
                </Link>
              </div>
              {/* End My Account */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    /* notification */
    NotificationList: state.notifications.notification,
    isNoMoreData: state.notifications.isNoMoreData,
    isShowNoti: state.notifications.isShowNoti,
    notiCount: state.notifications.notiCount,
  };
};

export default connect(mapStateToProps, (dispatch) => ({
  /* notification */
  fetchNotification: (postData) => dispatch(fetch_notification(postData)),
  SeenNotification: (id) => dispatch(seen_notification(id)),
  setPageDefault: () => dispatch(set_PageDefault()),
  notificationHideOrShowAction: (value) =>
    dispatch(notification_HideShowAction(value)),
  changeNotiCount: (count) => dispatch(change_noti_count(count)),
}))(NavigationWeb);
