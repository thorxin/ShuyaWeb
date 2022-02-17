import React from "react";
import { Link } from "react-router-dom";

const FooterItemNoti = ({
  ROUTE = "",
  item_icon,
  item_icon_active,
  IS_ROUTE = false,
  item_name,
  notiCount
}) => {
  return (
    <>
      <Link to={ROUTE}>
        <div className="space-y-1">
                  <div className=" relative">
                 <img src={IS_ROUTE ? item_icon_active : item_icon} className="w-6 h-auto mx-auto" alt="FooterLogo" />
                 {notiCount > 0 &&
                          <span className=" absolute top-0 right-4 inline-flex  px-2 py-1  text-xs caption-font leading-none text-red-100 bg-red-500 rounded-full">{notiCount}</span>
                  }
            </div>
          <p
            className={`caption-font text-center ${
              IS_ROUTE ? "text-color-default" : "text-color-secondary"
            } `}
          >
            {item_name}
          </p>
        </div>
      </Link>
    </>
  );
};

export default FooterItemNoti;
