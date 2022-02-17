import React from "react";

//components
import { PopOverBox } from "../../CommonComponent/PopOverBox/pop_over_box";

//images
import TipIcon from "../../../assets/Authentication/Address/tip_icons.svg";

export default function OrderStatusDropDownItems({
  DropDownItemArray = [],
  SelectedOrderStatus,
  /**
   * action
   */
  onClickItem,
}) {
  return (
    <>
      <PopOverBox>
        <div className="space-y-4">
          {DropDownItemArray.length > 0 &&
            DropDownItemArray.map((item, index) => (
              <div
                key={index}
                className="flex space-x-4"
                onClick={() => onClickItem(item)}
              >
                <div
                  className={`${
                    SelectedOrderStatus?.value === item.value
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <img src={TipIcon} className="w-4 h-auto" alt="TipIcon" />
                </div>
                <p className="primary-font hover:text-color-link">
                  {item.name}
                </p>
              </div>
            ))}
        </div>
      </PopOverBox>
    </>
  );
}
