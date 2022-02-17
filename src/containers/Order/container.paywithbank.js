import { connect } from "react-redux";

import PayWithBank from "../../components/ShoppingCart/PayWithBank/pay_with_bank";

import { fetch_BankList, post_Order } from "../../modules/action.shoppingcart";
import { postPaymentAgain } from "../../modules/action.orderdetail";

export default connect(
  (state) => ({
    isLoading: state.shoppingCart.isLoading,
    isSecondaryLoading: state.shoppingCart.isSecondaryLoading,
    bankList: state.shoppingCart.bankList,
    orderId: state.shoppingCart.orderId,
  }),
  (dispatch) => ({
    fetchBankList: () => dispatch(fetch_BankList()),
    postOrder: (postData) => dispatch(post_Order(postData)),
    postPaymentAgain: (postData) => dispatch(postPaymentAgain(postData))
  })
)(PayWithBank);
