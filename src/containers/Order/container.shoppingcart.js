import { connect } from "react-redux";

import ShoppingCart from "../../components/ShoppingCart/shopping_cart";

import {
  fetch_ShopCartDetail,
  fetch_ShopCartDetailForBuyNow,
  increasing_ProductQty,
  decreasing_ProductQty,
  remove_FromCart,
  remove_AllFromCart,
  post_Order,
} from "../../modules/action.shoppingcart";

export default connect(
  (state) => ({
    isLoading: state.shoppingCart.isLoading,
    isSuccess: state.shoppingCart.isSuccess,
    isError: state.shoppingCart.isError,
    shopCartDetail: state.shoppingCart.shopCartDetail,
    availableProductList: state.shoppingCart.availableProductList,
    outOfStockProductList: state.shoppingCart.outOfStockProductList,
    stockLeftProductList: state.shoppingCart.stockLeftProductList,
    totalAmount: state.shoppingCart.totalAmount,
    orderId: state.shoppingCart.orderId,
  }),
  (dispatch) => ({
    fetchShopCartDetail: () => dispatch(fetch_ShopCartDetail()),
    fetchShopCartDetailForBuyNow: (propsData) => dispatch(fetch_ShopCartDetailForBuyNow(propsData)),
    increasingProductQty: (propsData) => dispatch(increasing_ProductQty(propsData)),
    decreaseProductQty: (propsData) => dispatch(decreasing_ProductQty(propsData)),
    removeFromCart: (postData) => dispatch(remove_FromCart(postData)),
    removeAllFromCart: () => dispatch(remove_AllFromCart()),
    postOrder: (postData) => dispatch(post_Order(postData)),
  })
)(ShoppingCart);
