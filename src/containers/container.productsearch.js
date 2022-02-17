import { connect } from "react-redux";

import ProductSearch from "../components/ProductSearch/product_search";

import {
  fetch_tagList,
  fetch_productSearch as SearchApi,
  fetch_ProductSuggestionList,
  clear_DataList
} from "../modules/action.productsearch";

import { fetch_mainCategory } from "../modules/action.home";

export default connect(
  (state) => ({
    isLoading: state.productSearch.isLoading,
    isSecondaryLoading: state.productSearch.isSecondaryLoading,
    tagList: state.productSearch.tagList,
    searchProductList: state.productSearch.searchProductList,
    searchProductCount: state.productSearch.searchProductCount,
    productSuggestionList: state.productSearch.productSuggestionList,
    mainCategory: state.home.mainCategory
  }),
  (dispatch) => ({
    fetchTagList: () => dispatch(fetch_tagList()),
    searchProduct: (props) => dispatch(SearchApi(props)),
    fetchProductSuggestionList: (keyword) => dispatch(fetch_ProductSuggestionList(keyword)),
    clearData: () => dispatch(clear_DataList()),
    fetchMainCategory: () => dispatch(fetch_mainCategory())
  })
)(ProductSearch);
