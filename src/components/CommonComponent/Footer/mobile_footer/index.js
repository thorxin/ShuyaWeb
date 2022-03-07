/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

//images
import Home from "../../../../assets/footer/home.svg";
import OrderHistory from "../../../../assets/footer/orderHistory.svg";
import Notification from "../../../../assets/footer/notification.svg";
import MyAccount from "../../../../assets/footer/myAccount.svg";
import HomeActive from "../../../../assets/footer/home_active.svg";
import OrderHistoryActive from "../../../../assets/footer/orderHistory_active.svg";
import NotificationActive from "../../../../assets/footer/notification_active.svg";
import MyAccountActive from "../../../../assets/footer/myAccount_active.svg";

//components
import RoutingLocationPath from "../../../../util/routingLocationPath";
import {
  HOME_DEFAULT,
  ORDER_HISTORY,
  NOTIFICATION,
  MY_ACCOUNT,
} from "../../../../constant/locationPathName";
import FooterItem from "./footer_items";
import FooterHomeItem from "./footer_home_item";
import FooterItemNoti from "./footer_item_noti";

import Hook from "./hook";
import { connect } from "react-redux";

const FooterMobile = (props) => {
  const [count] = Hook(props);
  const { t } = useTranslation();

  const { IS_LANDING, IS_ORDER_HISTORY, IS_NOTIFICATION, IS_MY_ACCOUNT } =
    RoutingLocationPath(props);

  return (
    <div className="md:hidden w-full h-auto border-t fixed bottom-0 z-40">
      <div className="container mx-auto bg-white py-2">
        <div className="flex justify-around">
          <FooterHomeItem
            ROUTE={HOME_DEFAULT}
            IS_ROUTE={IS_LANDING}
            item_icon={HomeActive}
            item_icon_active={Home}
            item_name={t("Footer.home")}
          />

          <FooterItem
            ROUTE={ORDER_HISTORY}
            IS_ROUTE={IS_ORDER_HISTORY}
            item_icon={OrderHistory}
            item_icon_active={OrderHistory}
            item_name={t("Footer.order-history")}
          />

          <FooterItem
            ROUTE={NOTIFICATION}
            IS_ROUTE={IS_NOTIFICATION}
            item_icon={Notification}
            item_icon_active={Notification}
            item_name={t("Footer.notification")}
            count={props.notiCount}
          />

          <FooterItem
            ROUTE={MY_ACCOUNT}
            IS_ROUTE={IS_MY_ACCOUNT}
            item_icon={MyAccount}
            item_icon_active={MyAccountActive}
            item_name={t("Footer.my-account")}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    /* notification */
    notiCount: state.notifications.notiCount,
  };
};

export default connect(mapStateToProps, {})(FooterMobile);
