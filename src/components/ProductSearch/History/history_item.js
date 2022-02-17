import React from "react";
import { HISTORY_CATEGORY, HISTORY_ITEM } from "../../../util/storage";

//images
import CrossSignIcon from "../../../assets/common/cancel_cross_icon.svg";
import SearchHistoryIcon from "../../../assets/productSearch/search_history_icon.svg";
import { SEARCH_BY_NAME, SEARCH_CATEGORY } from "../../../constant/search";

const HistoryItem = ({
  Index,
  type = HISTORY_ITEM,
  CategoryId = 0,
  name = "",
  imageUrl = "",
  /**
   * action
   */
  clickOn,
  onClickHistory,
}) => {
  let image;
  let itemData;
  switch (type) {
    case HISTORY_ITEM:
      image = (
        imageUrl
        ?
        <img
          src={imageUrl}
          className="w-8 h-8 rounded-full mx-auto"
          alt="Search History Icon"
        />
        :
        <img
          src={SearchHistoryIcon}
          className="w-5 h-auto mx-auto"
          alt="Search History Icon"
        />
        
      );
      itemData = {
        search_type: SEARCH_BY_NAME,
        category_id: CategoryId,
        item_name: name,
      };
      break;
    case HISTORY_CATEGORY:
      image = (
        <img
          src={SearchHistoryIcon}
          className="w-5 h-auto mx-auto"
          alt="Search History Icon"
        />
      );
      itemData = {
        search_type: SEARCH_CATEGORY,
        category_id: CategoryId,
        item_name: name,
      };
      break;
    default:
      break;
  }

  return (
    <>
      <div className="grid grid-cols-12 cursor-pointer">
        <div className="col-span-11">
          <div
            className="grid grid-cols-12 space-x-2"
            onClick={() => onClickHistory(itemData)}
          >
            <div className="col-span-2">{image}</div>
            <div className="col-span-10 my-auto">
              <p className="tertiary-font font-normal truncate hover:text-color-link">
                {name}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 my-auto">
          <img
            src={CrossSignIcon}
            className="w-3 h-auto float-right "
            alt="CrossSignIcon"
            onClick={() => clickOn(Index)}
          />
        </div>
      </div>
    </>
  );
};

export default HistoryItem;
