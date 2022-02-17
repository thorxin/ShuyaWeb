import { combineReducers } from "redux";

import auth from "./reducer.auth";
import home from "./reducer.home";
import myAccount from "./reducer.myaccount";
import productDetails from "./reducer.productdetails";
import shoppingCart from "./reducer.shoppingcart";
import productSearch from "./reducer.productsearch";
import orderHistory from "./reducer.orderhistory";
import orderDetail from "./reducer.orderdetail";
import notifications from './reducer.notifications';
import wishList from "./reducer.wishlist";
import byBrand from "./reducer.bybrand";
import deliveryAddressChange from "./reducer.deliveryAddressChange";

export default combineReducers({
    home: home,
    auth: auth,
    myAccount: myAccount,
    productDetails:productDetails,
    shoppingCart: shoppingCart,
    productSearch: productSearch,
    orderHistory: orderHistory,
    orderDetail: orderDetail,
    notifications: notifications,
    wishList: wishList,
    byBrand: byBrand,
    deliveryAddressChange: deliveryAddressChange
})