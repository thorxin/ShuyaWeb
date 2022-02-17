import { connect } from "react-redux";

import OrderHistory from "../../components/Order/OrderHistory/order_history";

import { fetch_getOrderHistory, fetch_VoucherNoSuggestion } from "../../modules/action.orderhistory";

export default connect(
  (state) => ({
    isLoading: state.orderHistory.isLoading,
    isSecondaryLoading: state.orderHistory.isSecondaryLoading,
    orderHistoryList: state.orderHistory.orderHistoryList,
    voucherNoSuggestion: state.orderHistory.voucherNoSuggestion,
    statusCode: state.orderHistory.statusCode
  }),
  (dispatch) => ({
    fetchGetOrderHistory: (postData) => dispatch(fetch_getOrderHistory(postData)),
    fetchVoucherNoSuggestion: (
      user_id,
      voucher_no,
      page_number,
      page_size
    ) => dispatch(fetch_VoucherNoSuggestion(
      user_id,
      voucher_no,
      page_number,
      page_size
    ))
  })
)(OrderHistory);
