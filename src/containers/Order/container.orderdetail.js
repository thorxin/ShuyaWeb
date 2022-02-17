import { connect } from "react-redux";
import {
  clear_orderId,
  fetchOrderDetail,
  fetch_orderMessageList,
  order_cancel,
  postPaymentAgain,
  send_OrderNoteMessage,
} from "../../modules/action.orderdetail";
import OrderDetail from "../../components/OrderDetail/order_detail";

export default connect(
  (state) => ({
    isLoading: state.orderDetail.isLoading,
    isSuccess: state.orderDetail.isSuccess,
    OrderDetail: state.orderDetail.orderDetail,
    posVoucher: state.orderDetail.posVoucher,
    orderMessageList: state.orderDetail.orderMessageList,
  }),
  (dispatch) => ({
    fetchOrderDetail: (orderId) => dispatch(fetchOrderDetail(orderId)),
    OrderCancel: (propsData = {}) => dispatch(order_cancel(propsData)),
    sendOrderNoteMessage: (propsData) =>
      dispatch(send_OrderNoteMessage(propsData)),
    fetchOrderMessageList: (orderId, pageNumber, pageSize) =>
      dispatch(fetch_orderMessageList(orderId, pageNumber, pageSize)),
    clearOrderId: () => dispatch(clear_orderId()),
    postPaymentAgain: (postData) => dispatch(postPaymentAgain(postData))
  })
)(OrderDetail);
