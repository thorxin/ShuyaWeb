import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";

//components
import { GET_STORED_USER_ID } from "../../../util/storage";
import { PAGE_NUMBER, PAGE_SIZE } from "../../../constant/search";
import {
  VOUCHER_NO,
  ORDER_STATUS,
  PAYMENT_DATE,
  ORDER_DATE,
  PAYMENT_STATUS,
} from "./util";
import dateFormatter from "../../../util/dateFormatter";
import {
  ORDERED,
  PACKED,
  DELIVERING,
  DELIVERED,
  DELETED,
  PAYMENT_CHECKING,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from "../../../constant/order";
import moment from "moment";

export function Hook({
  isLoading,
  isSecondaryLoading,
  orderHistoryList,
  voucherNoSuggestion,
  statusCode,
  /**
   * action
   */
  fetchGetOrderHistory,
  fetchVoucherNoSuggestion,
}) {
  const { t } = useTranslation();

  const OrderStatus = [
    {
      name: t("OrderHistory.ordered"),
      value: ORDERED,
    },
    {
      name: t("OrderHistory.packed"),
      value: PACKED,
    },
    {
      name: t("OrderHistory.transporting"),
      value: DELIVERING,
    },
    {
      name: t("OrderHistory.transported"),
      value: DELIVERED,
    },
    {
      name: t("OrderHistory.deleted"),
      value: DELETED,
    },
  ];

  const PaymentStatus = [
    {
      name: t("OrderHistory.checking"),
      value: PAYMENT_CHECKING,
    },
    {
      name: t("OrderHistory.success"),
      value: PAYMENT_SUCCESS,
    },
    {
      name: t("OrderHistory.fail"),
      value: PAYMENT_FAIL,
    },
  ];

  const user_id = GET_STORED_USER_ID;

  //#region - When clicking outside of pop up, close pop up
  const closeAllBox = () => {
    setIsFocusTextBox(false);
    setIsShowOrderStatusList(false);
    setIsShowPaymentStatusList(false);
  };

  const voucherSuggestionBox = useRef();
  const orderDropDown = useRef();
  const paymentDropdown = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (
        !voucherSuggestionBox.current.contains(event.target) &&
        voucherSuggestionBox.current !== event.target
        &&
        !orderDropDown.current.contains(event.target) &&
        orderDropDown.current !== event.target 
        &&
        !paymentDropdown.current.contains(event.target) &&
        paymentDropdown.current !== event.target
      ) {
        closeAllBox();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  //#endregion

  /**
   * life cycle
   */
  useEffect(() => {
    fetchGetOrderHistory({
      userId: user_id,
      pageNumber: PAGE_NUMBER,
      pageSize: PAGE_SIZE,
    });
  }, [user_id]);

  const initialOrderDate = {
    userId: user_id,
    voucherNo: "",
    paymentStatusId: 0,
    orderStatusId: 0,
    orderDate: "",
    paymentDate: "",
    isRemoveOrderListState: true,
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  };

  const [searchOrderData, setSearchOrderData] = useState(initialOrderDate);

  const [selectedPaymentDate, setSelectedPaymentDate] = useState();
  const [selectedOrderDate, setSelectedOrderDate] = useState();

  const [selectedOrderStatus, setSelectedOrderStatus] = useState();
  const [isShowOrderStatusList, setIsShowOrderStatusList] = useState(false);

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const [isShowPaymentStatusList, setIsShowPaymentStatusList] = useState(false);

  const [isFocusTextBox, setIsFocusTextBox] = useState(false);
  const [voucherInputValue, setVoucherInputValue] = useState("");

  const [isLoadMore, setIsLoadMore] = useState(false);

  //#region - common func:
  /**
   * Reset Filter
   */
  const resetSearchFilter = (search_type) => {
    if (search_type === VOUCHER_NO) {
      setVoucherInputValue("");
      return;
    }
    if (search_type === ORDER_STATUS) {
      setIsShowOrderStatusList(false);
      setSelectedOrderStatus();
    }
    if (search_type === PAYMENT_STATUS) {
      setIsShowPaymentStatusList(false);
      setSelectedPaymentStatus();
    }
  };

  /**
   * updated search order state - obj
   */
  const updateSearchOrderDataObj = (search_type, updated_value) => {
    let clone_OrderData = _.cloneDeep(searchOrderData);
    clone_OrderData = {
      ...clone_OrderData,
      pageNumber: PAGE_NUMBER,
      isRemoveOrderListState: true,
    };
    let update_obj;
    switch (search_type) {
      case VOUCHER_NO:
        update_obj = { ...clone_OrderData, voucherNo: updated_value };
        break;
      case ORDER_STATUS:
        update_obj = { ...clone_OrderData, orderStatusId: updated_value };
        break;
      case PAYMENT_STATUS:
        update_obj = { ...clone_OrderData, paymentStatusId: updated_value };
        break;
      case PAYMENT_DATE:
        update_obj = { ...clone_OrderData, paymentDate: moment(updated_value).format("YYYY-MM-DD") };
        break;
      case ORDER_DATE:
        update_obj = { ...clone_OrderData, orderDate: moment(updated_value).format("YYYY-MM-DD") };
        break;
      default:
        break;
    }
    fetchGetOrderHistory(update_obj);
    setSearchOrderData(update_obj);
    setIsLoadMore(false);
  };

  const delaySearchVoucherNo = useCallback(
    _.debounce((text) => {
      fetchVoucherNoSuggestion(user_id, text, PAGE_NUMBER, PAGE_SIZE);
    }, 500),
    []
  );
  //#endregion

  //#region - Searching Order History By Order Status
  const searchOnOrderStatus = (item) => {
    if (!item) return;
    setIsShowOrderStatusList(false);
    updateSearchOrderDataObj(ORDER_STATUS, item.value);
    setSelectedOrderStatus(item);
  };

  const clearOrderStatusDropDown = () => {
    updateSearchOrderDataObj(ORDER_STATUS, 0);
    resetSearchFilter(ORDER_STATUS);
  };
  //#endregion

  //#region - Searching Order History By Payment Status
  const searchOnPaymentStatus = (item) => {
    if (!item) return;
    setIsShowPaymentStatusList(false);
    updateSearchOrderDataObj(PAYMENT_STATUS, item.value);
    setSelectedPaymentStatus(item);
  };

  const clearPaymentStatusDropDown = () => {
    updateSearchOrderDataObj(PAYMENT_STATUS, 0);
    resetSearchFilter(PAYMENT_STATUS);
  };
  //#endregion

  //#region - Searching Order History By Order No
  /**
   *
   * @param {*} value - text on input search - voucher No suggestion
   */
  const onChangeOrderNo = (value) => {
    setVoucherInputValue(value);
    delaySearchVoucherNo(value);
  };

  const searchOnVoucherNo = (voucher_no) => {
    if (!voucher_no) return;
    setVoucherInputValue(voucher_no);
    updateSearchOrderDataObj(VOUCHER_NO, voucher_no);
    setIsFocusTextBox(false);
  };

  const clearAllVoucherInput = () => {
    updateSearchOrderDataObj(VOUCHER_NO, "");
    resetSearchFilter(VOUCHER_NO);
  };

  const onKeyPressEnter = (e) => {
    if (e.charCode === 13) {
      let clone_voucherInputValue = _.cloneDeep(voucherInputValue || "");
      updateSearchOrderDataObj(VOUCHER_NO, clone_voucherInputValue);
    }
  };
  //#endregion

  //#region - Searching Order History By Payment Date
  const searchOnPaymentDate = (date) => {
    setSelectedPaymentDate(date);
    // let selected_date = dateFormatter(date);
    updateSearchOrderDataObj(PAYMENT_DATE, date);
  };
  //#endregion

  //#region - Searching Order History By Order Date
  const searchOnOrderDate = (date) => {
    setSelectedOrderDate(date);
    // let selected_date = dateFormatter(date);
    updateSearchOrderDataObj(ORDER_DATE, date);
  };
  //#endregion

  const openBox = (searchType) => {
    if (VOUCHER_NO === searchType) {
      setIsFocusTextBox(!isFocusTextBox);
      setIsShowPaymentStatusList(false);
      setIsShowOrderStatusList(false);
      return;
    }
    if (ORDER_STATUS === searchType) {
      setIsShowOrderStatusList(!isShowOrderStatusList);
      setIsShowPaymentStatusList(false);
      setIsFocusTextBox(false);
      return;
    }
    if (PAYMENT_STATUS === searchType) {
      setIsShowPaymentStatusList(!isShowPaymentStatusList);
      setIsFocusTextBox(false);
      setIsShowOrderStatusList(false);
    }
  };

  const clickOnLoadMoreBtn = () => {
    let clone_OrderData = _.cloneDeep(searchOrderData);
    let update_obj = {
      ...clone_OrderData,
      pageNumber: clone_OrderData.pageNumber + 1,
      isRemoveOrderListState: false,
    };
    fetchGetOrderHistory(update_obj);
    setSearchOrderData(update_obj);
    setIsLoadMore(true);
  };

  return [
    isLoading,
    isSecondaryLoading,
    orderHistoryList,
    selectedPaymentDate,
    selectedOrderDate,
    isShowOrderStatusList,
    isShowPaymentStatusList,
    OrderStatus,
    PaymentStatus,
    selectedOrderStatus,
    selectedPaymentStatus,
    voucherNoSuggestion,
    isFocusTextBox,
    voucherInputValue,
    isLoadMore,
    statusCode,
    voucherSuggestionBox,
    orderDropDown,
    paymentDropdown,
    /**
     * action
     */
    searchOnOrderStatus,
    searchOnPaymentStatus,
    clearOrderStatusDropDown,
    clearPaymentStatusDropDown,
    searchOnVoucherNo,
    onChangeOrderNo,
    clearAllVoucherInput,
    searchOnPaymentDate,
    searchOnOrderDate,
    onKeyPressEnter,
    clickOnLoadMoreBtn,
    openBox,
  ];
}
