import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SEARCH_BEST_SELLING, SEARCH_BUY_ONE_GET_ONE, SEARCH_LATEST, SEARCH_PROMOTION } from "../../constant/search";
import { REDIRECT_BEST_SELLING, REDIRECT_ORDER_DETAIL, REDIRECT_BUY_ONE_GET_ONE, REDIRECT_NEW_ARRIVAL, REDIRECT_PRODUCT_DETAIL, REDIRECT_PROMOTION } from "../../constant/redirectConfig";
//components
import goOrderDetail from "../../util/goOrderDetail";
import { goProductDetails, goToProductSearchResult } from "../../util/goToSpecificPathName";

export function Hook({
  isLoading,
  NotificationList,
  isNoMoreData,
  noMoreData,
  CurrentPage,
  notiCount,
  /**
   * actions
   */
  fetchNotification,
  SeenNotification,
  setPageDefault,
  changeNotiCount,
  notificationHideOrShowAction
}) {
  const history = useHistory();

  const [isLoadMore, setIsLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isScrollLoading, setIsScrollLoading] = useState(false); // it is for infinite scroll
  useEffect(() => {
    setPageDefault();
  }, []);

  const LoadMoreNotiList = async () => {
    setIsScrollLoading(true);
    let updatePageNumber = pageNumber;
    await fetchNotification({
      page_number: updatePageNumber,
      is_removed_state: false,
    });
    setPageNumber(updatePageNumber);
    setIsLoadMore(true);
    setIsScrollLoading(false);
  };
  useEffect(() => {
    LoadMoreNotiList();
  }, [pageNumber]);

  const clickOnNotification = (notification_item = {}) => {
    if (notificationHideOrShowAction) {
      notificationHideOrShowAction(false); 
    }
    changeNotiCount(notiCount - 1);
    SeenNotification(notification_item.id);
    let propsData = {
      searchType: null
    };
    switch (notification_item.redirectAction) {
      case REDIRECT_PRODUCT_DETAIL:
        goProductDetails(history, notification_item.referenceAttribute, true)
        break;
      case REDIRECT_BUY_ONE_GET_ONE:
        propsData = {
          searchType: SEARCH_BUY_ONE_GET_ONE
        }
        goToProductSearchResult(history, propsData);
        break;
      case REDIRECT_NEW_ARRIVAL:
        propsData = {
          searchType: SEARCH_LATEST
        }
        goToProductSearchResult(history, propsData);
        break;
      case REDIRECT_PROMOTION:
        propsData = {
          searchType: SEARCH_PROMOTION
        }
        goToProductSearchResult(history, propsData);
        break;
      case REDIRECT_BEST_SELLING:
        propsData = {
          searchType: SEARCH_BEST_SELLING
        }
        goToProductSearchResult(history, propsData);
        break;
      case REDIRECT_ORDER_DETAIL: {
        goOrderDetail(history, notification_item.referenceAttribute, true);
        break;
      }
      default:
        break;
    }
  };

  return [
    isLoading,
    NotificationList,
    noMoreData,
    isLoadMore,
    isNoMoreData,

    /**
     * action
     */
    LoadMoreNotiList,
    clickOnNotification,
    pageNumber,
    isScrollLoading,
    setPageNumber
  ];
}
