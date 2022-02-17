import { connect } from "react-redux";

import PayWithAgents from "../../components/ShoppingCart/PayWithAgents/pay_with_agents";
import { postPaymentAgain } from "../../modules/action.orderdetail";

import { fetch_PaymentServiceDetail, post_Order } from "../../modules/action.shoppingcart";

export default connect(
  (state) => ({
    isLoading: state.shoppingCart.isLoading,
    isSecondaryLoading: state.shoppingCart.isSecondaryLoading,
    paymentServiceDetail: state.shoppingCart.paymentServiceDetail,
    orderId: state.shoppingCart.orderId,
  }),
  (dispatch) => ({
    fetchPaymentServiceDetail: (service_id) => dispatch(fetch_PaymentServiceDetail(service_id)),
    postOrder: (postData) => dispatch(post_Order(postData)),
    postPaymentAgain: (postData) => dispatch(postPaymentAgain(postData))
  })
)(PayWithAgents);
