import { connect } from "react-redux";

import ProductDetails from "../components/ProductDetails/product_details";
import { update_ProductWishList } from "../modules/action.myaccount";

import {
  fetch_productDetails,
  fetch_relatedProductByCategory,
  fetch_VariantValue,
  add_ToCart,
  fetch_QuestionAndAnswerList,
  fetch_questionCount,
} from "../modules/action.productdetails";

import { fetch_productSearch } from "../modules/action.productsearch";
import { fetch_ShopCartDetail } from "../modules/action.shoppingcart";
import { clear_product_details } from "../modules/reducer.productdetails";

export default connect(
  (state) => ({
    isLoading: state.productDetails.isLoading,
    isSecondaryLoading: state.productDetails.isSecondaryLoading,
    details: state.productDetails.details,
    relatedProductByCategoryList:
      state.productDetails.relatedProductByCategoryList,
    variantValue: state.productDetails.variantValue,
    boughtTogetherProductList: state.productSearch.boughtTogetherProductList,
    questionAndAnswerList: state.productDetails.questionAndAnswerList,
    questionCount: state.productDetails.questionCount,
    shopCartDetail: state.shoppingCart.shopCartDetail
  }),
  (dispatch) => ({
    fetchProductDetails: (productId) =>
      dispatch(fetch_productDetails(productId)),
      clearProductDetails: () => dispatch(clear_product_details()),
    fetchRelatedProductByCategory: (categoryId, pageNumber, pageSize) =>
      dispatch(
        fetch_relatedProductByCategory(categoryId, pageNumber, pageSize)
      ),
    fetchVariantValue: (postData) => dispatch(fetch_VariantValue(postData)),
    addToCart: (postData) => dispatch(add_ToCart(postData)),
    fetchBoughtTogetherProduct: (postData) =>
      dispatch(fetch_productSearch(postData)),
    fetchQuestionAndAnswerList: (productId, pageNumber, pageSize, isRemove) =>
      dispatch(fetch_QuestionAndAnswerList(productId, pageNumber, pageSize, isRemove)),
    fetchQuestionCount: (productId) => dispatch(fetch_questionCount(productId)),
    updateProductWishList: (productId, isFav) =>
      dispatch(update_ProductWishList(productId, isFav)),
      fetchShopCartDetail: () => dispatch(fetch_ShopCartDetail())
  }),
  
)(ProductDetails);
