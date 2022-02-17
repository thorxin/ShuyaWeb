import React, { Fragment } from "react";

//images
import TipIcon from "../../../assets/Authentication/Address/tip_icons.svg";

const BoxItems = ({
  data_object = {},
  selected_data,
  /**
   * action
   */
  clickBoxItems,
}) => {
  return (
    <>
      <div
        className="grid grid-cols-9 py-3 cursor-pointer hover:bg-gray-100 px-1 border-b"
        onClick={() => clickBoxItems(data_object)}
      >
        <div className="col-span-1 my-auto">
          <img
            src={TipIcon}
            className={`
              w-4 h-auto
              ${selected_data?.id === data_object.id ? "block" : "hidden"}
            `}
            alt="TipIcon"
          />
        </div>
        <div className="col-span-8">
          <p className="primary-font "> {data_object.name} </p>
        </div>
      </div>
    </>
  );
};

export default BoxItems;
